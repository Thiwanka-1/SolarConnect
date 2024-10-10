import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import navigation hooks
import { LineChart } from 'react-native-chart-kit';
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

  // Chart Data for Cash Payment
  const cashChartData = {
    labels: ['Year 1', 'Year 5', 'Year 10', 'Year 15'],
    datasets: [
      {
        data: [
          newCalculation.annualSavings * 1,
          newCalculation.annualSavings * 2,
          newCalculation.annualSavings * 3,
          newCalculation.annualSavings * 4,
          newCalculation.annualSavings * 5,
          newCalculation.annualSavings * 10,
          newCalculation.annualSavings * 15,
        ],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Savings in green
        strokeWidth: 2, 
        label: "Cumulative Savings",
      },
      {
        data: [
          newCalculation.installationCost, // Cost in year 1 (initial installation)
          newCalculation.installationCost, // Constant over the years
          newCalculation.installationCost,
          newCalculation.installationCost,
          newCalculation.installationCost,
          newCalculation.installationCost,
          newCalculation.installationCost,
        ],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Cost in red
        strokeWidth: 2,
        label: "Installation Cost",
      },
    ],
  };

  // Chart Data for Loan Payment
  const loanChartData = {
    labels: ['Year 1', 'Year 5', 'Year 10', 'Year 15'],
    datasets: [
      {
        data: [
          monthlyLoanPayment * 12 * 1, // Payments in year 1
          monthlyLoanPayment * 12 * 5, // Payments in year 5
          monthlyLoanPayment * 12 * 10, // Payments in year 10
          totalLoanPayments, // Total Payments in 15 years
        ],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Loan payments in red
        strokeWidth: 2,
        label: "Loan Payments",
      },
      {
        data: [
          newCalculation.annualSavings * 1, // Savings in year 1
          newCalculation.annualSavings * 5, // Savings in year 5
          newCalculation.annualSavings * 10, // Savings in year 10
          newCalculation.annualSavings * 15, // Savings in year 15
        ],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Savings in green
        strokeWidth: 2,
        label: "Annual Savings",
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold text-center mb-6">Solar Calculation Results</Text>

      {/* Cash Payment Section */}
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

        {/* Line Chart for Paying in Cash */}
        <LineChart
          data={cashChartData}
          width={Dimensions.get('window').width - 65} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        {/* Custom Legend Below the Chart */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>● Cumulative Savings</Text>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>● Installation Cost</Text>
        </View>
      </View>

      {/* Loan Payment Section */}
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

        {/* Line Chart for $0 Down Loan with Annual Savings */}
        <LineChart
          data={loanChartData}
          width={Dimensions.get('window').width - 65} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        {/* Custom Legend Below the Chart */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>● Annual Savings</Text>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>● Loan Payments</Text>
        </View>
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
