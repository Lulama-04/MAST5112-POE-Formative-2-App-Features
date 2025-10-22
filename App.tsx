import React, { useState } from "react";
import { 
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
 } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList, CourseMenu } from "./type";

//Add CourseMenu here for predefined items
const predefinedItems: CourseMenu[] = [
  {
    dishName: "Ratatouille",
    description: "A delightful vegetable stew with a medley of fresh flavors",
    category: "Main",
    cuisine: "French",
    price: 120,
    intensity: "Balanced",
    image: "https://i.pinimg.com/1200x/97/47/96/974796baef5c69c74017f93c94549d8c.jpg",
    ingredients: ["Summer vegetables", "Tomato "],
  },
   {
    dishName: "Salmond Avalanche salad",
    description: "Fresh greens topped with grilled salmon and a zesty vinaigrette",
    category: "Starter",
    cuisine: "International",
    price: 85,
    intensity: "Mild",
    image: "https://i.pinimg.com/736x/57/7f/46/577f4627664f14a8291cb69b0846e318.jpg",
    ingredients: ["Salmon", "Lettuce", "Tomato", "Cucumber"],
  },
  {
    dishName: "Tiramisu Slice",
    description: "Classic Italian dessert layered with mascarpone and espresso",
    category: "Dessert",
    cuisine: "Italian",
    price: 69,
    intensity: "Rich",
    image: "https://i.pinimg.com/736x/57/a9/62/57a9629f7405251724a3fb87d59957f1.jpg",
    ingredients: ["Espresso", "Milk", "Cocoa", "Cream"],
  },
  {
    dishName: "Chicken Yakitori",
    description: "Classic Italian dessert layered with mascarpone and espresso",
    category: "Starter",
    cuisine: "Japanese",
    price: 55,
    intensity: "Mild",
    image: "https://i.pinimg.com/736x/d1/75/50/d175506acb74d1bd67aea680e80bfb7f.jpg",
    ingredients: ["Chicken", "Soy Sauce", "Mirin", "Sugar"]
  },
  {
    dishName: "Ribeye steak",
    description: "Juicy grilled ribeye steak cooked to perfection a companied by mashed potatoes",
    category: "Main",
    cuisine: "American",
    price: 250,
    intensity: "Strong",
    image: "https://i.pinimg.com/1200x/97/16/72/971672cdcd5af25b8a4ab33ce477da99.jpg",
    ingredients: ["Beef", "Salt", "Pepper", "Garlic", "Potatoes"],
  },
  {
    dishName: "Creme Brulee",
    description: "Rich custard base topped with a contrasting layer of hard caramel",
    category: "Dessert",
    cuisine: "French",
    price: 69,
    intensity: "Rich",
     image: "https://i.pinimg.com/736x/26/75/d7/2675d71396d515785595ec4f641be2f5.jpg",
    ingredients: ["Cream", "Eggs", "Sugar", "Vanilla"],
  },
];

/**
 * Displays the welcome screen with a hero image, title, and navigation button.
 * @param navigation - Navigation prop for navigating between screens.
 */
function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "WelcomeScreen">) {
  return(
    <SafeAreaView style={styles.welcomeContainer}>
      <Image
        source={{ uri: "https://i.pinimg.com/736x/86/b1/02/86b1020432ad373cbccc8a5aefcf542b.jpg" }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome To Christoffel</Text>
        <Text style={styles.welcomeText}>Find the cuisine for you--on the Go!</Text>
        <TouchableOpacity style={styles.startButton} onPress={()=> navigation.navigate("HomeScreen")}>
          <Text style={styles.startText}>Discover Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: "#3e2723" },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeTitle: { color: "#fff", fontSize: 54, fontWeight: "700", fontFamily: "Inter", textAlign: "center", marginBottom: 10, padding: 10, borderRadius: 15,},
  welcomeText: { color: "#fbe9e7", fontSize: 16, textAlign: "center", marginBottom: 50 , marginTop: 200},
  startButton: { backgroundColor: "#70dc84ff", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30,},
  startText: { color: "#3e2723", fontWeight: "bold", fontSize: 18 },
 
  container: { flex: 1, backgroundColor: "#efebe9", padding: 15 },
  mainTitle: { fontSize: 28, fontWeight: "800", color: "#4b2e2b", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#795548", marginBottom: 15, fontSize: 15 },
 
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 220 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#4b2e2b" },
  cardDesc: { color: "#5d4037", fontSize: 14, marginVertical: 5 },
  cardMeta: { color: "#8d6e63", fontSize: 13 },
  removeButton: {
    backgroundColor: "#562f0357",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  removeText: { color: "#fff", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#4b2e2b",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  addText: { color: "#fff8e1", fontSize: 18, fontWeight: "bold" },
 
  formContainer: { backgroundColor: "#f5f5f5", padding: 20 },
  formHeader: { fontSize: 24, color: "#4b2e2b", fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#8d6e63",
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
    marginVertical: 8,
  },
 
  // ✅ PICKER FIXED STYLES
  pickerWrapper: { marginVertical: 10 },
  label: { fontSize: 15, fontWeight: "600", color: "#4b2e2b", marginBottom: 6, marginLeft: 4 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#8d6e63",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    color: "#4b2e2b",
    fontSize: 15,
    paddingHorizontal: 10,
    marginTop: Platform.OS === "ios" ? -6 : -2,
  },
 
  imagePreview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButton: { backgroundColor: "#4b2e2b", padding: 15, borderRadius: 10, marginTop: 15, alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: { alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: "#5d4037", fontWeight: "bold" },
});



