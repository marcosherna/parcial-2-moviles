import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, User, Menu } from "lucide-react-native";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

import ButtonDrawer from "../components/ButtonDrawer";
import TaskStackNavigator from "./TaskStackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={TaskStackNavigator}
        options={({ navigation }) => ({
          title: "Inicio",
          headerLeft: () => (
            <ButtonDrawer onPress={() => navigation.toggleDrawer()} />
          ),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
