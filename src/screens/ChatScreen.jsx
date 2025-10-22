import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MessageBubble from "../components/MessageBubble";
import Input from "../components/Input";
import IconButton from "../components/IconButton";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hola! Cómo estás?", isMine: false, time: "01:15 PM" },
    { id: "2", text: "Bien, gracias! 😊", isMine: true, time: "01:16 PM" },
  ]);

  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      isMine: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Scroll al final
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isMine={item.isMine}
            time={item.time}
          />
        )}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Escribe un mensaje..."
            value={inputText}
            onChangeText={setInputText}
            style={styles.inputField} 
          />
        </View>
        <IconButton
          icon="Send"
          size={28}
          color="#10B981"
          onPress={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  messagesContainer: { padding: 10, paddingBottom: 80 },
  inputRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  inputField: {
    flex: 1, 
    marginRight: 8, 
  },
  sendButton: {
    borderRadius: 24,
    padding: 8,
  },
});
