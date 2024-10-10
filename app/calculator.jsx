import React, { useState } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { saveSolarCalculation } from '../lib/appwrite'; // Import backend logic
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Calculator = () => {
  const [monthlyUsage, setMonthlyUsage] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [sunlightHours, setSunlightHours] = useState('');
  const [costPerKwh, setCostPerKwh] = useState('');
  const [propertyType, setPropertyType] = useState('Residential'); // Default value
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation(); // Use the hook to get the navigation object

  // Function to calculate installation cost based on property type
  const calculateInstallationCost = (type, size) => {
    let baseRate;
    if (type === 'Residential') baseRate = 1000;
    if (type === 'Commercial') baseRate = 1500;
    if (type === 'Non-Profit') baseRate = 800;
    return size * baseRate;
  };

  const handleSubmit = async () => {
    if (!monthlyUsage || !systemSize || !sunlightHours || !costPerKwh) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    setLoading(true);
  
    // Practical Assumptions
    const costPerWatt = 3.00; // Cost per watt (in dollars)
    const systemSizeInWatts = systemSize * 1000; // Convert kW to watts
  
    // Calculating installation cost
    const installationCost = systemSizeInWatts * costPerWatt + calculateInstallationCost(propertyType, systemSize); // Installation cost in dollars
    
    // Calculate annual energy production
    const annualEnergyProduction = systemSize * sunlightHours * 365; // Energy produced in kWh/year
    
    // Calculate annual savings based on the cost per kWh
    let annualSavings = annualEnergyProduction * costPerKwh;
  
    // Ensure annualSavings is a valid number and within the correct range
    if (isNaN(annualSavings) || annualSavings < 0) {
      annualSavings = 0;
    }
  
    // Ensure annualSavings doesn't exceed the upper limit of 1,000,000
    if (annualSavings > 1000000) {
      annualSavings = 1000000;
    }
  
    // Calculate break-even period
    let breakEvenPeriod = installationCost / annualSavings;
  
    // Ensure break-even period is at least 1
    if (breakEvenPeriod < 1) {
      breakEvenPeriod = 1;
    }
  
    try {
      const userId = 'currentUserId'; // Replace with dynamic user ID retrieval logic
  
      const newCalculation = await saveSolarCalculation(
        userId, propertyType, systemSize, monthlyUsage, sunlightHours, costPerKwh, installationCost, annualSavings, breakEvenPeriod
      );
  
      navigation.navigate('results', { newCalculation });
    } catch (error) {
      console.log('Error saving calculation:', error);
      Alert.alert('Error', 'Failed to save calculation.');
    } finally {
      setLoading(false);
    }
  };




  // const handleSubmit = async () => {
  //   if (!monthlyUsage || !systemSize || !sunlightHours || !costPerKwh) {
  //     Alert.alert('Error', 'Please fill in all fields.');
  //     return;
  //   }
  
  //   setLoading(true);
  
  //   // Calculating installation cost using the reusable function
  //   const installationCost = calculateInstallationCost(propertyType, systemSize); // Now using the calculateInstallationCost function
  
  //   // Calculate annual energy production
  //   const annualEnergyProduction = systemSize * sunlightHours * 365; // Energy produced in kWh/year
    
  //   // Calculate annual savings based on the cost per kWh
  //   let annualSavings = annualEnergyProduction * costPerKwh;
  
  //   // Ensure annualSavings is a valid number and within the correct range
  //   if (isNaN(annualSavings) || annualSavings < 0) {
  //     annualSavings = 0;
  //   }
  
  //   // Ensure annualSavings doesn't exceed the upper limit of 1,000,000
  //   if (annualSavings > 1000000) {
  //     annualSavings = 1000000;
  //   }
  
  //   // Calculate break-even period
  //   let breakEvenPeriod = installationCost / annualSavings;
  
  //   // Ensure break-even period is at least 1
  //   if (breakEvenPeriod < 1) {
  //     breakEvenPeriod = 1;
  //   }
  
  //   try {
  //     const userId = 'currentUserId'; // Replace with dynamic user ID retrieval logic
  
  //     const newCalculation = await saveSolarCalculation(
  //       userId, propertyType, systemSize, monthlyUsage, sunlightHours, costPerKwh, installationCost, annualSavings, breakEvenPeriod
  //     );
  
  //     navigation.navigate('results', { newCalculation });
  //   } catch (error) {
  //     console.log('Error saving calculation:', error);
  //     Alert.alert('Error', 'Failed to save calculation.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Loader isLoading={loading} />
      <Text className="text-2xl font-bold text-center mb-6">Solar Savings Calculator</Text>

      <FormField
        title="Average Monthly Electricity Usage (kWh)"
        placeholder="Enter electricity usage"
        value={monthlyUsage}
        handleChangeText={setMonthlyUsage}
      />
      <FormField
        title="Solar System Size (kW)"
        placeholder="Enter system size"
        value={systemSize}
        handleChangeText={setSystemSize}
      />
      <FormField
        title="Sunlight Hours per Day"
        placeholder="Enter sunlight hours"
        value={sunlightHours}
        handleChangeText={setSunlightHours}
      />
      <FormField
        title="Cost per kWh"
        placeholder="Enter your electricity cost per kWh"
        value={costPerKwh}
        handleChangeText={setCostPerKwh}
      />

      {/* Property Type Radio Buttons */}
      <View className="mt-4">
        <Text className="text-base font-semibold text-gray-800">Property Type</Text>
        <View className="flex flex-row justify-between mt-2">
          {['Residential', 'Commercial', 'Non-Profit'].map((type) => (
            <Pressable
              key={type}
              onPress={() => setPropertyType(type)}
              className={`p-4 rounded-lg border text-a w-[32%] ${
                propertyType === type ? 'bg-teal-500 text-white' : 'bg-white text-black border-gray-300'
              }`}
            >
              <Text>{type}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <CustomButton
        title="Calculate"
        handlePress={handleSubmit}
        containerStyles="w-full mt-6"
      />
    </ScrollView>
  );
};

export default Calculator;
