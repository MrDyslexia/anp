import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#121212' : '#ffffff' },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? '#ffffff' : '#000000' },
          ]}
        >
          Página no encontrada
        </Text>
        <Text
          style={[
            styles.message,
            { color: isDarkMode ? '#cccccc' : '#666666' },
          ]}
        >
          La ruta especificada no existe.
        </Text>
        <Link href="/" style={[styles.link, { color: isDarkMode ? '#1e90ff' : '#007aff' }]}>
          Volver a la página principal
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
