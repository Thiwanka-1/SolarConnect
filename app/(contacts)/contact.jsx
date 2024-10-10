import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createContact, updateContact, getUserData } from "../../lib/appwrite";
import { useRouter } from "expo-router";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";
const Contact = () => {
  const route = useRoute();
  const contactParam = route.params?.contact;
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "  Installation and Maintenance Contact",
      headerLeft: () => (
        <Pressable onPress={() => router.push("/contactlist")}>
          <Image
            source={LeftArrowIcon}
            style={{ width: 32, height: 24, padding: 12 }} // Adjust icon size and position as needed
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  const isEditing = Boolean(contactParam);
  const parsedContact = contactParam ? JSON.parse(contactParam) : null;

  const [serviceType, setServiceType] = useState(
    parsedContact?.service_type || "Maintenance"
  );
  const [productType, setProductType] = useState(
    parsedContact?.product_type || "Monocrystalline solar panels."
  );
  const [contactNo, setContactNo] = useState(parsedContact?.contactNo || "");
  const [location, setLocation] = useState(parsedContact?.location || "");
  const [date, setDate] = useState(
    parsedContact ? new Date(parsedContact.date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [message, setMessage] = useState(parsedContact?.message || "");

  // Validate contact number (must be 10 digits)
  const validateContactNo = (contactNo) => {
    const regex = /^\d{10}$/;
    return regex.test(contactNo);
  };

  // Validate the selected date (must be at least two days in the future)
  const validateDate = (selectedDate) => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    return selectedDate >= minDate;
  };

  // Function to handle form submission (create or update)
  const handleSubmit = async () => {
    try {
      const userData = await getUserData();
      const userAccountId = userData?.accountId;

      // Check if all required fields are filled
      if (
        !serviceType ||
        !productType ||
        !contactNo ||
        !location ||
        !date ||
        !message
      ) {
        Alert.alert("Error", "Please fill out all fields.");
        return;
      }

      // Validate contact number
      if (!validateContactNo(contactNo)) {
        Alert.alert("Error", "Please enter a valid 10-digit contact number.");
        return;
      }

      // Validate date (should be at least two days in the future)
      if (!validateDate(date)) {
        Alert.alert(
          "Error",
          "Please select a date at least two days in the future."
        );
        return;
      }

      // If editing, update the contact, otherwise create a new one
      if (isEditing) {
        await updateContact(parsedContact.$id, {
          service_type: serviceType,
          product_type: productType,
          contactNo,
          location,
          date: date.toISOString(),
          message,
        });
        Alert.alert("Success", "Contact updated successfully.");
        router.push("/contactlist");
      } else {
        await createContact(
          serviceType,
          productType,
          contactNo,
          location,
          date.toISOString(),
          message,
          userAccountId
        );
        router.push("/thankyou");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        `Failed to ${isEditing ? "update" : "submit"} the contact.`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {isEditing ? "Edit Contact" : "Contact Us"}
          </Text>

          {/* Select Service Type */}
          <Text style={styles.label}>Select Service Type:</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.pressableButton}
              onPress={() =>
                setServiceType(
                  serviceType === "Maintenance" ? "Installation" : "Maintenance"
                )
              }
            >
              <Text style={styles.buttonText}>{serviceType}</Text>
            </Pressable>
          </View>

          {/* Select Product Type */}
          <Text style={styles.label}>Select Product Type:</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.pressableButton}
              onPress={() =>
                setProductType(
                  productType === "Monocrystalline solar panels."
                    ? "Polycrystalline solar panels."
                    : productType === "Polycrystalline solar panels."
                    ? "Thin film (amorphous) solar panels."
                    : "Monocrystalline solar panels."
                )
              }
            >
              <Text style={styles.buttonText}>{productType}</Text>
            </Pressable>
          </View>

          {/* Contact No */}
          <Text style={styles.label}>Contact No:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your contact number"
            keyboardType="phone-pad"
            value={contactNo}
            onChangeText={setContactNo}
          />

          {/* Location */}
          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />

          {/* Date */}
          <Text style={styles.label}>Date:</Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={date.toLocaleDateString()}
              editable={false}
            />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          {/* Message */}
          <Text style={styles.label}>Message:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter your message"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />

          {/* Submit Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {isEditing ? "Update Contact" : "Submit"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  pressableButton: {
    backgroundColor: "#48A9E6",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  submitButton: {
    backgroundColor: "#11ABAB",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
});

export default Contact;
