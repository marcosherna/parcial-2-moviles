import { TouchableOpacity } from "react-native";
import { Menu } from "lucide-react-native";

export default function ButtonDrawer({ color = "#000", size = 24, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6} 
      style={{ padding: 6 }} 
    >
      <Menu color={color} size={size} />
    </TouchableOpacity>
  );
}
