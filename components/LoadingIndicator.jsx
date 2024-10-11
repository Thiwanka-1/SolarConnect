import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#00bfff" />
      <Text className="mt-4 text-lg text-teal-500">Loading, please wait...</Text>
    </View>
  );
};

export default LoadingIndicator;
