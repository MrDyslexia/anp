"use client"

import { useState, useMemo } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, MapPin, Star, Filter } from "lucide-react-native"
import { TextInput } from "react-native"
import type { Region } from "@/types/interfaces"
import { useColorScheme } from "@/hooks/useColorScheme"
import { REGIONS } from "@/data"

const RegionScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const [searchQuery, setSearchQuery] = useState("")
  const [regions, setRegions] = useState(REGIONS)
  const [filterFavorites, setFilterFavorites] = useState(false)

  // Create dynamic styles based on color scheme
  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: isDarkMode ? "#121212" : "#f9fafb",
      },
      cardBackground: {
        backgroundColor: isDarkMode ? "#1e1e1e" : "white",
      },
      parameterBackground: {
        backgroundColor: isDarkMode ? "#262626" : "#f8fafc",
      },
      textPrimary: {
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
      },
      textSecondary: {
        color: isDarkMode ? "#9ca3af" : "#6b7280",
      },
      searchInputContainer: {
        backgroundColor: isDarkMode ? "#262626" : "white",
        borderColor: isDarkMode ? "#333333" : "transparent",
        borderWidth: isDarkMode ? 1 : 0,
      },
      searchInput: {
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
      },
      searchPlaceholder: {
        color: isDarkMode ? "#9ca3af" : "#6b7280",
      },
      filterButton: {
        backgroundColor: isDarkMode ? "#262626" : "white",
        borderColor: isDarkMode ? "#333333" : "transparent",
        borderWidth: isDarkMode ? 1 : 0,
      },
      starInactive: {
        color: isDarkMode ? "#6b7280" : "#d1d5db",
      },
    }
  }, [isDarkMode])

  /** 
  const { user, isLoading } = useAuth()
  // If loading or no user, show login screen
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!user) {
    return <LoginScreen />
  }*/

  const toggleFavorite = (id: number) => {
    setRegions(regions.map((region) => (region.id === id ? { ...region, isFavorite: !region.isFavorite } : region)))
  }

  const filteredRegions = regions.filter((region) => {
    const matchesSearch = region.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFavorite = filterFavorites ? region.isFavorite : true
    return matchesSearch && matchesFavorite
  })

  const renderRegionItem = ({ item }: { item: Region }) => (
    <View style={[styles.regionCard, dynamicStyles.cardBackground]}>
      <View style={styles.regionHeader}>
        <View>
          <Text style={[styles.regionName, dynamicStyles.textPrimary]}>{item.name}</Text>
          <View style={styles.locationIndicator}>
            <MapPin size={12} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <Text style={[styles.locationText, dynamicStyles.textSecondary]}>Chile</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Star
            size={24}
            color={item.isFavorite ? "#f59e0b" : isDarkMode ? "#6b7280" : "#d1d5db"}
            fill={item.isFavorite ? "#f59e0b" : "none"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.aqiContainer}>
        <View style={[styles.aqiBadge, { backgroundColor: item.color }]}>
          <Text style={styles.aqiText}>{item.aqi}</Text>
        </View>
        <Text style={[styles.aqiLabel, dynamicStyles.textPrimary]}>AQI</Text>
        <Text style={[styles.statusText, dynamicStyles.textSecondary]}>{item.status}</Text>
      </View>

      <View style={styles.parametersContainer}>
        <View style={[styles.parameter, dynamicStyles.parameterBackground]}>
          <Text style={[styles.parameterLabel, dynamicStyles.textSecondary]}>PM2.5</Text>
          <Text style={[styles.parameterValue, dynamicStyles.textPrimary]}>{Math.round(item.aqi * 0.4)} µg/m³</Text>
        </View>
        <View style={[styles.parameter, dynamicStyles.parameterBackground]}>
          <Text style={[styles.parameterLabel, dynamicStyles.textSecondary]}>PM10</Text>
          <Text style={[styles.parameterValue, dynamicStyles.textPrimary]}>{Math.round(item.aqi * 0.8)} µg/m³</Text>
        </View>
        <View style={[styles.parameter, dynamicStyles.parameterBackground]}>
          <Text style={[styles.parameterLabel, dynamicStyles.textSecondary]}>O₃</Text>
          <Text style={[styles.parameterValue, dynamicStyles.textPrimary]}>{Math.round(item.aqi * 0.3)} ppb</Text>
        </View>
        <View style={[styles.parameter, dynamicStyles.parameterBackground]}>
          <Text style={[styles.parameterLabel, dynamicStyles.textSecondary]}>NO₂</Text>
          <Text style={[styles.parameterValue, dynamicStyles.textPrimary]}>{Math.round(item.aqi * 0.2)} ppb</Text>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa de Contaminación</Text>
        <Text style={styles.subtitle}>Datos de calidad del aire en Chile</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, dynamicStyles.searchInputContainer]}>
          <Search size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, dynamicStyles.searchInput]}
            placeholder="Buscar región..."
            placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={[styles.filterButton, filterFavorites ? styles.filterButtonActive : dynamicStyles.filterButton]}
          onPress={() => setFilterFavorites(!filterFavorites)}
        >
          <Filter size={20} color={filterFavorites ? "#ffffff" : "#10b981"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRegions}
        renderItem={renderRegionItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", // Light mode default, overridden by dynamic styles
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 16,
    backgroundColor: "#10b981", // Keep green header for both themes
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // White text on green works for both themes
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: "#10b981", // Keep green for active state in both themes
  },
  listContainer: {
    padding: 16,
  },
  regionCard: {
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  regionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  regionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  locationIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
    marginLeft: 4,
  },
  aqiContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  aqiBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  aqiText: {
    color: "white", // White text on colored background works for both themes
    fontWeight: "bold",
    fontSize: 16,
  },
  aqiLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  statusText: {
    fontSize: 14,
    color: "#4b5563", // Light mode default, overridden by dynamic styles
  },
  parametersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  parameter: {
    width: "48%",
    backgroundColor: "#f8fafc", // Light mode default, overridden by dynamic styles
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  parameterLabel: {
    fontSize: 12,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
    marginBottom: 4,
  },
  parameterValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
})

export default RegionScreen

