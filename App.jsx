import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import NotesScreen from "./src/screens/NotesScreen";
import TaskListScreen from "./src/screens/TaskListScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NotesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NotesList"
      component={NotesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        headerShown: true,
        headerTitle: "Detay",
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Notes") {
              iconName = "list-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "Ana Sayfa" }}
        />
        <Tab.Screen
          name="Notes"
          component={NotesStack}
          options={{ tabBarLabel: "Notlar" }}
        />
        <Tab.Screen
          name="Tasks"
          component={TaskListScreen}
          options={{
            tabBarLabel: "Görev Listesi",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="check-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  clock: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default App;
