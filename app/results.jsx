import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';  // Use this for expo-router

const Results = () => {
  // Use the hook to get params
  const { netCost, netSavings, paybackPeriod, propertyValueIncrease } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Estimated Savings</Text>

      <View className="border p-4 mb-4">
        <Text className="text-lg font-bold">Pay Cash</Text>
        <Text>Net Cost: ${netCost}</Text>
        <Text>Net Savings (20 Years): ${parseFloat(netSavings).toFixed(2)}</Text>
        <Text>Payback: {paybackPeriod} Years</Text>
        <Text>Increase in Property Value: {propertyValueIncrease}</Text>
      </View>

      <View className="border p-4">
        <Text className="text-lg font-bold">$0-Down Loan</Text>
        <Text>Net Cost: $0</Text>
        <Text>Net Savings (20 Years): ${(parseFloat(netSavings) / 2).toFixed(2)}</Text>
        <Text>Payback: Immediate</Text>
        <Text>Increase in Property Value: {propertyValueIncrease}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Results;
