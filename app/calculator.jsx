import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const Calculator = () => {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [propertyType, setPropertyType] = useState('Residential'); // Default is Residential
  const [electricityBill, setElectricityBill] = useState('');
  const router = useRouter();

  const handleCalculate = () => {
    if (!address || !postalCode || !electricityBill) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    // Perform Calculation
    let netCost = 0;
    let propertyValueIncrease = '4% or more';
    switch (propertyType) {
      case 'Residential':
        netCost = 9600;
        break;
      case 'Commercial':
        netCost = 12000;
        break;
      case 'Non-Profit':
        netCost = 8500;
        break;
      default:
        break;
    }

    const monthlyBill = parseFloat(electricityBill);
    const netSavings = monthlyBill * 12 * 20 * 0.5; // 50% savings over 20 years
    const paybackPeriod = netCost / (monthlyBill * 12 * 0.5);

    // Navigate to results page with calculated data
    router.push({
      pathname: '/results',
      params: {
        address,
        postalCode,
        propertyType,
        netCost,
        netSavings,
        paybackPeriod: paybackPeriod.toFixed(2),
        propertyValueIncrease,
      },
    });
  };

  // Custom radio button component with teal-500 color
  const RadioButton = ({ label, value }) => (
    <TouchableOpacity
      onPress={() => setPropertyType(value)}
      className="flex-row items-center mb-2"
    >
      <View
        className={`w-4 h-4 rounded-full mr-2 border-2 ${
          propertyType === value ? 'bg-teal-500' : 'bg-white'
        } border-teal-500`}
      />
      <Text>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Solar Saving Calculator</Text>

      <Text>Address:</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
        className="border rounded p-2 mb-4"
      />

      <Text>Postal Code:</Text>
      <TextInput
        value={postalCode}
        onChangeText={setPostalCode}
        placeholder="Enter your postal code"
        className="border rounded p-2 mb-4"
      />

      <Text>Property Type:</Text>
      <View className="mb-4">
        {/* Radio buttons with teal-500 color */}
        <RadioButton label="Residential" value="Residential" />
        <RadioButton label="Commercial" value="Commercial" />
        <RadioButton label="Non-Profit" value="Non-Profit" />
      </View>

      <Text>Monthly Electricity Bill:</Text>
      <TextInput
        value={electricityBill}
        onChangeText={setElectricityBill}
        placeholder="Enter your monthly bill"
        keyboardType="numeric"
        className="border rounded p-2 mb-6"
      />

      {/* Calculate button with teal-500 background */}
      <TouchableOpacity
        onPress={handleCalculate}
        className="bg-teal-500 py-3 rounded-md"
      >
        <Text className="text-white text-center text-lg">Calculate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Calculator;
