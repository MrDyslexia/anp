"use client"

import { useState, useMemo } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Bell, Settings, AlertTriangle, Info, CloudRain } from "lucide-react-native"
import type { Notification } from "@/types/interfaces"
import { NOTIFICATIONS } from "@/data"
import { useColorScheme } from "@/hooks/useColorScheme"

const NotificationsScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [showSettings, setShowSettings] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    alerts: true,
    improvements: true,
    weather: true,
    dailySummary: false,
  })

  // Create dynamic styles based on color scheme
  const dynamicStyles = useMemo(() => {
    return {
      container: {
        backgroundColor: isDarkMode ? "#121212" : "#f9fafb",
      },
      cardBackground: {
        backgroundColor: isDarkMode ? "#1e1e1e" : "white",
      },
      unreadCardBackground: {
        backgroundColor: isDarkMode ? "#0f2d25" : "#ecfdf5",
      },
      textPrimary: {
        color: isDarkMode ? "#e5e7eb" : "#1f2937",
      },
      textSecondary: {
        color: isDarkMode ? "#9ca3af" : "#6b7280",
      },
      borderColor: {
        borderBottomColor: isDarkMode ? "#333333" : "#e5e7eb",
      },
      switchTrackColor: {
        false: isDarkMode ? "#4b5563" : "#d1d5db",
        true: "#10b981",
      },
      switchThumbColor: {
        color: isDarkMode ? "#e5e7eb" : "white",
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
            <Text>Please log in to view notifications.</Text>
        </View>
        )

  }*/

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const getIconForType = (type: string) => {
    // Keep the same icon colors for both themes for consistency
    switch (type) {
      case "warning":
        return <AlertTriangle size={24} color="#f59e0b" />
      case "info":
        return <Info size={24} color="#3b82f6" />
      case "weather":
        return <CloudRain size={24} color="#8b5cf6" />
      default:
        return <Bell size={24} color="#10b981" />
    }
  }

  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read ? dynamicStyles.unreadCardBackground : dynamicStyles.cardBackground]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>{getIconForType(item.type)}</View>
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, dynamicStyles.textPrimary]}>{item.title}</Text>
        <Text style={[styles.notificationMessage, dynamicStyles.textSecondary]}>{item.message}</Text>
        <Text style={[styles.notificationTime, dynamicStyles.textSecondary]}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificaciones</Text>
        <TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
          <Settings size={24} color="white" />
        </TouchableOpacity>
      </View>

      {showSettings ? (
        <View style={styles.settingsContainer}>
          <Text style={[styles.settingsTitle, dynamicStyles.textPrimary]}>Configuración de Notificaciones</Text>

          <View style={[styles.settingItem, dynamicStyles.cardBackground]}>
            <View>
              <Text style={[styles.settingLabel, dynamicStyles.textPrimary]}>Alertas de contaminación</Text>
              <Text style={[styles.settingDescription, dynamicStyles.textSecondary]}>
                Recibe alertas cuando la calidad del aire sea peligrosa
              </Text>
            </View>
            <Switch
              value={notificationSettings.alerts}
              onValueChange={() => toggleSetting("alerts")}
              trackColor={dynamicStyles.switchTrackColor}
              thumbColor={dynamicStyles.switchThumbColor.color}
            />
          </View>

          <View style={[styles.settingItem, dynamicStyles.cardBackground]}>
            <View>
              <Text style={[styles.settingLabel, dynamicStyles.textPrimary]}>Mejoras en la calidad del aire</Text>
              <Text style={[styles.settingDescription, dynamicStyles.textSecondary]}>
                Notificaciones cuando la calidad del aire mejore
              </Text>
            </View>
            <Switch
              value={notificationSettings.improvements}
              onValueChange={() => toggleSetting("improvements")}
              trackColor={dynamicStyles.switchTrackColor}
              thumbColor={dynamicStyles.switchThumbColor.color}
            />
          </View>

          <View style={[styles.settingItem, dynamicStyles.cardBackground]}>
            <View>
              <Text style={[styles.settingLabel, dynamicStyles.textPrimary]}>Pronóstico del tiempo</Text>
              <Text style={[styles.settingDescription, dynamicStyles.textSecondary]}>
                Notificaciones sobre cambios climáticos que afecten la calidad del aire
              </Text>
            </View>
            <Switch
              value={notificationSettings.weather}
              onValueChange={() => toggleSetting("weather")}
              trackColor={dynamicStyles.switchTrackColor}
              thumbColor={dynamicStyles.switchThumbColor.color}
            />
          </View>

          <View style={[styles.settingItem, dynamicStyles.cardBackground]}>
            <View>
              <Text style={[styles.settingLabel, dynamicStyles.textPrimary]}>Resumen diario</Text>
              <Text style={[styles.settingDescription, dynamicStyles.textSecondary]}>
                Recibe un resumen diario de la calidad del aire en tus zonas favoritas
              </Text>
            </View>
            <Switch
              value={notificationSettings.dailySummary}
              onValueChange={() => toggleSetting("dailySummary")}
              trackColor={dynamicStyles.switchTrackColor}
              thumbColor={dynamicStyles.switchThumbColor.color}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={[styles.notificationStats, dynamicStyles.borderColor]}>
            <Text style={[styles.statsText, dynamicStyles.textSecondary]}>
              {notifications.filter((n) => !n.read).length} sin leer • {notifications.length} total
            </Text>
          </View>

          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#10b981", // Keep green header for both themes
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // White text on green works for both themes
  },
  notificationStats: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // Light mode default, overridden by dynamic styles
  },
  statsText: {
    fontSize: 14,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
  },
  listContainer: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadCard: {
    backgroundColor: "#ecfdf5", // Light mode default, overridden by dynamic styles
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  notificationMessage: {
    fontSize: 14,
    color: "#4b5563", // Light mode default, overridden by dynamic styles
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981", // Keep green indicator for both themes
    alignSelf: "flex-start",
    marginTop: 8,
  },
  settingsContainer: {
    padding: 16,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white", // Light mode default, overridden by dynamic styles
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#1f2937", // Light mode default, overridden by dynamic styles
  },
  settingDescription: {
    fontSize: 14,
    color: "#6b7280", // Light mode default, overridden by dynamic styles
    maxWidth: "80%",
  },
})

export default NotificationsScreen

