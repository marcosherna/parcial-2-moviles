import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
// import TaskkFormScreen from "../screens/TaskFormScreen";

const Stack = createStackNavigator();

export default function BookStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        headerStyle: {
          // backgroundColor: "#10B981", 
          elevation: 4, 
          shadowColor: "#000", 
        },
        headerTintColor: "#10B981", 
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          color: "#10B981",
        },
        cardStyle: {
          backgroundColor: "rgba(236, 254, 246, 0.8)",
        },
      }}>
      {/* <Stack.Screen name="book-list" component={HomeScreen} /> */}
      <Stack.Screen name="book-detail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
