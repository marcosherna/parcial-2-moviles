import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({
  text = "Hello!",
  isMine = false, 
  time = "01:16 PM",
  style = {},
  textStyle = {},
}) {
  return (
    <View
      style={[
        styles.container,
        isMine ? styles.mineContainer : styles.otherContainer,
        { alignSelf: isMine ? "flex-end" : "flex-start" },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isMine ? styles.mineText : styles.otherText,
          textStyle,
        ]}
      >
        {text}
      </Text>
      <Text style={[styles.time, isMine ? styles.mineTime : styles.otherTime]}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4, 
  },
  mineContainer: {
    backgroundColor: "#10B981",
  },
  otherContainer: {
    backgroundColor: "#E5E7EB",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  mineText: {
    color: "#FFFFFF",
  },
  otherText: {
    color: "#1F2937",
  },
  time: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
  },
  mineTime: {
    color: "#D1FAE5",
  },
  otherTime: {
    color: "#6B7280",
  },
});
