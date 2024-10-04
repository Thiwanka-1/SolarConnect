import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { signOut, getUserData } from "../../lib/appwrite";  // Import getUserData and signOut

const Settings = () => {
  const router = useRouter(); // Initialize router for navigation
  const [user, setUser] = useState(null); // State to hold user data

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        Alert.alert("Error", "Unable to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert("Logged Out", "You have been logged out successfully.");
      router.replace("/sign-in"); // Redirect to login page after logout
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {/* User Info Section */}
        <View className="p-6 flex flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-green-600 mt-2">
              {user ? user.username: "Loading..."}
            </Text>
            <Text className="text-sm text-gray-500">
              {user ? user.email : "Loading..."}
            </Text>
          </View>
          <Pressable onPress={() => router.push("/profile")}>
            <Image
              source={require("../../assets/images/user.png")} // Use require() for profile picture
              className="w-16 h-16 rounded-full"
              resizeMode="cover"
            />
          </Pressable>
        </View>

        {/* Action Buttons */}
        <View className="flex flex-row justify-around px-4 mb-8">
          <Pressable
            className="bg-teal-400 p-4 rounded-lg w-20 h-20 flex items-center justify-center shadow"
            onPress={() => router.push("/profile")}
          >
            <Image source={require("../../assets/icons/profile.png")} className="w-6 h-6" />
            <Text className="text-white mt-2 text-sm">Profile</Text>
          </Pressable>
          <Pressable
            className="bg-teal-400 p-4 rounded-lg w-20 h-20 flex items-center justify-center shadow"
            onPress={() => router.push("/cart")}
          >
            <Image source={require("../../assets/icons/cart.png")} className="w-6 h-6" />
            <Text className="text-white mt-2 text-sm">Cart</Text>
          </Pressable>
          <Pressable
            className="bg-teal-400 p-3 rounded-lg w-20 h-20 flex items-center justify-center shadow"
            onPress={() => router.push("/contact")}
          >
            <Image source={("../../assets/icons/contact.png")} className="w-6 h-6" />
            <Text className="text-white mt-2 text-sm">Contact</Text>
          </Pressable>
        </View>

        {/* Options List */}
        <View className="px-4">
          <Pressable className="bg-white border border-gray-200 p-4 rounded-lg mb-4 flex flex-row justify-between items-center shadow"
                      onPress={() => router.push("/calculator")}
          >
            <View className="flex flex-row items-center">
              <Image source={("../../assets/icons/solar.png")} className="w-6 h-6 mr-3" />
              <Text className="text-lg">Solar Saving Calculator</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>

          <Pressable className="bg-white border border-gray-200 p-4 rounded-lg mb-4 flex flex-row justify-between items-center shadow" onPress={() => router.push("/carbon-calculator")}>
            <View className="flex flex-row items-center">
              <Image source={("../../assets/icons/co2.png")} className="w-6 h-6 mr-3" />
              <Text className="text-lg">Carbon Offset Calculator</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>

          <Pressable className="bg-white border border-gray-200 p-4 rounded-lg mb-4 flex flex-row justify-between items-center shadow" onPress={() => router.push("/local-intensives-finder")}>
            <View className="flex flex-row items-center">
              <Image source={("../../assets/icons/intensives.png")} className="w-6 h-6 mr-3" />
              <Text className="text-lg">Local Intensives Finder</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>

          <Pressable className="bg-white border border-gray-200 p-4 rounded-lg mb-4 flex flex-row justify-between items-center shadow" onPress={() => router.push("/support")}>
            <View className="flex flex-row items-center">
              <Image source={("../../assets/icons/support.png")} className="w-6 h-6 mr-3" />
              <Text className="text-lg">Support</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>
        </View>

        {/* Log Out Button */}
        <View className="px-4">
          <Pressable
            className="bg-teal-400 p-4 rounded-lg flex items-center justify-center shadow"
            onPress={handleLogout}
          >
            <Text className="text-white font-bold">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
