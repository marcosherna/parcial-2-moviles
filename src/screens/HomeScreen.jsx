import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import { Plus } from "lucide-react-native";

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
    navigation.navigate("task-detail");
  };

  const handleFormClick = () => { 
    navigation.navigate("task-form"); 
  };

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

      <TouchableOpacity style={styles.fab} onPress={handleFormClick}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
