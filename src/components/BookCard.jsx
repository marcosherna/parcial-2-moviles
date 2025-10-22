import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import StatusTag from "./StatusTag";

const BookCard = ({
  book,
  type,
  onPress,
  onDelete,
  onRange,
  onToggleStatus,
}) => {
  const handleDelete = () => {
    onDelete?.();
  };

  const handleValorar = () => {
    onRange?.();
  };

  const handleToggleEstado = () => {
    onToggleStatus?.();
  };

  const handleDetail = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleDetail()}
    >
      <Image
        source={{ uri: book.miniatura || "https://via.placeholder.com/60x90" }}
        style={styles.bookThumbnail}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.bookTitle} numberOfLines={1}>
          {book.titulo}
        </Text>
        <Text style={styles.bookAuthor}>{book.autor}</Text>

        {/* Mostrar ubicación o información adicional */}
        {book.genero && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{book.genero}</Text>
          </View>
        )}

        <View style={styles.tagsContainer}>
          <StatusTag book={book} type={type} />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        {type === "favorites" && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDelete}
            >
              <Text style={styles.actionButtonText}>🗑️ Eliminar</Text>
            </TouchableOpacity>
            {!book.recomendado && ( // Solo mostrar "Valorar" si no está ya recomendado
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleValorar}
              >
                <Text style={styles.actionButtonText}>⭐ Valorar</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        {type === "pending" && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDelete}
            >
              <Text style={styles.actionButtonText}>🗑️ Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleToggleEstado}
            >
              <Text style={styles.actionButtonText}>
                {book.estado === "pendiente"
                  ? "✅ Marcar como Leído"
                  : "↩️ Marcar como Pendiente"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  bookThumbnail: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  statusTag: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
    fontWeight: "500",
  },
  acceptedTag: {
    backgroundColor: "#e6ffee", // Light green
    color: "#00b359", // Darker green
  },
  pendingTag: {
    backgroundColor: "#fff0e6", // Light orange
    color: "#ff8c00", // Darker orange
  },
  actionButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  actionButtonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  actionsContainer: {
    marginLeft: 10,
    alignItems: "flex-end",
  },
});

export default BookCard;
