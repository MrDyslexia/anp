"use client";

import { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Home, Map, Bell, User, ChevronRight, X } from "lucide-react-native";

const { width } = Dimensions.get("window");

// Instruction screens data
const instructionScreens = [
  {
    id: "1",
    title: "Monitoreo de Calidad del Aire",
    description:
      "Bienvenido a la aplicación de monitoreo de calidad del aire. Aquí podrás ver información actualizada sobre la contaminación en diferentes regiones de Chile.",
    icon: (color: string) => <Home size={80} color={color} />,
    feature: "Pantalla de Inicio",
    details:
      "Visualiza datos en tiempo real de tus zonas favoritas y consulta el historial de calidad del aire de los últimos días.",
  },
  {
    id: "2",
    title: "Mapa de Contaminación",
    description:
      "Explora las regiones interactivas para ver los niveles de contaminación a lo largo del país.",
    icon: (color: string) => <Map size={80} color={color} />,
    feature: "Regiones",
    details:
      "Busca regiones específicas, filtra por favoritos y consulta parámetros detallados como PM2.5, PM10, O₃ y NO₂.",
  },
  {
    id: "3",
    title: "Notificaciones",
    description:
      "Mantente informado con alertas y actualizaciones sobre la calidad del aire.",
    icon: (color: string) => <Bell size={80} color={color} />,
    feature: "Centro de Notificaciones",
    details:
      "Recibe alertas de contaminación, mejoras en la calidad del aire y cambios climáticos que puedan afectar tu salud.",
  },
  {
    id: "4",
    title: "Perfil y Preferencias",
    description:
      "Personaliza tu experiencia y gestiona tus preferencias de usuario.",
    icon: (color: string) => <User size={80} color={color} />,
    feature: "Perfil",
    details:
      "Configura tus ubicaciones favoritas, permisos de ubicación y accede a soporte técnico cuando lo necesites.",
  },
];

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = getStyles(isDarkMode);

  const goToNextScreen = () => {
    if (currentIndex < instructionScreens.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    } else {
      goToHomeScreen();
    }
  };

  const goToHomeScreen = () => {
    //router.replace("/login")
    router.replace("/HomeScreen");
  };

  const flatListRef = useRef<FlatList<(typeof instructionScreens)[0]>>(null);

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof instructionScreens)[0];
    index: number;
  }) => {
    const accentColor = "#10b981";

    return (
      <View style={styles.slide}>
        <View style={styles.iconContainer}>{item.icon(accentColor)}</View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.featureContainer}>
          <Text style={styles.featureTitle}>{item.feature}</Text>
          <Text style={styles.featureDescription}>{item.details}</Text>
        </View>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {instructionScreens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={instructionScreens}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />

        <View style={styles.footer}>
          <Pagination />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={goToNextScreen}
              style={styles.nextButton}
              contentStyle={styles.buttonContent}
            >
              {currentIndex === instructionScreens.length - 1
                ? "Comenzar"
                : "Siguiente"}
              {currentIndex < instructionScreens.length - 1 && (
                <ChevronRight
                  size={20}
                  color="white"
                  style={styles.buttonIcon}
                />
              )}
            </Button>

            {currentIndex < instructionScreens.length - 1 && (
              <Button
                mode="text"
                onPress={goToHomeScreen}
                style={styles.skipTextButton}
                textColor={isDarkMode ? "#9ca3af" : "#6b7280"}
              >
                Saltar
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#fff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      position: "relative",
    },
    logo: {
      width: 60,
      height: 60,
    },
    skipButton: {
      position: "absolute",
      right: 16,
      top: 16,
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.05)",
    },
    slide: {
      width: Dimensions.get("window").width,
      padding: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    iconContainer: {
      marginBottom: 32,
      padding: 24,
      borderRadius: 100,
      backgroundColor: isDarkMode
        ? "rgba(16, 185, 129, 0.1)"
        : "rgba(16, 185, 129, 0.1)",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    description: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 32,
      lineHeight: 24,
      color: isDarkMode ? "#9ca3af" : "#4b5563",
    },
    featureContainer: {
      backgroundColor: isDarkMode ? "#1e1e1e" : "#f8fafc",
      borderRadius: 12,
      padding: 16,
      width: "100%",
      marginBottom: 24,
    },
    featureTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    featureDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: isDarkMode ? "#9ca3af" : "#4b5563",
    },
    footer: {
      padding: 24,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 24,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: isDarkMode ? "#4b5563" : "#d1d5db",
    },
    paginationDotActive: {
      backgroundColor: "#10b981",
      width: 24,
    },
    buttonContainer: {
      alignItems: "center",
    },
    nextButton: {
      width: "100%",
      borderRadius: 8,
      backgroundColor: "#10b981",
    },
    buttonContent: {
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonIcon: {
      marginLeft: 8,
    },
    skipTextButton: {
      marginTop: 12,
    },
  });
