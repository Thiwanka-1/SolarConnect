import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";

const CarbonOffsetCalculator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Carbon Offset Calculator",
    });
  }, [navigation]);

  const [solarProduct, setSolarProduct] = useState(
    "Monocrystalline solar panels."
  );
  const [numPanels, setNumPanels] = useState("");
  const [electricityUnits, setElectricityUnits] = useState("");
  const [avgCarbonEmissionPerUnit, setAvgCarbonEmissionPerUnit] =
    useState(null);
  const [avgCarbonEmission, setAvgCarbonEmission] = useState(null);
  const router = useRouter();

  const carbonEmissionData = {
    "Monocrystalline solar panels.": 72,
    "Polycrystalline solar panels.": 100,
    "Thin film (amorphous) solar panels.": 150,
  };

  const solarProducts = [
    "Monocrystalline solar panels.",
    "Polycrystalline solar panels.",
    "Thin film (amorphous) solar panels.",
  ];

  const clearResults = () => {
    setAvgCarbonEmissionPerUnit(null);
    setAvgCarbonEmission(null);
  };

  const validateInput = () => {
    if (!numPanels || !electricityUnits) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    if (isNaN(numPanels) || isNaN(electricityUnits)) {
      Alert.alert("Error", "Please enter valid numbers.");
      return false;
    }

    if (parseFloat(numPanels) <= 0 || parseFloat(electricityUnits) <= 0) {
      Alert.alert("Error", "Please enter values greater than zero.");
      return false;
    }

    return true;
  };

  const handleCalculate = () => {
    if (!validateInput()) {
      return;
    }

    const avgEmissionPerUnit = carbonEmissionData[solarProduct];
    const totalCarbonEmission =
      avgEmissionPerUnit * parseFloat(electricityUnits) * parseInt(numPanels);

    setAvgCarbonEmissionPerUnit(avgEmissionPerUnit.toFixed(2));
    setAvgCarbonEmission(totalCarbonEmission.toFixed(2));
  };

  const handleComparisonChart = () => {
    router.push({
      pathname: "/comparison-chart",
      params: {
        solarProduct,
        avgCarbonEmissionPerUnit: avgCarbonEmissionPerUnit || "0",
        numPanels: numPanels || "0",
        electricityUnits: electricityUnits || "0",
      },
    });
  };

  const cycleSolarProduct = () => {
    const currentIndex = solarProducts.indexOf(solarProduct);
    const nextIndex = (currentIndex + 1) % solarProducts.length;
    setSolarProduct(solarProducts[nextIndex]);
    clearResults();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.title}>Carbon Offset Calculator</Text>

        <Text style={styles.label}>Select Solar Product:</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.pressableButton} onPress={cycleSolarProduct}>
            <Text style={styles.pressableButtonText}>{solarProduct}</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Number of Solar Panels:</Text>
        <TextInput
          value={numPanels}
          onChangeText={(value) => {
            setNumPanels(value);
            clearResults();
          }}
          placeholder="Enter number of solar panels"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Electricity Units(kWh):</Text>
        <TextInput
          value={electricityUnits}
          onChangeText={(value) => {
            setElectricityUnits(value);
            clearResults();
          }}
          placeholder="Enter electricity units"
          keyboardType="numeric"
          style={styles.input}
        />

        <Pressable onPress={handleCalculate} style={styles.calculateButton}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </Pressable>

        {avgCarbonEmissionPerUnit && avgCarbonEmission && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Results</Text>

            <Text style={styles.resultLabel}>
              Average Carbon Emission per Unit (g CO2):
            </Text>
            <TextInput
              value={avgCarbonEmissionPerUnit}
              editable={false}
              style={styles.resultInput}
            />

            <Text style={styles.resultLabel}>
              Total Carbon Emission (g CO2):
            </Text>
            <TextInput
              value={avgCarbonEmission}
              editable={false}
              style={styles.resultInput}
            />

            <Pressable
              onPress={handleComparisonChart}
              style={styles.comparisonButton}
            >
              <Text style={styles.comparisonButtonText}>Comparison Chart</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#0B3D91",
    textAlign: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  pressableButton: {
    backgroundColor: "#1EC87E",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressableButtonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  calculateButton: {
    backgroundColor: "#11ABAB",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  resultsContainer: {
    paddingTop: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#0B3D91",
    marginBottom: 20,
  },
  resultLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  resultInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  comparisonButton: {
    backgroundColor: "#11ABAB",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  comparisonButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CarbonOffsetCalculator;
