import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "../components/Input";
import XButton from "../components/XButton";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigation.pop();
  };
  const handleSubmit = () => {
    if (form.name.trim().length < 6) return;
    if (!form.email.includes("@") || !form.email.includes(".")) return;
    if (form.password.length < 8) return;

    Alert.alert(
      "Registro exitoso ✅",
      `Nombre: ${form.name}\nEmail: ${form.email}\nContraseña: ${form.password}`,
      [
        {
          text: "Continuar",
          onPress: () => navigation.navigate("main-app"),
        },
      ]
    );

    navigation.navigate("main-app");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        label="Nombre"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Ingresa tu nombre"
        error={
          form.name.length < 6 && form.name
            ? "El nombre debe tener al menos 6 caracteres"
            : ""
        }
      />

      <Input
        label="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Ingresa tu correo"
        error={
          !form.email.includes("@") && form.email ? "Formato invalido" : ""
        }
      />

      <Input
        label="Contrasenia"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        placeholder="Ingresa tu contrasenia"
        error={
          form.password.length < 8 && form.password
            ? "El contrasenia debe tener al menos 8 caracteres"
            : ""
        }
      />

      <View style={styles.btn_container}>
        <XButton title="Registrar" onPress={() => handleSubmit()} />
        <XButton
          variant="outline"
          title="Volver"
          onPress={() => handleBack()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    padding: 16,
  },
  btn_container: {
    marginTop: 15,
    gap: 8,
  },
});
