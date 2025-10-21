import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";

export default function Input({
  label = "",
  error = "",
  placeholder = "",
  value,
  onChangeText,
  secureTextEntry = false,
  multiline = false,
  keyboardType = "default",
  style = {},
  containerStyle = {},
  inputStyle = {},
  labelStyle = {},
  errorStyle = {},
  ...props
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      <TextInput
        style={[styles.input, multiline && styles.multilineInput, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholderTextColor={styles.placeholderColor}
        {...props}
      />

      {error ? <Text style={[styles.error, errorStyle]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  placeholderColor: "#9CA3AF",
  error: {
    fontSize: 14,
    color: "#EF4444",
    marginTop: 4,
    fontWeight: "500",
  },
});
