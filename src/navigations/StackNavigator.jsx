import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="main-app" component={DrawerNavigator} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
