import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="login" component={LoginScreen} /> */}
        <Stack.Screen name="main-app" component={TabNavigator} />
        {/* <Stack.Screen name="register" component={RegistrerScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
