import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home, MessageCircle, Info } from "lucide-react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatScreen from "../screens/ChatScreen";
import AboutScreen from "../screens/AboutScreen";
import TabNavigator from "./TabNavigator";

// import ButtonDrawer from "../components/ButtonDrawer";

const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// const ChatStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Chat"
//         component={ChatScreen}
//         options={({ navigation }) => ({
//           headerLeft: () => (
//             <ButtonDrawer onPress={() => navigation.toggleDrawer()} />
//           ),
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        swipeEnabled: true, 
      })} 
    >
      <Drawer.Screen
        name="main-tab"
        component={TabNavigator}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          drawerIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        component={AboutScreen}
        options={{
          title: "About",
          drawerIcon: ({ color, size }) => <Info color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}
