import { useRouter, useNavigation } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

import LeftArrowIcon from "../../assets/icons/left-arrow.png";
const InstallationMaintenanceScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "  Installation and Maintenance",
      headerLeft: () => (
        <Pressable onPress={() => router.push("/settings")}>
          <Image
            source={LeftArrowIcon}
            style={{ width: 32, height: 24, padding: 12 }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Installation and Maintenance</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/installationGuidelines")}
        >
          <Text style={styles.buttonText}>
            Installation And Maintenance Guidelines
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/contactlist")}
        >
          <Text style={styles.buttonText}>Contact Us</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/maintenanceHistory")}
        >
          <Text style={styles.buttonText}>Maintenance History</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#11ABAB",
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    padding: 40,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default InstallationMaintenanceScreen;
