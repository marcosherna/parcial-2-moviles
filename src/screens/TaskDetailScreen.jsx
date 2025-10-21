import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
export default function TaskDetailScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Task todo</Text>
        <Text style={styles.title}>
          Create Actionable Plans for Product - Phase 01
        </Text>
        <Text style={styles.dots}>⋯</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.date}>Today</Text>
        <Text style={styles.time}>13:05 PM</Text>
        <Text style={styles.progress}>| 0/2</Text>
      </View>

      <View style={styles.header_container}>
        <Text style={styles.header}>Descripcion</Text>
        <Text
          style={{
            ...styles.title,
            fontSize: 18,
            textAlign: "justify",
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </Text>
        <Text style={styles.dots}>⋯</Text>
      </View>

      <View>
        <View style={styles.section}>
          <Text style={styles.header}>Acciones</Text>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#007AFF" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />

            <Text>{isEnabled ? "Completado" : ""}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informacion</Text>
          <View style={styles.attachmentRow}>
            <Text style={styles.attachment}>📄 Preview image.jpg 270.3 KB</Text>
            <Text style={styles.attachment}>📦 Brief.zip 10.9 MB</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header_container: {
    marginVertical: 8,
  },
  header: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  dots: {
    fontSize: 20,
    color: "#6B7280",
    alignSelf: "flex-end",
  },
  date: {
    fontSize: 14,
    color: "#10B981",
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 8,
  },
  time: {
    fontSize: 14,
    color: "#1F2937",
    marginRight: 8,
  },
  progress: {
    fontSize: 14,
    color: "#6B7280",
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    fontSize: 16,
    marginRight: 8,
  },
  todoText: {
    fontSize: 14,
    color: "#4B5563",
  },
  assigneeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  assignee: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  assigneeIcon: {
    fontSize: 20,
    color: "#6B7280",
  },
  addAssignee: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  attachmentRow: {
    marginTop: 8,
  },
  attachment: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
});
