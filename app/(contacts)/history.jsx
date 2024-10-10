import { React, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
const MaintenanceDetails = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a custom header title
    navigation.setOptions({
      title: "Installation and Maintenance History",
    });
  }, [navigation]);
  // Hardcoded data for the history page
  const historyDetails = {
    solarDetails: {
      model: "SolarMax Pro 30000",
      installationDate: "20/09/2023",
      capacityKw: "5kw",
      panels: 6,
    },
    maintenanceHistory: {
      date: "23/09/2023",
      maintenanceType: "Routine Checkup",
      description: "Routine maintenance check-up and panel cleaning",
      technician: "Mr. Kumara",
      contact: "077 895 7856",
    },
    serviceNotes: {
      nextMaintenance: "20/05/2025",
      note: "Check inverter performance and clean panels",
    },
    cost: "Rs 50000/=",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Maintenance History</Text>

        {/* Solar System Details Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Solar System Details</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Model: {historyDetails.solarDetails.model}
            </Text>
            <Text style={styles.detailText}>
              Installation Date: {historyDetails.solarDetails.installationDate}
            </Text>
            <Text style={styles.detailText}>
              Capacity: {historyDetails.solarDetails.capacityKw}
            </Text>
            <Text style={styles.detailText}>
              Panels: {historyDetails.solarDetails.panels}
            </Text>
          </View>
        </View>

        {/* Maintenance History Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Maintenance History</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Date: {historyDetails.maintenanceHistory.date}
            </Text>
            <Text style={styles.detailText}>
              Maintenance Type:{" "}
              {historyDetails.maintenanceHistory.maintenanceType}
            </Text>
            <Text style={styles.detailText}>
              Work Description: {historyDetails.maintenanceHistory.description}
            </Text>
            <Text style={styles.detailText}>
              Technician: {historyDetails.maintenanceHistory.technician}
            </Text>
            <Text style={styles.detailText}>
              Contact: {historyDetails.maintenanceHistory.contact}
            </Text>
          </View>
        </View>

        {/* Service Notes Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Service Notes</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Next Scheduled Maintenance:{" "}
              {historyDetails.serviceNotes.nextMaintenance}
            </Text>
            <Text style={styles.detailText}>
              Note: {historyDetails.serviceNotes.note}
            </Text>
          </View>
        </View>

        {/* Cost Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cost</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.costText}>{historyDetails.cost}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Light background color
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 10,
  },
  detailsContainer: {
    paddingLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Poppins-Regular",
    marginBottom: 6,
  },
  costText: {
    fontSize: 18,
    color: "red",
    fontFamily: "Poppins-SemiBold",
  },
});

export default MaintenanceDetails;
