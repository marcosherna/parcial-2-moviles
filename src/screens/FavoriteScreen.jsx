import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import BookCard from "../components/BookCard";
import { subscribeToBooks } from "../network/firebase";
import { useUserSession } from "../store/userSession";

export default function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const userSession = useUserSession();
  const userPrefix = userSession.getUserCollectionPrefix();
  const favCollectionName = `${userPrefix}-favoritos`;

  useEffect(() => {
    const unsubscribe = subscribeToBooks(
      favCollectionName,
      (booksList) => {
        setFavorites(booksList);
        setLoading(false);
      },
      (error) => {
        console.error("Error escuchando favoritos:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [favCollectionName]);

  const handleBookPress = (book) => {
    navigation.navigate("book", {
      screen: "book-detail",
      params: { book, fromFavorites: true },
    });
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No hay libros disponibles 📚</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookCard
              title={item.titulo}
              author={item.autor}
              thumbnail={item.miniatura}
              onPress={() => handleBookPress(item)}
            />
          )}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
