import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
// import TaskkFormScreen from "../screens/TaskFormScreen";

const Stack = createStackNavigator();

export default function BookStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* <Stack.Screen name="book-list" component={HomeScreen} /> */}
      <Stack.Screen name="book-detail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
