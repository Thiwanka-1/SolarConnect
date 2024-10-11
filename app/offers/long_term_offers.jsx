// LongTermOffers.jsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

const LongTermOffers = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 50 }}>
            Long-Term Offers
          </Text>

          {/* Image */}
          <Image
            source={images.longTermOffers}  
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"  
          />

          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginBottom: 30 }}>
          1. 5-Year Solar Lease Program: Opt for a 5-year lease on solar panels with low monthly payments of $99, and after the lease period, you can purchase the system at a reduced rate.
          2. 20-Year Warranty with Free Upgrades: Install solar panels with us and receive a 20-year warranty that includes free upgrades to new technology within the warranty period, ensuring you always have the best system.          </Text>


          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LongTermOffers;
