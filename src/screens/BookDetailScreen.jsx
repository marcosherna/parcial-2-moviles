import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Switch, Alert, TouchableOpacity } from "react-native";
import IconButton from "../components/IconButton";
import { useUserSession } from "../store/userSession";
import {
  addBookToUserCollection,
  deleteBook,
  updateBookField,
  getFavCollectionName,
  getPendingCollectionName,
} from "../network/firebase";

export default function BookDetailScreen({ route, navigation }) {
  const { book, fromFavorites, fromPendings } = route.params || {};
  const getUserCollectionPrefix = useUserSession((state) => state.getUserCollectionPrefix);
  const userPrefix = getUserCollectionPrefix();

  const favCollectionName = getFavCollectionName(userPrefix);
  const pendingCollectionName = getPendingCollectionName(userPrefix);

  const [isRead, setIsRead] = useState(book?.estado === "leido");
  const [isFavorite, setIsFavorite] = useState(!!fromFavorites);
  const [isRecommended, setIsRecommended] = useState(book?.recomendado === true);
  const [rating, setRating] = useState(book?.rating || 0);
 
  const toggleRead = async () => {
    if (fromPendings) {
      try {
        await deleteBook(pendingCollectionName, book.id);
        Alert.alert("Eliminado", "El libro fue eliminado de pendientes.");
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "No se pudo eliminar de pendientes.");
      }
    } else {
      const newState = !isRead;
      setIsRead(newState);
      try {
        await addBookToUserCollection(
          userPrefix,
          { ...book, estado: newState ? "leido" : "pendiente" },
          "pendientes"
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo actualizar el estado del libro.");
        setIsRead(!newState);
      }
    }
  }; 

  const toggleFavorite = async () => {
    if (fromFavorites) {
      try {
        await deleteBook(favCollectionName, book.id);
        Alert.alert("Eliminado", "El libro fue eliminado de favoritos.");
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "No se pudo eliminar de favoritos.");
      }
    } else {
      const newState = !isFavorite;
      setIsFavorite(newState);
      try {
        await addBookToUserCollection(userPrefix, book, "favoritos");
      } catch (error) {
        Alert.alert("Error", "No se pudo agregar a favoritos.");
        setIsFavorite(!newState);
      }
    }
  };
 
  const handleRate = async () => {
    try {
      const fieldsToUpdate = { recomendado: true, rating: 5 };
      await updateBookField(favCollectionName, book.id, fieldsToUpdate);
      setIsRecommended(true);
      setRating(5);
      Alert.alert("Gracias", "Has valorado este libro como recomendado ⭐");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la valoración.");
    }
  };

  return (
    <View style={styles.container}>
      {book?.miniatura && (
        <Image source={{ uri: book.miniatura }} style={styles.thumbnail} />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{book?.titulo}</Text>
        <Text style={styles.author}>{book?.autor}</Text>
      </View>

      <View style={styles.actionRow}>
        {!fromFavorites && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isRead ? "#007AFF" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleRead}
              value={fromPendings ? true : isRead}
            />
            <Text style={styles.switchLabel}>
              {fromPendings ? "Pendiente" : isRead ? "Leído" : "Pendiente"}
            </Text>
          </View>
        )}

        {!fromPendings && (
          <IconButton
            icon="Heart"
            size={28}
            color={isFavorite ? "#EF4444" : "#10B981"}
            onPress={toggleFavorite}
          />
        )}
      </View>

      {fromFavorites && (
        <View style={styles.favoriteExtras}>
          {isRecommended ? (
            <View style={styles.recommendedTag}>
              <Text style={styles.recommendedText}>Recomendado</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.rateButton} onPress={handleRate}>
              <Text style={styles.rateButtonText}>Valorar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Descripción</Text>
        <Text style={styles.description}>{book?.descripcion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  thumbnail: { width: "100%", height: 300, borderRadius: 12, marginBottom: 16 },
  headerContainer: { marginBottom: 16 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  author: { fontSize: 16, color: "#6B7280" },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  switchLabel: { fontSize: 16, color: "#1F2937", marginLeft: 8 },

  // ⭐ Extras para favoritos
  favoriteExtras: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  rateButton: {
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rateButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  recommendedTag: {
    backgroundColor: "#FDE68A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  recommendedText: {
    color: "#92400E",
    fontWeight: "700",
  },

  section: { marginBottom: 20 },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  description: { fontSize: 14, color: "#4B5563", textAlign: "justify" },
});
