import { React, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";
const ThankYou = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Set a custom header title
    navigation.setOptions({
      title: "  Thank You!",
      headerLeft: () => (
        <Pressable onPress={() => router.push("/contactlist")}>
          <Image
            source={LeftArrowIcon}
            style={{ width: 30, height: 24, marginLeft: 8, padding: 10 }} // Adjust icon size and position as needed
          />
        </Pressable>
      ),
    });

    // Disable the back navigation by overriding the back handler
    const backAction = () => {
      // Prevent default back button behavior
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Cleanup the back handler when component unmounts
    return () => backHandler.remove();
  }, [navigation]);

  const handleDone = () => {
    // Navigate to the contact list or another page when pressing Done
    router.push("/contactlist"); // Adjust the route as necessary
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Contact Us</Text>

        {/* Icon */}
        <Image
          source={require("../../assets/icons/checkmark.png")} // Update with the path of the green checkmark image
          style={styles.checkmark}
        />

        {/* Thank you message */}
        <Text style={styles.thankYouText}>Thank you for contacting us!</Text>
        <Text style={styles.subText}>
          We have received your request and will get back to you shortly.
        </Text>

        {/* Done Button */}
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold", // Poppins-SemiBold for the title
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  checkmark: {
    width: 100, // Adjust size based on your image
    height: 100,
    marginBottom: 30,
  },
  thankYouText: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold", // Poppins-SemiBold for the thank you text
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular", // Poppins-Regular for the subtext
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  doneButton: {
    backgroundColor: "#11ABAB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold", // Poppins-SemiBold for button text
  },
});

export default ThankYou;
