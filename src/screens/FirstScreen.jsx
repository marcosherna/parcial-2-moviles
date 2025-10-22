import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import XButton from "../components/XButton";

export default function FirstScreen({ navigation }) {
  const handleRegisterScreen = () => {
    navigation.navigate("register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <XButton title="Inciar sesion" />
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
