import React, { useState, useRef, useEffect } from "react";
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
import { db } from "../libs/firebase";
import { useUserSession } from "../store/userSession";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function ChatScreen() {
  const userSession = useUserSession();
  const userPrefix = userSession.getUserCollectionPrefix();
  const chatCollectionName = `chat_${userPrefix}`;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef(null);
 
  useEffect(() => {
    const q = query(
      collection(db, chatCollectionName),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatHistory = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        isMine: doc.data().isMine,
        time: doc.data().time,
      }));
      setMessages(chatHistory);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => unsubscribe();
  }, [chatCollectionName]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const timestamp = Date.now();
    const timeString = new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      text: inputText,
      isMine: true,
      time: timeString,
      timestamp,
    };
 
    try {
      await addDoc(collection(db, chatCollectionName), newMessage);
    } catch (error) {
      console.error("Error guardando mensaje:", error);
    }

    setInputText("");
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
      const aiText = data.choices[0].message.content;

      const aiMessage = {
        text: aiText,
        isMine: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: Date.now(),
      };
 
      await addDoc(collection(db, chatCollectionName), aiMessage);
    } catch (error) {
      console.error("Error al obtener respuesta de la API:", error);
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
