import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BookOpen, User } from 'lucide-react-native';

const BookCard = ({
  title = "El Principito",
  author = "Antoine de Saint-Exupéry",
  thumbnail = "https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG",
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Miniatura del libro */}
      <Image
        source={{ uri: thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.authorContainer}>
          <User size={16} color="#6B7280" />
          <Text style={styles.author}>{author}</Text>
        </View>
      </View>

      {/* Ícono decorativo */}
      <BookOpen size={20} color="#10B981" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(236, 254, 246, 0.8)",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 6,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  author: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  icon: {
    marginLeft: 8,
  },
});

export default BookCard;
