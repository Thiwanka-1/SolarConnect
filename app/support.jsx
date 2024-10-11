import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

const Support = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerStyle={{ height: '100%'}}> 
          <View className="w-full justify-center items-center min-h-[70vh] px-4">
            <View className="relative mt-1">
              <Text className="text-3xl text-#038181 font-bold text-center p-5">Customer Support</Text>
            </View>
            <Image 
              source={images.support}
              className="w-[130px] h-[84px] p-5"
              resizeMode="contain"
            />

            <View className="px-4 p-10">

            <Pressable className="bg-teal-400 border border-gray-200 p-5 rounded-lg mb-4 flex flex-row justify-between items-center shadow" 
                onPress={() => router.push("/feedback")}>
                <View className="flex flex-row items-center">
                <Text className="text-lg">Feedbacks</Text>
                </View>
                <Text className="text-lg">{">"}</Text>
            </Pressable>

            <Pressable className="bg-teal-400 border border-gray-200 p-5 rounded-lg mb-4 flex flex-row justify-between items-center shadow" 
          onPress={() => router.push("/localIncentiveFinder")}>
            <View className="flex flex-row items-center">
              <Text className="text-lg">Local Incentive Finder        </Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>

          <Pressable className="bg-teal-400 border border-gray-200 p-5 rounded-lg mb-4 flex flex-row justify-between items-center shadow" 
          onPress={() => router.push("/help")}>
            <View className="flex flex-row items-center">
              <Text className="text-lg">Help</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>

          <Pressable className="bg-teal-400 border border-gray-200 p-5 rounded-lg mb-4 flex flex-row justify-between items-center shadow" 
          onPress={() => router.push("/offers")}>
            <View className="flex flex-row items-center">
              <Text className="text-lg">Offers</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>

          <Pressable className="bg-teal-400 border border-gray-200 p-5 rounded-lg mb-4 flex flex-row justify-between items-center shadow" 
          onPress={() => router.push("/userFeedbacks")}>
            <View className="flex flex-row items-center">
              <Text className="text-lg">My Feedbacks</Text>
            </View>
            <Text className="text-lg">{">"}</Text>
          </Pressable>
          

            </View>

          </View>
        </ScrollView>

        <StatusBar backgroundColor='#161622' style='light'/>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Support