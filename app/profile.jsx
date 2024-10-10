import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getUserData, deleteAccount } from "../lib/appwrite"; // Import deleteAccount
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Profile = () => {
  const router = useRouter(); // Initialize router for navigation
  const [user, setUser] = useState(null); // State to hold user data

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch user data.");
    }
  };

  // Fetch user data when the component mounts and when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleDeleteAccount = async () => {
    try {
      const confirmed = await new Promise((resolve) => {
        Alert.alert(
          "Confirm Deletion",
          "Are you sure you want to delete your account?",
          [
            {
              text: "Cancel",
              onPress: () => resolve(false),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
        );
      });
  
      if (confirmed) {
        await deleteAccount(); // Delete the account
        Alert.alert("Account Deleted", "Your account has been deleted."); // Show alert after deletion
        router.push("/sign-in"); // Redirect to sign-in page
      }
    } catch (error) {
      Alert.alert("Error", error.message); // Show alert if there's an error
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={100} // Adjust this value as needed
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
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

          {/* Buttons for Update Profile, Change Password, and Delete Account */}
          <View className="flex flex-col items-center mt-8 space-y-4">
            <Pressable
              className="bg-teal-400 p-4 rounded-lg flex items-center justify-center w-full shadow"
              onPress={() => router.push("/update-profile")}
            >
              <Text className="text-white font-bold">Update Profile</Text>
            </Pressable>
            <Pressable
              className="bg-teal-400 p-4 rounded-lg flex items-center justify-center w-full shadow"
              onPress={() => router.push("/change-password")} // Navigate to Change Password page
            >
              <Text className="text-white font-bold">Change Password</Text>
            </Pressable>
            <Pressable
              className="bg-red-500 p-4 rounded-lg flex items-center justify-center w-full shadow"
              onPress={handleDeleteAccount}
            >
              <Text className="text-white font-bold">Delete Account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
