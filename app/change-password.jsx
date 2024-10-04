import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { changePassword } from "../lib/appwrite"; // Implement changePassword in appwrite.js

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (newPassword !== retypePassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    
    try {
      // Call Appwrite change password function (you'll need to add it in appwrite.js)
      await changePassword(currentPassword, newPassword);
      Alert.alert("Success", "Password updated successfully!");
      router.back(); // Go back after successful change
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 p-6">
      {/* Header Section */}
      

      {/* Logo */}
      <View className="flex items-center mb-8 mt-4">
        <Image source={require("../assets/images/logo.png")} className="w-36 h-36" resizeMode="contain" />
      </View>

      {/* Input Fields */}
      <View className="mb-4">
        <Text className="text-lg text-gray-600">Current Password:</Text>
        <TextInput
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          className="border border-gray-300 rounded-md p-3 mt-2"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg text-gray-600">New Password:</Text>
        <TextInput
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          className="border border-gray-300 rounded-md p-3 mt-2"
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg text-gray-600">Retype Password:</Text>
        <TextInput
          secureTextEntry
          value={retypePassword}
          onChangeText={setRetypePassword}
          className="border border-gray-300 rounded-md p-3 mt-2"
        />
      </View>

      {/* Submit Button */}
      <Pressable className="bg-teal-400 p-4 rounded-lg flex items-center justify-center shadow mt-6" onPress={handleSubmit}>
        <Text className="text-white font-bold">Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ChangePassword;
