// ProductsHelp.jsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

const ProductsHelp = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          
          {/* Title */}
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 20 }}>
            Products Help
          </Text>

          {/* Image */}
          <Image
            source={images.helpProducts}  
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"  
          />

          {/* Content */}
          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginBottom: 30 }}>
          Understanding Solar Panel Options: We offer a variety of solar panels, including monocrystalline, polycrystalline, and thin-film. Visit our solar products page to learn about each type and find out which is best for your energy needs.
          Installation Process Explained: If you're unsure about how the installation process works, check our step-by-step guide. It covers everything from site assessment to final inspections, ensuring a seamless experience.
          Warranty and Maintenance Information: Our solar products come with a comprehensive warranty. You can find details on warranty coverage and our recommended maintenance schedule to keep your solar system running efficiently.          </Text>


          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProductsHelp;
