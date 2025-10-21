import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";

const Stack = createStackNavigator();

export default function TaskStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="task-list" component={HomeScreen} />
      <Stack.Screen name="task-detail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}
