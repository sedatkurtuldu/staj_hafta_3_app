import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const TaskListScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const addTask = () => {
      if (title.trim() === "" || description.trim() === "") return;
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        date,
      };
      setTasks((prevTasks) => [...prevTasks, newTask].sort((a, b) => a.date - b.date));
      setTitle("");
      setDescription("");
      setDate(new Date());
    };
  
    const removeTask = (id) => {
      Alert.alert(
        "Görevi Sil",
        "Bu görevi tamamladınız mı?",
        [
          { text: "Hayır", style: "cancel" },
          {
            text: "Evet",
            onPress: () => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
          },
        ]
      );
    };
  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Görev Başlığı"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Kısa Açıklama"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <Text style={styles.datePickerText}>
                {date.toLocaleDateString("tr-TR")}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Ionicons name="add-outline" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Görev Ekle</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <Text style={styles.taskDescription}>{item.description}</Text>
                  <Text style={styles.taskDate}>
                    Tamamlanma Tarihi: {new Date(item.date).toLocaleDateString("tr-TR")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => removeTask(item.id)}
                >
                  <Ionicons name="checkmark-done-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};
  

export default TaskListScreen;

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
  textArea: { height: 80, textAlignVertical: "top" },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  datePickerText: { color: "#fff", marginLeft: 10 },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", marginLeft: 8 },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  taskDescription: { color: "#666", marginBottom: 8 },
  taskDate: { fontSize: 14, color: "#999" },
  completeButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
