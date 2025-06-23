"use client"

import { useState, useMemo } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  UIManager,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native"
import { Thermometer } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AlertTriangle, Calendar, Droplets, MapPin, Wind } from "lucide-react-native"
import { MOCK_FAVORITES, user } from "@/data"
import { useRouter } from "expo-router"
import { useColorScheme } from "@/hooks/useColorScheme"
const generateHistoricalData = () => {
  const today = new Date()
  const data = []

  for (let i = 10; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // Generate random AQI between 30 and 150
    const aqi = Math.floor(Math.random() * 120) + 30

    // Determine status and color based on AQI
    let status, color
    if (aqi <= 50) {
      status = "Bueno"
      color = "#00C853"
    } else if (aqi <= 100) {
      status = "Moderado"
      color = "#FFBB00"
    } else {
      status = "Insalubre"
      color = "#FF5252"
    }

    data.push({
      date,
      aqi,
      status,
      color,
    })
  }

  return data
}

export default function HomeScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const [favorites, setFavorites] = useState(MOCK_FAVORITES)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [historicalData, setHistoricalData] = useState(generateHistoricalData())
  const [visibleWeek, setVisibleWeek] = useState(0) // 0 = current week, 1 = previous week

  const screenWidth = Dimensions.get("window").width
  const dayWidth = (screenWidth - 64) / 7 // 7 days per week, with margins

  // Create dynamic styles based on color scheme
  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: isDarkMode ? "#121212" : "#f9fafb",
      },
      cardBackground: {
        backgroundColor: isDarkMode ? "#1e1e1e" : "white",
      },
      cardBackgroundAlt: {
        backgroundColor: isDarkMode ? "#262626" : "#f8fafc",
      },
      textPrimary: {
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
      },
      textSecondary: {
        color: isDarkMode ? "#9ca3af" : "#6b7280",
      },
      weekToggleButton: {
        backgroundColor: isDarkMode ? "#333333" : "#f3f4f6",
      },
      weekToggleText: {
        color: isDarkMode ? "#d1d5db" : "#4b5563",
      },
      todayText: {
        color: "#10b981", // Keep green for both modes for visibility
      },
      warningContainer: {
        backgroundColor: isDarkMode ? "#422006" : "#fff7ed",
      },
      warningText: {
        color: isDarkMode ? "#fdba74" : "#9a3412",
      },
    }
  }, [isDarkMode])

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setHistoricalData(generateHistoricalData())
      setRefreshing(false)
    }, 1000)
  }

  // Function to get a date string for display
  const getDateString = (date: Date) => {
    return date.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Function to get short day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString("es-CL", { weekday: "short" })
  }

  // Function to get day number
  const getDayNumber = (date: Date) => {
    return date.getDate()
  }

  // Function to check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Function to check if two dates are the same
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  // Get visible data based on current week
  const getVisibleData = () => {
    if (visibleWeek === 0) {
      // Current week (last 7 days)
      return historicalData.slice(-7)
    } else {
      // Previous week (days 8-14 from the end)
      return historicalData.slice(-14, -7)
    }
  }

  const visibleData = getVisibleData()

  const showToast = () => {
    const message = visibleWeek === 0 ? "Mostrando datos de la semana anterior" : "Mostrando datos de la semana actual"
    if (Platform.OS === "android") {
      try {
        ToastAndroid.show(message, ToastAndroid.SHORT)
      } catch (e) {
        console.warn("ToastAndroid error", e)
      }
    }
  }

  // Function to toggle between weeks
  const toggleWeek = () => {
    setVisibleWeek(visibleWeek === 0 ? 1 : 0)
    showToast()
  }

  // Get selected day data
  const getSelectedDayData = () => {
    return (
      historicalData.find((item) => isSameDay(item.date, selectedDate)) || historicalData[historicalData.length - 1]
    )
  }

  const selectedDayData = getSelectedDayData()

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hola, {user.name || "Usuario"}</Text>
          <Text style={styles.subtitle}>Monitoreo de Calidad del Aire</Text>
        </View>

        {/* Calendar section */}
        <View style={[styles.calendarSection, dynamicStyles.cardBackground]}>
          <View style={styles.calendarHeader}>
            <Calendar size={20} color="#10b981" />
            <View style={styles.headerCalendar}>
              <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>{user.region.name}</Text>
            </View>
            <TouchableOpacity style={[styles.weekToggleButton, dynamicStyles.weekToggleButton]} onPress={toggleWeek}>
              <Text style={[styles.weekToggleText, dynamicStyles.weekToggleText]}>
                {visibleWeek === 0 ? "Semana anterior" : "Semana actual"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Calendar days */}
          <View style={styles.calendarDays}>
            {visibleData.map((day, index) => {
              const isSelectedDay = isSameDay(day.date, selectedDate)
              const isTodayDay = isToday(day.date)

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.calendarDay, isSelectedDay && styles.selectedDay, { width: dayWidth }]}
                  onPress={() => setSelectedDate(day.date)}
                >
                  <Text
                    style={[
                      styles.dayName,
                      isDarkMode && !isSelectedDay && !isTodayDay && dynamicStyles.textSecondary,
                      // If selected, always use white text
                      isSelectedDay
                        ? styles.selectedDayText
                        : // If today but not selected, use green text
                          isTodayDay
                          ? dynamicStyles.todayText
                          : // Otherwise use default text color based on theme
                            null,
                    ]}
                  >
                    {getDayName(day.date)}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      isDarkMode && !isSelectedDay && !isTodayDay && dynamicStyles.textPrimary,
                      // If selected, always use white text
                      isSelectedDay
                        ? styles.selectedDayText
                        : // If today but not selected, use green text
                          isTodayDay
                          ? dynamicStyles.todayText
                          : // Otherwise use default text color based on theme
                            null,
                    ]}
                  >
                    {getDayNumber(day.date)}
                  </Text>
                  <View style={[styles.dayAqiIndicator, { backgroundColor: day.color }]}>
                    <Text style={styles.dayAqiText}>{day.aqi}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Selected day details */}
          <View style={[styles.selectedDayDetails, dynamicStyles.cardBackgroundAlt]}>
            <Text style={[styles.selectedDayDate, dynamicStyles.textPrimary]}>{getDateString(selectedDate)}</Text>

            <View style={styles.aqiDetailsContainer}>
              <View style={[styles.aqiBadgeLarge, { backgroundColor: selectedDayData.color }]}>
                <Text style={styles.aqiTextLarge}>{selectedDayData.aqi}</Text>
              </View>

              <View style={styles.aqiInfo}>
                <Text style={[styles.aqiStatus, dynamicStyles.textPrimary]}>Estado: {selectedDayData.status}</Text>
                <Text style={[styles.aqiDescription, dynamicStyles.textSecondary]}>
                  {selectedDayData.aqi <= 50
                    ? "La calidad del aire es satisfactoria y la contaminación del aire presenta poco o ningún riesgo."
                    : selectedDayData.aqi <= 100
                      ? "La calidad del aire es aceptable, sin embargo, puede haber riesgo para algunas personas sensibles."
                      : "La calidad del aire es insalubre. Todos pueden comenzar a experimentar efectos en la salud."}
                </Text>
              </View>
            </View>

            <View style={styles.dailyMetricsContainer}>
              <View style={styles.dailyMetric}>
                <Droplets size={20} color="#0ea5e9" />
                <View>
                  <Text style={[styles.dailyMetricLabel, dynamicStyles.textSecondary]}>Humedad</Text>
                  <Text style={[styles.dailyMetricValue, dynamicStyles.textPrimary]}>
                    {Math.floor(Math.random() * 30) + 50}%
                  </Text>
                </View>
              </View>

              <View style={styles.dailyMetric}>
                <Wind size={20} color="#6366f1" />
                <View>
                  <Text style={[styles.dailyMetricLabel, dynamicStyles.textSecondary]}>Viento</Text>
                  <Text style={[styles.dailyMetricValue, dynamicStyles.textPrimary]}>
                    {Math.floor(Math.random() * 15) + 5} km/h
                  </Text>
                </View>
              </View>

              <View style={styles.dailyMetric}>
                <Thermometer size={20} color="#ef4444" />
                <View>
                  <Text style={[styles.dailyMetricLabel, dynamicStyles.textSecondary]}>Temperatura</Text>
                  <Text style={[styles.dailyMetricValue, dynamicStyles.textPrimary]}>
                    {Math.floor(Math.random() * 10) + 15}°C
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Favorites section */}
        <View style={[styles.section, dynamicStyles.cardBackground]}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#10b981" />
            <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>Zonas Favoritas</Text>
          </View>

          {favorites.map((location) => (
            <View key={location.id} style={[styles.locationCard, dynamicStyles.cardBackgroundAlt]}>
              <View style={styles.locationHeader}>
                <Text style={[styles.locationName, dynamicStyles.textPrimary]}>{location.name}</Text>
                <View style={[styles.aqiBadge, { backgroundColor: location.color }]}>
                  <Text style={styles.aqiText}>{location.aqi}</Text>
                </View>
              </View>

              <Text style={[styles.statusText, dynamicStyles.textPrimary]}>Estado: {location.status}</Text>

              <View style={styles.metricsContainer}>
                <View style={styles.metric}>
                  <Droplets size={16} color="#0ea5e9" />
                  <Text style={[styles.metricText, dynamicStyles.textSecondary]}>Humedad: 65%</Text>
                </View>
                <View style={styles.metric}>
                  <Wind size={16} color="#6366f1" />
                  <Text style={[styles.metricText, dynamicStyles.textSecondary]}>Viento: 12 km/h</Text>
                </View>
                <View style={styles.metric}>
                  <Thermometer size={16} color="#ef4444" />
                  <Text style={[styles.metricText, dynamicStyles.textSecondary]}>Temp: 22°C</Text>
                </View>
              </View>

              {location.aqi > 100 && (
                <View style={[styles.warningContainer, dynamicStyles.warningContainer]}>
                  <AlertTriangle size={16} color={isDarkMode ? "#fdba74" : "#f59e0b"} />
                  <Text style={[styles.warningText, dynamicStyles.warningText]}>
                    Se recomienda evitar actividades al aire libre
                  </Text>
                </View>
              )}
            </View>
          ))}
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
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // White text on green works for both themes
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  section: {
    margin: 16,
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarSection: {
    margin: 16,
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  weekToggleButton: {
    backgroundColor: "#f3f4f6", // Light mode default, overridden by dynamic styles
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    elevation: 2,
  },
  weekToggleText: {
    fontSize: 12,
    color: "#4b5563", // Light mode default, overridden by dynamic styles
    fontWeight: "500",
  },
  calendarDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  calendarDay: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: "#10b981", // Keep green for selected day in both themes
  },
  dayName: {
    fontSize: 12,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
    marginBottom: 4,
    textTransform: "capitalize",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  selectedDayText: {
    color: "white", // White text for selected day in both themes
  },
  todayText: {
    color: "#10b981", // Light mode default, overridden by dynamic styles
  },
  dayAqiIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  dayAqiText: {
    color: "white", // White text on colored background works for both themes
    fontSize: 12,
    fontWeight: "bold",
  },
  selectedDayDetails: {
    backgroundColor: "#f8fafc", // Light mode default, overridden by dynamic styles
    borderRadius: 8,
    padding: 16,
  },
  selectedDayDate: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    textTransform: "capitalize",
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  aqiDetailsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  aqiBadgeLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  aqiTextLarge: {
    color: "white", // White text on colored background works for both themes
    fontSize: 24,
    fontWeight: "bold",
  },
  aqiInfo: {
    flex: 1,
    justifyContent: "center",
  },
  aqiStatus: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  aqiDescription: {
    fontSize: 12,
    color: "#4b5563", // Light mode default, overridden by dynamic styles
    lineHeight: 16,
  },
  dailyMetricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dailyMetric: {
    flexDirection: "row",
    alignItems: "center",
  },
  dailyMetricLabel: {
    fontSize: 12,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
    marginLeft: 8,
  },
  dailyMetricValue: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  locationCard: {
    backgroundColor: "#f8fafc", // Light mode default, overridden by dynamic styles
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  aqiBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  aqiText: {
    color: "white", // White text on colored background works for both themes
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  metric: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff7ed", // Light mode default, overridden by dynamic styles
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  warningText: {
    fontSize: 12,
    color: "#9a3412", // Light mode default, overridden by dynamic styles
    marginLeft: 4,
  },
  headerCalendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    gap: 8,
  },
})

