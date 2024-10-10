import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getUserData, updateUserProfile } from "../lib/appwrite"; // Ensure updateUserProfile is updated

const UpdateProfile = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
        setName(userData.name);
        setUsername(userData.username);
      } catch (error) {
        Alert.alert("Error", "Unable to fetch user data.");
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUserProfile(name, null, username); // Excluding email update for now
      Alert.alert("Success", "Profile updated successfully!");
      router.back(); // Navigate back after successful update
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Profile Logo */}
        <View className="flex items-center mb-8 mt-4">
          <Image source={require("../assets/images/logo.png")} className="w-36 h-36" resizeMode="contain" />
        </View>

        {/* Input Fields */}
        <View className="mb-4">
          <Text className="text-lg text-gray-600">Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-md p-3 mt-2"
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg text-gray-600">Username:</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="border border-gray-300 rounded-md p-3 mt-2"
          />
        </View>

        {/* Update Button */}
        <Pressable className="bg-teal-400 p-4 rounded-lg flex items-center justify-center shadow mt-6" onPress={handleUpdate}>
          <Text className="text-white font-bold">Update</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
