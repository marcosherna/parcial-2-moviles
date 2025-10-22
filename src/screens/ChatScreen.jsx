import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import MessageBubble from "../components/MessageBubble";
import Input from "../components/Input";
import IconButton from "../components/IconButton";

import { API_URL, API_KEY } from "../libs/groq"; 

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hola! Cómo estás?", isMine: false, time: "01:15 PM" },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef(null);

  const handleSend = async () => {
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

    // Llamada al asistente
    setLoading(true);
    try {
      const updatedMessages = [
        ...messages.map((msg) => ({
          role: msg.isMine ? "user" : "assistant",
          content: msg.text,
        })),
        { role: "user", content: inputText },
      ];

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: updatedMessages,
          temperature: 0.7,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const aiMessage = {
        id: Date.now().toString() + "-ai",
        text: data.choices[0].message.content,
        isMine: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Scroll al final de nuevo
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error al enviar mensaje a la API:", error);
    } finally {
      setLoading(false);
    }
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

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#10B981" />
        </View>
      )}

      <View style={styles.inputRow}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Input
            placeholder="Escribe un mensaje..."
            value={inputText}
            onChangeText={setInputText}
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
  loading: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
