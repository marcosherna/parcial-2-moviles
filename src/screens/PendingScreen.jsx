import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { subscribeToBooks } from "../network/firebase";
import { useUserSession } from "../store/userSession";

import BookCard from "../components/BookCard";

export default function PendingScreen({ navigation }) {
  const [pendings, setPendings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const userSession = useUserSession();
  const userPrefix = userSession.getUserCollectionPrefix();
  const pdgCollectionName = `${userPrefix}-pendientes`;

  React.useEffect(() => {
    const unsubscribe = subscribeToBooks(
      pdgCollectionName,
      (booksList) => {
        setPendings(booksList);
        setLoading(false);
      },
      (error) => {
        console.error("Error escuchando pendientes:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [pdgCollectionName]);

  const handleBookDetail = (book) => { 
    navigation.navigate("book", { screen: "book-detail", params: { book } });
  };

  return (
    <View style={styles.container}>
      {pendings.length === 0 ? (
        <Text style={styles.empty}>No hay libros disponibles 📚</Text>
      ) : (
        <FlatList
          data={pendings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookCard
              title={item.titulo}
              author={item.autor}
              thumbnail={item.miniatura}
              onPress={() => handleBookDetail(item)}
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
