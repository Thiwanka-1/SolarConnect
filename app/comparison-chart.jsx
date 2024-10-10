import { React, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useNavigation, useRoute } from "@react-navigation/native"; // Hooks for accessing navigation and route params

const ComparisonChart = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const tnavigation = useNavigation();
  useEffect(() => {
    // Set a custom header title
    tnavigation.setOptions({
      title: "Carbon Offset Calculator",
    });
  }, [navigation]);
  // Destructure route params for use in the component
  const { solarProduct, avgCarbonEmissionPerUnit, electricityUnits } =
    route.params || {};

  // Data for BarChart showing CO2 emissions for different energy sources
  const chartData = {
    labels: ["Solar Panels", "Coal", "Natural Gas", "Oil"],
    datasets: [
      {
        data: [
          avgCarbonEmissionPerUnit * electricityUnits, // Calculating emissions for solar panels
          820 * electricityUnits, // Emissions for coal (gCO2/kWh * units)
          490 * electricityUnits, // Emissions for natural gas
          600 * electricityUnits, // Emissions for oil
        ],
      },
    ],
  };

  // Get screen width to make the chart responsive
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header section with title */}
        <View style={styles.header}>
          <Text style={styles.title}>Comparison Chart</Text>
        </View>

        {/* Chart container */}
        <View style={styles.chartContainer}>
          <Text style={styles.subtitle}>
            CO2 Emission by Energy Source (gCO2 per kWh)
          </Text>

          {/* BarChart displaying emission data */}
          <BarChart
            data={chartData}
            width={screenWidth - 20} // Adjust the chart width based on screen size
            height={300} // Chart height
            yAxisSuffix=" " // Suffix for Y-axis values
            chartConfig={chartConfig}
            style={styles.chartStyle}
          />
        </View>

        {/* Buttons section */}
        <View style={styles.buttonContainer}>
          {/* Back button to navigate to the previous screen */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>

          {/* Download button with a placeholder alert */}
          <Pressable
            onPress={() =>
              Alert.alert("Download feature will be available soon!")
            }
            style={styles.downloadButton}
          >
            <Text style={styles.buttonText}>Download</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Chart Configuration
const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0, // No decimal places for values
  color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`, // Bar color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
  style: {
    borderRadius: 16, // Rounded corners for the chart
  },
  barPercentage: 0.8, // Control bar width and spacing
  fillShadowGradient: "#008080", // Bar fill color (teal gradient)
  fillShadowGradientOpacity: 1, // Solid bar color
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Light background color
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 16,
    backgroundColor: "#11ABAB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28, // Larger font for title
    fontFamily: "Poppins-Bold", // Poppins-Bold for title
    color: "#fff",
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 20, // Larger font for subtitle
    fontFamily: "Poppins-SemiBold", // Poppins-SemiBold for subtitle
    textAlign: "center",
    color: "#333",
    marginBottom: 16,
  },
  chartStyle: {
    borderRadius: 16,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#11ABAB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  downloadButton: {
    backgroundColor: "#808080", // Gray color for download button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff", // Default button text color
    fontSize: 16,
    fontFamily: "Poppins-Regular", // Default button font as Poppins-Regular
    textAlign: "center",
  },
});

export default ComparisonChart;
