import { Switch } from "react-native";

export default function XSwitch({ value, onChange }) {
  return (
    <Switch
      value={value}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={value ? "#007AFF" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={(value) => onChange(value)}
    />
  );
}
