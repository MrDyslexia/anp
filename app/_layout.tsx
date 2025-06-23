import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
// Evita que se esconda automáticamente el splash hasta que cargue todo
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync("hidden");

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" hidden />
      <Slot />
    </ThemeProvider>
  );
}