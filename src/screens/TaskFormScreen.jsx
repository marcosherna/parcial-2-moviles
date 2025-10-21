import React from "react";
import { View, Button } from "react-native";

import Input from "../components/Input";
import XSwitch from "../components/XSwitch";

export default function TaskkFormScreen() {
  const [form, setForm] = React.useState({
    name: "",
    description: "",
    completed: false,
    created_at: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <View style={{ padding: 16 }}>
      <Input
        label="Nombre"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Ingresa tu nombre"
        error={
          form.name.length < 2 && form.name
            ? "El nombre debe tener al menos 2 caracteres"
            : ""
        }
      />

      <Input
        label="Descripcion"
        value={form.description}
        multiline
        numberOfLines={4}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Ingresa tu nombre"
        error={
          form.description.length < 2 && form.description
            ? "El descripcion debe tener al menos 2 caracteres"
            : ""
        }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <XSwitch
          value={form.completed} 
          onChange={(value) => handleChange("completed", value)}
        />
        <Button title="Save" onPress={() => handleSubmit()}></Button>
      </View>
    </View>
  );
}
