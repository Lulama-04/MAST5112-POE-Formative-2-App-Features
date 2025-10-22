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

