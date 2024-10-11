import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../constants'; 

const Offers = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', padding: 5 }}>
          <Text style={{fontSize: 32, fontWeight: 'bold', color: '#000',  textAlign: 'center', marginBottom: 150}}>Promotions</Text>

          {/* Background Image */}
          <Image
            source={images.promotions} 
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.5, width: '111%', height: '100%', resizeMode: 'cover' }}          />

          {/* Offer Options */}
          <View style={{width: '100%', alignItems: 'center', marginBottom: 250, padding:20 }}>
            <TouchableOpacity
              style={{ width: '100%',backgroundColor: '#11ABAB', padding: 15,borderRadius: 10, marginVertical: 10,alignItems: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,shadowRadius: 3,elevation: 3,}}
              onPress={() => router.push('/offers/monthly_offers')} 
            >
              <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center',color: '#000',}}>Monthly offers for products</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%',backgroundColor: '#11ABAB', padding: 15,borderRadius: 10, marginVertical: 10,alignItems: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,shadowRadius: 3,elevation: 3,}}
              onPress={() => router.push('/offers/long_term_offers')} 
            >
              <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center',color: '#000',}}>Offers for long term customers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%',backgroundColor: '#11ABAB', padding: 15,borderRadius: 10, marginVertical: 10,alignItems: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,shadowRadius: 3,elevation: 3,}}
              onPress={() => router.push('/offers/seosonal_offers')} 
            >
              <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center',color: '#000',}}>Seasonal Offers</Text>
            </TouchableOpacity>
          </View>

          {/* Status Bar */}
          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Offers;

const styles = {
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#11ABAB', 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Adds shadow for depth
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000', // Black text color for buttons
  },
};
