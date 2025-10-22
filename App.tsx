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
        <Text style={styles.welcomeText}>Find the cuisine for you...on the Go!</Text>
        <TouchableOpacity style={styles.startButton} onPress={()=> navigation.navigate("HomeScreen")}>
          <Text style={styles.startText}>Discover Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen(props:NativeStackScreenProps<RootStackParamList, "HomeScreen">) {
  const [items, setItems] = useState<CourseMenu[]>(predefinedItems);
  const [orderedItems, setOrderedItems] = useState<CourseMenu[]>([]);

  const orderedItem = (index:number) => {
    Alert.alert("Add To Cart","Want to add the item to your order?",[
      {text: "Cancel", style: "cancel"},
      {text: "Yes", onPress: () => {
        setOrderedItems([...orderedItems, items[index]]);
        setItems(items.filter((_, i) => i !== index));
        Alert.alert("Success", `{items[index].dishName} added to your order!`);
      }},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Christoffel</Text>
          <Text style={styles.headerSubtitle}>Multi- Cuisine | Delivered At Your Door Step | Choose At Your Finger Tips | Unfiltered Dishes: 6</Text>
        </View>
         <Image source={{ uri: "https://i.pinimg.com/736x/a5/02/ab/a502ab8bc852dece2fd8353f5097d880.jpg" }} style={styles.logoSmall} />
        </View>
      <FlatList
        data={items}
        keyExtractor={(_, i)=> i.toString()}
        numColumns={2} // Display items in 2 columns
        columnWrapperStyle={styles.row} // Style for the row wrapper
        renderItem={({ item, index}) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image || "" }} style={styles.cardImage}/>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.dishName}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.cardMeta}>{item.category} | {item.cuisine} | {item.intensity} | R{item.price} </Text>
                <TouchableOpacity style={styles.orderButton} onPress={() => orderedItem(index)}>
                  <Text style={styles.orderText}>Order</Text>
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

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => props.navigation.navigate("RemoveScreen", { item: items, setItem: setItems })}
      >
        <Text style={styles.removeText}>Remove Items</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
// This manages the "Add Menu Item" screen of the app.
// Allows the user to input details for a new café item and add it to the main list.

