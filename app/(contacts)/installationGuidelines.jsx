import { React, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";

const InstallationGuidelines = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Set a custom header title
    navigation.setOptions({
      title: "  Installation and Maintenance Guidelines",
      headerLeft: () => (
        <Pressable onPress={() => router.push("/contactHome")}>
          <Image
            source={LeftArrowIcon}
            style={{ width: 30, height: 24, marginLeft: 8, padding: 10 }} // Adjust icon size and position as needed
          />
        </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Page Title */}
        <Text style={styles.title}>
          Installation and Maintenance Guidelines
        </Text>

        {/* Installation Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Installation</Text>
          <Text style={styles.sectionContent}>
            Proper installation of solar panels is essential to ensure optimal
            energy production. Panels should be installed in areas that receive
            maximum sunlight, free from obstructions like trees or buildings.
            Securely mount and angle the panels to efficiently capture sunlight.
            We recommend hiring a professional installer to ensure compliance
            with local codes and safety standards.
          </Text>
        </View>

        {/* Maintenance Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Maintenance</Text>
          <Text style={styles.sectionContent}>
            Solar panels require minimal maintenance. However, regular cleaning
            is necessary to remove dust, debris, and bird droppings that may
            reduce efficiency. Inspect the panels yearly for damages, loose
            wiring, or shading issues. It is advisable to have a professional
            perform maintenance checks every few years to maximize the life and
            performance of your solar system.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Light background for the whole screen
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins-Bold", // Ensure that this font is loaded correctly in your project
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15, // Rounded corners for the card
    padding: 20, // Add padding inside the card
    marginBottom: 20, // Space between cards
    shadowColor: "#000", // Shadow effect for a more elevated look
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 12, // Space between title and content
  },
  sectionContent: {
    fontSize: 16,
    fontFamily: "Poppins-Regular", // A clean font for body text
    color: "#555",
    lineHeight: 24, // Better line height for readability
  },
});

export default InstallationGuidelines;
