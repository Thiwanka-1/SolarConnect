import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import { getUserData } from "../../lib/appwrite";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";

const MaintenanceHistory = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Set a custom header title
    navigation.setOptions({
      title: "  Installation and Maintenance History",
      headerLeft: () => (
        <Pressable onPress={() => router.push("/contactHome")}>
          <Image
            source={LeftArrowIcon}
            style={{ width: 30, height: 24, marginLeft: 4, padding: 10 }} // Adjust icon size and position as needed
          />
        </Pressable>
      ),
    });
  }, [navigation]);
  // Hardcoded maintenance history data for authorized users
  const historyData = [
    {
      id: "1",
      type: "Maintenance",
      date: "23/09/2023",
      technician: "Mr. Kumara",
      charge: "Rs 50000/=",
    },
  ];

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const userData = await getUserData();
        const userAccountId = userData?.accountId;

        // Check if the user's accountId matches the required ID
        if (userAccountId === "67051f1a002b2e9ff8a9") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve user data.");
      } finally {
        setLoading(false); // Set loading to false when the check is done
      }
    };
    checkAuthorization();
  }, []);

  // Navigate to history detail page
  const handleViewHistory = (historyId) => {
    router.push({
      pathname: "/history",
      params: { historyId },
    });
  };

  if (loading) {
    // Display a loading message while fetching user data
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        {isAuthorized ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.content}>
              <Text style={styles.title}>Maintenance History</Text>

              {historyData.map((history) => (
                <View key={history.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.type}>{history.type}</Text>
                    <Text style={styles.date}>Date: {history.date}</Text>
                    <Text style={styles.technician}>
                      Technician: {history.technician}
                    </Text>
                    <Text style={styles.charge}>Charge: {history.charge}</Text>
                  </View>

                  {/* Arrow for navigating to history page */}
                  <Pressable onPress={() => handleViewHistory(history.id)}>
                    <Text style={styles.arrow}>➡️</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>
            You are not authorized to view this maintenance history.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Light background color for contrast
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "row", // Horizontal layout for text and arrow
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flex: 1, // Take up the remaining space
  },
  type: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 2,
  },
  technician: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 6,
  },
  charge: {
    fontSize: 16,
    color: "red",
    fontFamily: "Poppins-SemiBold",
  },
  arrow: {
    fontSize: 24,
    color: "#333",
    paddingLeft: 10,
    alignSelf: "center",
  },
  noDataText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});

export default MaintenanceHistory;
