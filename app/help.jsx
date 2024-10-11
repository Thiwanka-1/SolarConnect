import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../constants'; 

const Help = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full p-5">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 150, textAlign: 'center', color: '#000' }}>Help</Text>

          {/* Background Image */}
          <Image
            source={images.help} 
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.5, width: '111%', height: '100%', resizeMode: 'cover' }}
          />

          {/* Help Options */}
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 250 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: '#11ABAB',
                padding: 15,
                borderRadius: 10,
                marginVertical: 10,
                alignItems: 'center',
              }}
              onPress={() => router.push('/help/helpWithIncentiveFinder')} 
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Help with incentive finder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: '#11ABAB',
                padding: 15,
                borderRadius: 10,
                marginVertical: 10,
                alignItems: 'center',
              }}
              onPress={() => router.push('/help/helpWithCustomerFeedback')} 
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Help with customer feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: '#11ABAB',
                padding: 15,
                borderRadius: 10,
                marginVertical: 10,
                alignItems: 'center',
              }}
              onPress={() => router.push('/help/helpWithProducts')} 
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Help with products</Text>
            </TouchableOpacity>
          </View>

          {/* Status Bar */}
          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Help;
