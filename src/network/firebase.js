import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../libs/firebase";

/**
 * Escucha en tiempo real los cambios en una colección de Firestore.
 * @param {string} collectionName - El nombre de la colección (ej. 'libros_demo').
 * @param {function} setBooks - Función de React State para actualizar la lista.
 * @param {function} onError - Función para escuchar el error.
 * @returns {function} - Función para desuscribirse del listener.
 */
export const subscribeToBooks = (collectionName, setBooks, onError) => {
  const q = collection(db, collectionName);

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const booksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    },
    (error) => {
      onError?.(error);
    }
  );

  return unsubscribe;
};

/**
 * Agrega un libro a la colección de favoritos o pendientes.
 * @param {string} userSlug - El slug del usuario.
 * @param {object} bookData - Los datos completos del libro original.
 * @param {function} onError - Función para escuchar el error.
 * @param {string} targetType - 'favoritos' o 'pendientes'.
 */
export const addBookToUserCollection = async (
  userSlug,
  bookData,
  targetType,
  onError
) => {
  try {
    const collectionName =
      targetType === "favoritos"
        ? getFavCollectionName(userSlug)
        : getPendingCollectionName(userSlug);

    const docRef = doc(db, collectionName, bookData.id);

    const dataToSave = { ...bookData };
    if (targetType === "pendientes") {
      dataToSave.estado = "pendiente";
    }

    await setDoc(docRef, dataToSave);
    console.log(`Libro agregado a ${targetType}`);
    return true;
  } catch (error) {
    onError?.(error);
    return false;
  }
};

/**
 * Actualiza campos específicos de un libro en la colección de un usuario.
 * @param {string} collectionName - Colección del usuario (ej. '-favoritos').
 * @param {string} bookId - ID del documento del libro a actualizar.
 * @param {function} onError - Función para escuchar el error.
 * @param {object} fieldsToUpdate - Objeto con los campos a modificar.
 */
export const updateBookField = async (
  collectionName,
  bookId,
  fieldsToUpdate,
  onError
) => {
  try {
    const docRef = doc(db, collectionName, bookId);
    await updateDoc(docRef, fieldsToUpdate);
    console.log("Documento actualizado exitosamente");
    return true;
  } catch (error) {
    onError?.(error);
    return false;
  }
};

/**
 * Elimina un documento de libro de la colección de un usuario.
 * @param {string} collectionName - Colección del usuario (ej. '-favoritos').
 * @param {function} onError - Función para escuchar el error.
 * @param {string} bookId - ID del documento del libro a eliminar.
 */
export const deleteBook = async (collectionName, bookId, onError) => {
  try {
    const docRef = doc(db, collectionName, bookId);
    await deleteDoc(docRef); 
    return true;
  } catch (error) {
    onError?.(error);
    return false;
  }
};

