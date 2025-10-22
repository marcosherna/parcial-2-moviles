import { Text, StyleSheet } from "react-native";

export default function StatusTag({ book, type }) {
  if (type === "favoritos" && book?.recomendado) {
    return (
      <Text style={[styles.statusTag, styles.acceptedTag]}>⭐ Recomendado</Text>
    );
  }
  if (type === "pendiente") {
    const tagStyle =
      book.estado === "leído" ? styles.acceptedTag : styles.pendingTag;
    return (
      <Text style={[styles.statusTag, tagStyle]}>
        {book?.estado.charAt(0).toUpperCase() + book?.estado.slice(1)}
      </Text>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  statusTag: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
    fontWeight: "500",
  },
  acceptedTag: {
    backgroundColor: "#e6ffee",
    color: "#00b359",
  },
  pendingTag: {
    backgroundColor: "#fff0e6",
    color: "#ff8c00",
  },
});
