import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Plus } from "lucide-react-native";

import { subscribeToBooks } from "../network/firebase";
import BookCard from "../components/BookCard";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = subscribeToBooks(
      "libros-demo",
      (booksList) => {
        setBooks(booksList);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Error escuchando libros:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleBookDetail = (book) => { 
    navigation.navigate("book", { screen: "book-detail", params: { book } });
  };

  const handleFormClick = () => {
    navigation.navigate("task-form");
  };

  return (
    <View style={styles.container}>
      {books.length === 0 ? (
        <Text style={styles.empty}>No hay libros disponibles 📚</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookCard
              title={item?.titulo}
              author={item?.autor}
              thumbnail={item.miniatura}
              onPress={() => handleBookDetail(item)}
            />
          )}
          contentContainerStyle={{ padding: 10 }}
        />
      )}

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
