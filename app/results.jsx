import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import navigation hooks
import CustomButton from '../components/CustomButton';

const Results = () => {
  const { params } = useRoute(); // Get route params
  const navigation = useNavigation(); // Get the navigation object
  const { newCalculation } = params;

  // Loan calculation assumptions
  const loanTerm = 15; // 15 years
  const loanInterestRate = 0.05; // 5% annual interest rate

  // Monthly interest rate
  const monthlyInterestRate = loanInterestRate / 12;

  // Number of months
  const loanMonths = loanTerm * 12;

  // Calculate the monthly payment for $0 down loan
  const calculateLoanPayment = (principal) => {
    const M = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanMonths)) / 
              (Math.pow(1 + monthlyInterestRate, loanMonths) - 1);
    return M;
  };

  const monthlyLoanPayment = calculateLoanPayment(newCalculation.installationCost);
  const totalLoanPayments = monthlyLoanPayment * loanMonths; // Total payments over the loan period
  const breakEvenLoan = totalLoanPayments / newCalculation.annualSavings; // Loan break-even period

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold text-center mb-6">Solar Calculation Results</Text>

      <View className="p-4 rounded-lg bg-white shadow-md mb-6">
        <Text className="text-lg font-semibold mb-2">Paying in Cash:</Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Installation Cost:</Text> ${newCalculation.installationCost.toFixed(2)}
        </Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Annual Savings:</Text> ${newCalculation.annualSavings.toFixed(2)}
        </Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Break-even Period:</Text> {newCalculation.breakEvenPeriod.toFixed(2)} years
        </Text>
      </View>

      <View className="p-4 rounded-lg bg-white shadow-md">
        <Text className="text-lg font-semibold mb-2">Getting a $0-Down Loan:</Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Monthly Loan Payment:</Text> ${monthlyLoanPayment.toFixed(2)}
        </Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Total Loan Payments (over {loanTerm} years):</Text> ${totalLoanPayments.toFixed(2)}
        </Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Break-even Period (with loan):</Text> {breakEvenLoan.toFixed(2)} years
        </Text>
        <Text className="text-base mb-2">
          <Text className="font-bold">Annual Savings:</Text> ${newCalculation.annualSavings.toFixed(2)}
        </Text>
      </View>

      <CustomButton
        title="Go Back"
        handlePress={() => navigation.goBack()} // Correct use of goBack
        containerStyles="w-full mt-6"
      />
    </ScrollView>
  );
};

export default Results;
