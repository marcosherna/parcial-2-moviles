import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import TaskCard from "../components/TaskCard";

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const data = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Tarea #${index + 1}`,
      taskNumber: index + 1,
      time: "9:30 - 10:00",
      type: index % 2 === 0 ? "Internal Task" : "External Task",
      completed: index % 3 === 0,
    }));
    setTasks(data);
  }, []);

  const handleTaskClick = (task) => {
    navigation.navigate("task-detail")
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            taskNumber={item.taskNumber}
            time={item.time}
            type={item.type}
            completed={item.completed}
            onPress={() => handleTaskClick(item)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
