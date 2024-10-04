import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import  CustomButton  from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged){
    return <Redirect href="/home" />
  };


  return (
    <SafeAreaView className = "bg-white h-full" >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
       <View className="w-full flex justify-center items-center h-full px-4">
          <Text className="text-3xl text-black font-bold text-center">
            Solar Connect
            </Text>
          <Image
            source={images.logo}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
            <Text className="text-3xl text-black font-bold text-center">
            Welcome to Solar Connect
            </Text>

          <Text className="text-sm font-pregular text-gray-500 mt-7 text-center">
          Your Gateway to Sustainable Energy Solutions! Discover our range of high-quality solar panels and energy solutions designed to power your home or business efficiently and sustainably. Explore our products, get personalized recommendations, and make the switch to clean, renewable energy today!
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
          
        </View>

      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />

    </SafeAreaView>
  );
}


