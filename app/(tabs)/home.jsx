import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, Dimensions, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getUserData } from "../../lib/appwrite";  // Import the getUserData function
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const { width } = Dimensions.get("window");

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null); // State to hold user data
  const slideRef = useRef(null);
  const router = useRouter();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch user data.");
    }
  };

  // Use useFocusEffect to reload user data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData(); // Fetch user data on screen focus
    }, [])
  );

  const slides = [
    { id: 1, img: require("../../assets/images/slide1.png") },
    { id: 2, img: require("../../assets/images/slide2.png") },
    { id: 3, img: require("../../assets/images/slide3.png") },
    { id: 4, img: require("../../assets/images/slide4.png") },
  ];

  const onScroll = (event) => {
    const slideIndex = Math.ceil(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header Section */}
        <View className="flex flex-row justify-between items-center p-4">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/images/logo.png")}
              className="w-10 h-10"
              resizeMode="contain"
            />
            <Text className="text-xl font-bold text-green-600 ml-2">SolarConnect</Text>
          </View>
          <View className="flex flex-row items-center">
            <Pressable onPress={() => router.push('/profile')}> 
              <Image
                source={require("../../assets/images/user.png")}
                className="w-12 h-12 rounded-full ml-4"
                resizeMode="cover"
              />
              <Text className="text-lg font-semibold mr-3">
                {user ? user.username : "Loading..."}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Slideshow Section */}
        <View className="h-56">
          <FlatList
            data={slides}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={slideRef}
            onScroll={onScroll}
            renderItem={({ item }) => (
              <Image
                source={item.img}
                className="w-full h-full"
                resizeMode="cover"
                style={{ width: width }} // Full screen slide
              />
            )}
          />
        </View>

        {/* Welcome Section */}
        <View className="p-4 mt-4">
          <Text className="text-2xl font-bold text-center text-green-700">
            Welcome to Solar Connect – Empowering a Greener Future
          </Text>
          <Text className="text-base text-center text-gray-600 mt-2">
            At Solar Connect, we are dedicated to providing innovative solar energy solutions to power your home or business efficiently and sustainably. Our mission is to make renewable energy accessible to everyone, helping you reduce energy costs and minimize your environmental impact.
          </Text>
        </View>

        <View className="mt-4">
            <Image
              source={require("../../assets/images/ab.png")}
              className="w-screen h-40"
              resizeMode="cover"
            />
        </View>

        {/* Why Switch Section */}
        <View className="p-6 bg-white">
          <Text className="text-xl font-bold text-center text-green-600">
            Why switch to solar power
          </Text>
          <Text className="text-base text-center text-gray-600 mt-2">
            Sri Lanka is one of the most expensive energy markets in the world. The use of solar can significantly reduce or eliminate your electricity bill as well as ensure an uninterrupted power supply. The average payback on solar power in Sri Lanka is 5 years. After this payback period, you are earning money on your roof.
          </Text>
        </View>

        <View className="mt-4">
            <Image
              source={require("../../assets/images/sb.png")}
              className="w-screen h-48"
              resizeMode="cover"
            />
        </View>

        {/* Solar Solutions Section */}
        <View className="p-6">
          <Text className="text-xl font-bold text-center text-green-600">
            Solar electricity solutions
          </Text>

          {/* Net Metering */}
          <View className="mt-4">
            <Image
              source={require("../../assets/images/nm.png")}
              className="w-full h-96"
              resizeMode="contain"
            />
          </View>

          {/* Net Accounting */}
          <View className="mt-4">
            <Image
              source={require("../../assets/images/na.png")}
              className="w-full h-96"
              resizeMode="contain"
            />
          </View>

          {/* Net Plus */}
          <View className="mt-4">
            <Image
              source={require("../../assets/images/np.png")}
              className="w-full h-96"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Footer CTA */}
        <View className="p-6 bg-gray-200">
          <Text className="text-center font-bold text-lg text-green-700">
            Get Started Today
          </Text>
          <Text className="text-sm text-center text-gray-600 mt-2">
            Ready to make the switch to solar energy? Explore our products, get personalized recommendations, and start your journey towards energy independence with Solar Connect. Let us help you harness the power of the sun and contribute to a brighter, greener future for all.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