function ManageMenuScreen(props: NativeStackScreenProps<RootStackParamList, 'ManageScreen'>) {
  const [dishName, setDishName] = useState(''); // stores the name of the item
  const [description, setDescription] = useState(''); // stores the description of item
  const [category, setCategory] = useState<string>('beverage'); // stores the selected category (default is beverage)
  const [cuisine, setCuisine] = useState(''); // stores the cuisine type
  const [price, setPrice] = useState(''); // stores the price set by the user
  const [image, setImage] = useState(''); // stores the image the user added
  const [ingredients, setIngredients] = useState(''); // stores the ingredients added by user

  // Function to validate input, create a new item, and add it to the menu list
  const handleSubmit = () => {
    // Check that all required fields contain values before continuing
    if (dishName && description && category && price) {
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
            : 'Rich';

        // Create a new menu item using the entered data
        const newDish: CourseMenu = {
          dishName,
          description,
          category,
          cuisine,
          price: priceValue,
          intensity,
          image,
          // Convert ingredients from a comma-separated string into an array of trimmed strings
          ingredients: ingredients.split(',').map(i => i.trim()),
        };

        // Update the main menu list by adding the new item
        // Use the setItems function passed from HomeScreen via navigation parameters
        props.route.params.setItem([...props.route.params.item, newDish]);

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
          <Text style={styles.formHeader}>Add a New Dish Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Dish Name"
            value={dishName}
            onChangeText={setDishName}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Cuisine Type"
            value={cuisine}
            onChangeText={setCuisine}
          />

          {/* Category Picker */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={value => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#080808ff"
                style={styles.pickerStyle}
                itemStyle={{ height: 50 }}
              >
                <Picker.Item
                  label="Select a Category"
                  value=""
                  color="#216331ff"
                />
                <Picker.Item label="Starters" value="Starters" />
                <Picker.Item label="Main" value="Main" />
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

function RemoveMenuScreen(props: NativeStackScreenProps<RootStackParamList, 'RemoveScreen'>) {
   const [items, setItems] = useState<CourseMenu[]>(predefinedItems);

   const removeItem = (index: number) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setItems(items.filter((_, i) => i !== index)) },
    ]);
  };

  return (<SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Christoffel</Text>
          <Text style={styles.headerSubtitle}>Multi- Cuisine | Delivered At Your Door Step | Choose At Your Finger Tips</Text>
        </View>
         <Image source={{ uri: "https://i.pinimg.com/736x/a5/02/ab/a502ab8bc852dece2fd8353f5097d880.jpg" }} style={styles.logoSmall} />
        </View>
      <FlatList
        data={items}
        keyExtractor={(_, i)=> i.toString()}
        numColumns={2} // Display items in 2 columns
        columnWrapperStyle={styles.row} // Style for the row wrapper
        renderItem={({ item, index}) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image || "" }} style={styles.cardImage}/>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.dishName}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.cardMeta}>{item.category} | {item.cuisine} | {item.intensity} | R{item.price} </Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
                  <Text style={styles.orderText}>Remove</Text>
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
       options={{ title: 'Home', headerStyle: { backgroundColor: '#000000ff' }, headerTintColor: '#fff' }} 
       />
       <Stack.Screen
         name="ManageScreen"
         component={ManageMenuScreen}
         options={{
         title: "Add Menu Item",
         headerStyle: { backgroundColor: "#040404ff" },
         headerTintColor: "#fff"
         }}
        />
        <Stack.Screen
          name="RemoveScreen"
          component={RemoveMenuScreen}
          options={{
          title: "Remove Menu Items",
          headerStyle: { backgroundColor: "#060606ff" },
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
  welcomeTitle: { color: "#fff", fontSize: 54, fontWeight: "700", fontFamily: "Inter", textAlign: "center", marginBottom: 10, padding: 10, borderRadius: 15,},
  welcomeText: { color: "#fbe9e7", fontSize: 16, textAlign: "center", marginBottom: 50 , marginTop: 200},
  startButton: { backgroundColor: "#70dc84ff", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30,},
  startText: { color: "#3e2723", fontWeight: "bold", fontSize: 18 },
 //Header Row and Home Screen styles
  container: { flex: 1, backgroundColor: "#040404ff", padding: 15 },
  logo: { width: 100, height: 100, borderRadius: 200, marginBottom: 30, alignSelf: "center" },
  headerRow: {flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginBottom: 12, },
  headerText: {flex: 1,paddingRight: 12,},
  headerTitle: {fontSize: 28, fontWeight: "800", fontFamily:"Inter", color: "#fff", textAlign: "left",},
  headerSubtitle: {fontSize: 15, color: "#636262ff", textAlign: "left",marginBottom: 15, },
  logoSmall: {width: 72,height: 72,borderRadius: 36,},
 // Card styles
  row:{flex: 1, justifyContent: "space-between", marginBottom: 10,},
  card: {
    backgroundColor: "#141313ff",
    width: "48%",
    borderRadius: 18,
    marginVertical: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 220 },
  cardContent: { padding: 10 },
  cardTitle: { fontSize: 16, fontFamily: "Inter", fontWeight: "700", color: "#f4f4f4ff" },
  cardDesc: { color: "#ebe9e9ff", fontSize: 12, marginVertical: 5 },
  cardMeta: { color: "#cacdcb57", fontSize: 11 },
  orderButton: {
    backgroundColor: "#48393557",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  orderText: { color: "#fff", fontWeight: "bold" },
  addButton: {
    flex: 0,
    backgroundColor: "#35483957",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom:10,
    elevation: 4,
  },
  addText: { color: "#fff8e1", fontSize: 18, fontWeight: "bold",},
  removeButton: { 
    flex: 0,
    backgroundColor: "#492323ff", 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: "center", 
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  removeText: { color: "#fff8e1", fontSize: 18,  fontWeight: "bold" },
 
  formContainer: { backgroundColor: "#050505ff", padding: 20, flex: 1 },
  formHeader: { fontSize: 28, color: "#cacccaff", fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  input: {
    backgroundColor: "#464646ff",
    color: "#bdbab9ff",
    borderRadius: 12,
    borderColor: "#070707ff",
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 50,
    justifyContent: "center",
    marginVertical: 8,
  },
 
  // ✅ PICKER FIXED STYLES
  pickerWrapper: { marginVertical: 10 },
  label: { fontSize: 15, fontWeight: "600", color: "#e9e6e6ff", marginBottom: 6, marginLeft: 4 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#0b0b0bff",
    borderRadius: 10,
    backgroundColor: "#464646ff",
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    color: "#bdbab9ff",
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
  saveButton: { backgroundColor: "#2e622eff", padding: 15, borderRadius: 10, marginTop: 15, alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: { alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: "#5d0303ff", fontWeight: "bold" },
});



