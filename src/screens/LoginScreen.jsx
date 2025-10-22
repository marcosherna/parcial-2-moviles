import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "../components/Input";
import XButton from "../components/XButton";

import { db } from "../libs/firebase";
import { useUserSession } from "../store/userSession";
import { doc, getDoc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const setUser = useUserSession((state) => state.setUser);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email.includes("@") || !form.email.includes(".")) return;
    if (!form.password) return;

    try {
      const docRef = doc(db, "user-register", form.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alert.alert("Error", "Usuario no registrado");
        return;
      }

      const userData = docSnap.data();

      if (userData.password !== form.password) {
        Alert.alert("Error", "Contraseña incorrecta");
        return;
      }
 
      setUser(userData);
 
      navigation.navigate("main-app");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  const handleRegister = () => {
    navigation.navigate("register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        label="Email"
        placeholder="Ingresa tu correo"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <Input
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      <View style={styles.btn_container}>
        <XButton title="Iniciar sesión" onPress={handleSubmit} />
        <XButton
          variant="outline"
          title="Registrarse"
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn_container: {
    marginTop: 15,
    gap: 8,
  },
});
