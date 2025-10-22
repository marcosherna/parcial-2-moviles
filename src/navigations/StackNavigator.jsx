import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import FirstScreen from "../screens/FirstScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="first" component={FirstScreen} />
        <Stack.Screen name="main-app" component={DrawerNavigator} /> 
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
