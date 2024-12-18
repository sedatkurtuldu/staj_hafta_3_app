import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const NotesScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const addNote = () => {
    if (title.trim() === "" || detail.trim() === "") return;
    const newNote = {
      id: Date.now().toString(),
      title,
      detail,
      image,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setTitle("");
    setDetail("");
    setImage(null);
  };

  const deleteNote = (id) => {
    Alert.alert(
      "Silmek İstediğinizden Emin Misiniz?",
      "Bu notu silmek istediğinizden emin misiniz?",
      [
        {
          text: "Hayır",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: () => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Başlık Girin"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detayları Girin"
            value={detail}
            onChangeText={setDetail}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Ionicons name="image-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Resim Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addNote}>
              <Ionicons name="add-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Notu Ekle</Text>
            </TouchableOpacity>
          </View>

          {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.noteItem}>
              <TouchableOpacity
                style={styles.noteContent}
                onPress={() => navigation.navigate("Detail", { note: item })}
              >
                <Text style={styles.noteText}>
                  {index + 1}. {item.title}
                </Text>
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.previewImage} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  item.image && styles.deleteButtonWithImage,
                ]}
                onPress={() => deleteNote(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f4f8" },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  noteContent: {
    flex: 1,
  },
  noteText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    padding: 6,
    marginLeft: 10,
    height: 40,
    width: 40,
  },
  deleteButtonWithImage: {
    padding: 4,
  },
});
