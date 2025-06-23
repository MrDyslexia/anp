"use client"

import { useState, useMemo } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LogOut, UserIcon, Bell, MapPin, Shield, HelpCircle, ChevronRight } from "lucide-react-native"
import { user } from "@/data"
import { Avatar } from "react-native-paper"
import { useColorScheme } from "@/hooks/useColorScheme"

const ProfileScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const [locationPermission, setLocationPermission] = useState(true)

  // Create dynamic styles based on color scheme
  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: isDarkMode ? "#121212" : "#f9fafb",
      },
      cardBackground: {
        backgroundColor: isDarkMode ? "#1e1e1e" : "white",
      },
      textPrimary: {
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
      },
      textSecondary: {
        color: isDarkMode ? "#9ca3af" : "#6b7280",
      },
      borderColor: {
        borderBottomColor: isDarkMode ? "#333333" : "#f3f4f6",
      },
      iconColor: {
        color: isDarkMode ? "#9ca3af" : "#9ca3af",
      },
      switchTrackColor: {
        false: isDarkMode ? "#4b5563" : "#d1d5db",
        true: "#10b981",
      },
      switchThumbColor: {
        color: isDarkMode ? "#e5e7eb" : "white",
      },
      signOutButton: {
        backgroundColor: isDarkMode ? "#1e1e1e" : "white",
      },
    }
  }, [isDarkMode])

  /** 
  if (user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!user) {
    return (
        <View style={styles.loadingContainer}>
            <Text>Please log in to view profile.</Text>
        </View>
        )
  }*/

  const handleSignOut = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        //onPress: signOut,
        style: "destructive",
      },
    ])
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes de perfil</Text>
      </View>

      <ScrollView>
        

        <View style={[styles.section, dynamicStyles.cardBackground]}>
          <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>Cuenta</Text>

          <TouchableOpacity style={[styles.menuItem, dynamicStyles.borderColor]}>
            <View style={styles.menuItemIcon}>
              <UserIcon size={20} color="#10b981" />
            </View>
            <Text style={[styles.menuItemText, dynamicStyles.textPrimary]}>Editar perfil</Text>
            <ChevronRight size={20} color={isDarkMode ? "#9ca3af" : "#9ca3af"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, dynamicStyles.borderColor]}>
            <View style={styles.menuItemIcon}>
              <Bell size={20} color="#10b981" />
            </View>
            <Text style={[styles.menuItemText, dynamicStyles.textPrimary]}>Notificaciones</Text>
            <ChevronRight size={20} color={isDarkMode ? "#9ca3af" : "#9ca3af"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <View style={styles.menuItemIcon}>
              <MapPin size={20} color="#10b981" />
            </View>
            <Text style={[styles.menuItemText, dynamicStyles.textPrimary]}>Ubicaciones favoritas</Text>
            <ChevronRight size={20} color={isDarkMode ? "#9ca3af" : "#9ca3af"} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, dynamicStyles.cardBackground]}>
          <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>Preferencias</Text>

          <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <View style={styles.menuItemIcon}>
              <MapPin size={20} color="#10b981" />
            </View>
            <Text style={[styles.menuItemText, dynamicStyles.textPrimary]}>Permitir ubicación</Text>
            <Switch
              value={locationPermission}
              onValueChange={setLocationPermission}
              trackColor={dynamicStyles.switchTrackColor}
              thumbColor={dynamicStyles.switchThumbColor.color}
            />
          </View>
        </View>

        <View style={[styles.section, dynamicStyles.cardBackground]}>
          <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>Soporte</Text>

          <TouchableOpacity style={[styles.menuItem, dynamicStyles.borderColor]}>
            <View style={styles.menuItemIcon}>
              <HelpCircle size={20} color="#10b981" />
            </View>
            <Text style={[styles.menuItemText, dynamicStyles.textPrimary]}>Ayuda y soporte</Text>
            <ChevronRight size={20} color={isDarkMode ? "#9ca3af" : "#9ca3af"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <View style={styles.menuItemIcon}>
              <Shield size={20} color="#10b981" />
            </View>
            <Text style={[styles.menuItemText, dynamicStyles.textPrimary]}>Política de privacidad</Text>
            <ChevronRight size={20} color={isDarkMode ? "#9ca3af" : "#9ca3af"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.signOutButton, dynamicStyles.signOutButton]} onPress={handleSignOut}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.signOutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, dynamicStyles.textSecondary]}>Versión 1.0.0</Text>
        </View>
      </ScrollView>
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
  profileSection: {
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    padding: 16,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#10b981", // Keep green avatar for both themes
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  profileEmail: {
    fontSize: 14,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
    marginTop: 4,
  },
  section: {
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // Light mode default, overridden by dynamic styles
  },
  menuItemIcon: {
    width: 40,
    alignItems: "center",
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  signOutText: {
    color: "#ef4444", // Keep red for sign out in both themes
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  versionText: {
    fontSize: 14,
    color: "#9ca3af", // Light mode default, overridden by dynamic styles
  },
})

export default ProfileScreen

