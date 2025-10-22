import { Alert } from "react-native";
import IconButton from "./IconButton";

import { useUserSession } from "../store/userSession";

export default function UserButton() {
  const userSession = useUserSession((state) => state.user);

  const handleOnPress = () => {
    Alert.alert(
      "Informacion del usuario",
      `Nombre: ${userSession?.name}\nEmail: ${userSession.email}\nPassword: Denegado!`
    );
  };

  return <IconButton icon="User" onPress={() => handleOnPress()} />;
}
