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

// This manages the "Add Menu Item" screen of the app.
// Allows the user to input details for a new café item and add it to the main list.

function ManageMenuScreen(props: NativeStackScreenProps<RootStackParamList, 'ManageScreen'>) {
  const [itemName, setItemName] = useState(''); // stores the name of the item
  const [description, setDescription] = useState(''); // stores the description of item
  const [category, setCategory] = useState<string>('beverage'); // stores the selected category (default is beverage)
  const [price, setPrice] = useState(''); // stores the price set by the user
  const [image, setImage] = useState(''); // stores the image the user added
  const [ingredients, setIngredients] = useState(''); // stores the ingredients added by user

  // Function to validate input, create a new item, and add it to the menu list
  const handleSubmit = () => {
    // Check that all required fields contain values before continuing
    if (itemName && description && category && price) {
      // Convert price from string to floating-point number
      const priceValue = parseFloat(price);

      // Ensure that the price is a positive number
      if (priceValue > 0) {
        // Determine the intensity level based on the price range
        // Lower prices = Mild, mid-range = Balanced, higher = Strong
        const intensity =
          priceValue < 45
            ? 'Mild'
            : priceValue < 65
            ? 'Balanced'
            : 'Strong';

        // Create a new menu item using the entered data
        const newItem: CafeItem = {
          itemName,
          description,
          category,
          price: priceValue,
          intensity,
          image,
          // Convert ingredients from a comma-separated string into an array of trimmed strings
          ingredients: ingredients.split(',').map(i => i.trim()),
        };

        // Update the main menu list by adding the new item
        // Use the setItems function passed from HomeScreen via navigation parameters
        props.route.params.setItem([...props.route.params.item, newItem]);

        // Return the user to the previous screen after successfully adding the item
        props.navigation.goBack();
      } else {
        // Display an alert if the price entered is not valid
        Alert.alert('Invalid Price', 'Price must be greater than 0');
      }
    } else {
      // Display an alert if any required field is left empty
      Alert.alert(
        'Missing Field',
        'Please fill in all the details before saving.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a New Café Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Category Picker */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={value => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#198f0aff"
                style={styles.pickerStyle}
                itemStyle={{ height: 50 }}
              >
                <Picker.Item
                  label="Select a Category"
                  value=""
                  color="#b50404ff"
                />
                <Picker.Item label="Beverage" value="Beverage" />
                <Picker.Item label="Pastry" value="Pastry" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 49)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : null}

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

function HomeScreen(props:NativeStackScreenProps<RootStackParamList, "HomeScreen">) {
  const [items, setItems] = useState<CafeItem[]>(predefinedItems);

  const removeItem = (index:number) => {
    Alert.alert("Remove Item","Are you sure you want to remove this item?",[
      {text: "Cancel", style: "cancel"},
      {text: "Yes", onPress: () => setItems(items.filter((_, i) => i ! == index))},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Barista Bliss</Text>
      <Text style={styles.subtitle}>Warm Coffee || Cozy Pasteries || Sweet Moments</Text>

      <FlatList
        data={items}
        keyExtractor={(_, i)=> i.toString()}
        renderItem={({ item, index}) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image || "" }} style={styles.cardImage}/>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.itemName}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.cardMeta}>{item.category} || R{item.price} || {item.intensity}</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
                  <Text style={styles.removeText}>Remove Item</Text>
                </TouchableOpacity>

            </View>
          </View>
        )}
      />
    
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate("ManageScreen", { item: items, setItem: setItems })}
      >
        <Text style={styles.addText}>Add Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "WelcomeScreen">) {
  return(
    <SafeAreaView style={styles.welcomeContainer}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg" }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome To Barista Bliss</Text>
        <Text style={styles.welcomeText}>Your cozy cafe experience -- right on your screen.</Text>
        <TouchableOpacity style={styles.startButton} onPress={()=> navigation.navigate("HomeScreen")}>
          <Text style={styles.startText}>Explore Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }} 
        />
       <Stack.Screen
       name="HomeScreen"
       component={HomeScreen}
       options={{ title: 'Home' }} 
       />
       <Stack.Screen
         name="ManageScreen"
         component={ManageMenuScreen}
         options={{
         title: "Add Menu Item",
         headerStyle: { backgroundColor: "#4b2e2b" },
         headerTintColor: "#fff"
         }}
        />
     </Stack.Navigator>
    </NavigationContainer>
  )
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
  welcomeTitle: { color: "#fff", fontSize: 34, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  welcomeText: { color: "#fbe9e7", fontSize: 16, textAlign: "center", marginBottom: 30 },
  startButton: { backgroundColor: "#d7ccc8", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
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

