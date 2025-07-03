import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig"; // Ajusta el path según tu estructura

const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ email: firebaseUser.email || "" });
        router.replace("/HomeScreen");
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      if (!response.data?.idToken) throw new Error("ID Token is undefined");
      const credential = GoogleAuthProvider.credential(response.data.idToken);
      await signInWithCredential(auth, credential);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Sign in already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play services not available or outdated");
            break;
          default:
            console.error(error);
        }
      } else {
        console.error("Non-Google error:", error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <Text>Welcome {user.email}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign-out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
