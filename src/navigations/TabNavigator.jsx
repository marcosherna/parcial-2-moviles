import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Heart, Clock, MessageCircle } from "lucide-react-native";

import ButtonDrawer from "../components/ButtonDrawer";
import BookStackNavigator from "./BookStackNavigator";
import FavoriteScreen from "../screens/FavoriteScreen";
import PendingScreen from "../screens/PendingScreen";
import ChatScreen from "../screens/ChatScreen";

import UserButton from "../components/UserButton";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Inicio",
          headerRight: () => (
            // TODO: USER ICON
            <UserButton />
          ),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        })}
      />

      <Tab.Screen
        name="Favoritos"
        component={FavoriteScreen}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Pendientes"
        component={PendingScreen}
        options={{
          title: "Pendientes",
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="ChatBot"
        component={ChatScreen}
        options={{
          title: "ChatBot",
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
