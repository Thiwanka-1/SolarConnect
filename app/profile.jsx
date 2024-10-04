import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getUserData } from "../lib/appwrite";  // Import getUserData

const Profile = () => {
  const router = useRouter(); // Initialize router for navigation
  const [user, setUser] = useState(null); // State to hold user data

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        Alert.alert("Error", "Unable to fetch user data.");
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 p-6">
      {/* Header Section */}

      {/* Profile Picture */}
      <View className="flex items-center mb-8">
        <Image
          source={require("../assets/images/user.png")} // Use require() for profile picture
          className="w-36 h-36 rounded-full"
          resizeMode="cover"
        />
      </View>

      {/* User Details Section */}
      <View className="mb-6">
        <Text className="text-lg text-gray-600 mb-2">Name:</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {user ? user.name || "Loading..." : "Loading..."}
        </Text>

        <Text className="text-lg text-gray-600 mb-2">Email:</Text>
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {user ? user.email || "Loading..." : "Loading..."}
        </Text>

        <Text className="text-lg text-gray-600 mb-2">Username:</Text>
        <Text className="text-2xl font-bold text-gray-900">
          {user ? user.username || "Loading..." : "Loading..."}
        </Text>
      </View>

      {/* Buttons for Update Profile and Change Password */}
      <View className="flex flex-row justify-between mt-8">
        <Pressable
          className="bg-teal-400 p-4 rounded-lg flex items-center justify-center w-40 shadow"
          onPress={() => router.push("/update-profile")}
        >
          <Text className="text-white font-bold">Update Profile</Text>
        </Pressable>
        <Pressable
          className="bg-teal-400 p-4 rounded-lg flex items-center justify-center w-40 shadow"
          onPress={() => router.push("/change-password")}
        >
          <Text className="text-white font-bold">Change Password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
