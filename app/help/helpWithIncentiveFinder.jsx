// IncentiveFinderHelp.jsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

const IncentiveFinderHelp = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          
          {/* Title */}
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 20 }}>
            Incentive Finder Help
          </Text>

          {/* Image */}
          <Image
            source={images.helpIncentive}  
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"  
          />

          {/* Content */}
          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginBottom: 30 }}>
          How to Find Suitable Locations: Use our online location finder tool to determine the suitability of your area for solar panel installation. Input your province, district, and town, and receive information on local solar incentives and sunlight availability.
          Check for Local Regulations: Before installation, it's important to be aware of any local regulations or permits required for solar panel installations in your area. Visit our regulations page for detailed information specific to your location.
          Contacting Our Local Installers: If you're looking for a reliable installer in your area, check our list of certified local installers. You can contact them directly for quotes and consultations regarding solar panel installations. </Text>
          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default IncentiveFinderHelp;
