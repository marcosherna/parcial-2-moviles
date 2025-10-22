import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
// import DrawerNavigator from "./DrawerNavigator";
import FirstScreen from "../screens/FirstScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BookStackNavigator from "./BookStackNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="first" component={FirstScreen} />
        <Stack.Screen name="main-app" component={TabNavigator} /> 
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="book" component={BookStackNavigator} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
