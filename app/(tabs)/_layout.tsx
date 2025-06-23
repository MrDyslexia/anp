import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { Home, Settings, User, Bell, Map} from 'lucide-react-native'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="RegionScreen"
          options={{
            title: 'Mapa',
            tabBarIcon: ({ color }) => <Map size={24} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="NotificationScreen"
          options={{
            title: 'Notificaciones',
            tabBarIcon: ({ color }) => <Bell size={24} color={color} />,
            headerShown: false,
            href:null
          }}
        />
        <Tabs.Screen
          name="PorfileScreen"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
  )
}
