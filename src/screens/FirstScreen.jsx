import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import XButton from "../components/XButton";
import { db } from "../libs/firebase";

export default function FirstScreen({ navigation }) {
  const handleRegisterScreen = () => {
    navigation.navigate("register");
  };

  const handleLoginScreen = () => {
    navigation.navigate("login");
  };

  React.useEffect(() => {
    console.log(db);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <XButton title="Inciar sesion" onPress={() => handleLoginScreen()} />
      <XButton
        variant="secondary"
        title="Registrarme"
        onPress={() => handleRegisterScreen()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    gap: 8,
  },
});
