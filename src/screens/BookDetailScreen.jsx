import React from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";
import IconButton from "../components/IconButton";

export default function BookDetailScreen({ navigation, route }) {
  const { book } = route.params || {};
  const [isRead, setIsRead] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleRead = () => setIsRead((prev) => !prev);
  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <View style={styles.container}>
      {/* Imagen */}
      {book?.miniatura && (
        <Image source={{ uri: book.miniatura }} style={styles.thumbnail} />
      )}

      {/* Titulo y autor */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{book?.titulo}</Text>
        <Text style={styles.author}>{book?.autor}</Text>
      </View>

      {/* Switch para leído */}
      <View style={styles.actionRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isRead ? "#007AFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleRead}
            value={isRead}
          />
          <Text style={styles.switchLabel}>
            {isRead ? "Leído" : "Pendiente"}
          </Text>
        </View>
        {/* Icon button para favoritos */}
        <IconButton
          icon="Heart"
          size={28}
          color={isFavorite ? "#EF4444" : "#10B981"}
          onPress={toggleFavorite}
        />
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Descripción</Text>
        <Text style={styles.description}>{book?.descripcion}</Text>
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
  thumbnail: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#6B7280",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10
  },
  switchLabel: {
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "justify",
  },
});
