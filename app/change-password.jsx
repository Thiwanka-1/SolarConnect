import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { changePassword } from "../lib/appwrite"; // Implement changePassword in appwrite.js

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (newPassword !== retypePassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert("Success", "Password updated successfully!");
      router.back(); // Go back after successful change
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header Section */}
      <View className="flex items-center mb-8 mt-4">
        <Image source={require("../assets/images/logo.png")} className="w-36 h-36" resizeMode="contain" />
      </View>

      {/* Input Fields */}
      <View className="mb-4">
        <Text className="text-lg text-gray-600">Current Password:</Text>
        <View className="flex flex-row items-center">
          <TextInput
            secureTextEntry={!isCurrentPasswordVisible}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            className="border border-gray-300 rounded-md p-3 mt-2 flex-1"
          />
          <Pressable onPress={() => setCurrentPasswordVisible(!isCurrentPasswordVisible)}>
            <Image
              source={isCurrentPasswordVisible ? require("../assets/icons/eye-hide.png") : require("../assets/icons/eye.png")}
              className="w-6 h-6 ml-2"
            />
          </Pressable>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-lg text-gray-600">New Password:</Text>
        <View className="flex flex-row items-center">
          <TextInput
            secureTextEntry={!isNewPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
            className="border border-gray-300 rounded-md p-3 mt-2 flex-1"
          />
          <Pressable onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}>
            <Image
              source={isNewPasswordVisible ? require("../assets/icons/eye-hide.png") : require("../assets/icons/eye.png")}
              className="w-6 h-6 ml-2"
            />
          </Pressable>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-lg text-gray-600">Retype Password:</Text>
        <View className="flex flex-row items-center">
          <TextInput
            secureTextEntry={!isRetypePasswordVisible}
            value={retypePassword}
            onChangeText={setRetypePassword}
            className="border border-gray-300 rounded-md p-3 mt-2 flex-1"
          />
          <Pressable onPress={() => setRetypePasswordVisible(!isRetypePasswordVisible)}>
            <Image
              source={isRetypePasswordVisible ? require("../assets/icons/eye-hide.png") : require("../assets/icons/eye.png")}
              className="w-6 h-6 ml-2"
            />
          </Pressable>
        </View>
      </View>

      {/* Submit Button */}
      <Pressable className="bg-teal-400 p-4 rounded-lg flex items-center justify-center shadow mt-6" onPress={handleSubmit}>
        <Text className="text-white font-bold">Submit</Text>
      </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
