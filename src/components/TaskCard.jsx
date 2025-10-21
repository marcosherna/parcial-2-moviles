import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, Calendar, Tag } from 'lucide-react-native';

const TaskCard = ({
  title = "Remodelación #327",
  taskNumber = "327",
  time = "9:30 - 10:00",
  type = "Internal Task",
  completed = true,
  onPress = () => {}, 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.checkIcons}>
        {completed && (
          <CheckCircle size={20} color="#10B981" style={styles.checkIcon} />
        )}
        {completed && (
          <CheckCircle size={20} color="#10B981" style={styles.checkIcon} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.timeContainer}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.typeContainer}>
            <Tag size={16} color="#6B7280" />
            <Text style={styles.type}>{type}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.dots}>⋯</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(236, 254, 246, 0.8)",
    borderRadius: 12,
    padding: 16,
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkIcons: {
    flexDirection: "row",
    marginRight: 12,
  },
  checkIcon: {
    marginRight: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  dots: {
    fontSize: 20,
    color: "#6B7280",
    marginLeft: 8,
  },
});

export default TaskCard;