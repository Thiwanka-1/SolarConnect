import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import {
  getContactsByUser,
  getUserData,
  removeContactById,
} from "../../lib/appwrite";
import LeftArrowIcon from "../../assets/icons/left-arrow.png";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Set a custom header title and back button with the image icon
    navigation.setOptions({
      title: "  Installation and Maintenance ContactList",
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

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userData = await getUserData();
        const userAccountId = userData?.accountId;
        const userContacts = await getContactsByUser(userAccountId);
        setContacts(userContacts);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch contacts.");
      }
    };
    fetchContacts();
  }, []);

  // Helper function to format date from ISO to dd/mm/yyyy
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  // Helper function to check if the date has passed
  const isPastDate = (isoDate) => {
    const today = new Date();
    const contactDate = new Date(isoDate);
    return contactDate < today;
  };

  // Helper function to check if the date is one day or later from today
  const isDateCancellable = (isoDate) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Tomorrow's date
    const contactDate = new Date(isoDate);
    return contactDate > tomorrow;
  };

  // Function to handle contact removal
  const handleRemoveContact = (contactId) => {
    Alert.alert(
      "Remove Contact",
      "Are you sure you want to remove this contact?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await removeContactById(contactId);
              setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact.$id !== contactId)
              );
              Alert.alert("Success", "Contact removed successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to remove contact.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Navigate to Edit Contact page
  const handleEditContact = (contact) => {
    router.push({
      pathname: "/contact", // The route where you want to navigate
      params: { contact: JSON.stringify(contact) }, // Pass the selected contact data as a parameter
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.content}>
            <Text style={styles.title}>Contact List</Text>

            {contacts.map((contact) => (
              <View key={contact.$id} style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.serviceType}>{contact.service_type}</Text>
                  <Pressable onPress={() => handleRemoveContact(contact.$id)}>
                    {contact.status === "Cancel" || isPastDate(contact.date) ? (
                      <Text style={styles.cancelIcon}>✖</Text>
                    ) : contact.status === "Pending" ? (
                      <Pressable onPress={() => handleEditContact(contact)}>
                        <Text style={styles.editIcon}>✏️</Text>
                      </Pressable>
                    ) : null}
                  </Pressable>
                </View>

                <Text style={styles.productType}>{contact.product_type}</Text>
                <Text style={styles.date}>{formatDate(contact.date)}</Text>

                <View style={styles.row}>
                  <Text style={styles.response}>
                    Response:{" "}
                    <Text
                      style={
                        contact.status === "Pending"
                          ? styles.pendingResponse
                          : contact.status === "Success"
                          ? styles.successResponse
                          : styles.cancelledResponse
                      }
                    >
                      {contact.status || "Pending"}
                    </Text>
                  </Text>
                </View>

                {/* Show Cancel button if response is Success and the date is cancellable */}
                {contact.status === "Pending" ||
                (contact.status === "Success" &&
                  isDateCancellable(contact.date)) ? (
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => handleRemoveContact(contact.$id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Floating Button to Add New Contact */}
        <Pressable
          style={styles.floatingButton}
          onPress={() => router.push("/contact")}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentWrapper: {
    flex: 1,
    position: "relative",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-SemiBold", // Ensure you have loaded Poppins
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
    borderColor: "#ddd",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 4,
  },
  cancelIcon: {
    color: "red",
    fontSize: 18,
    padding: 8,
  },
  editIcon: {
    color: "blue",
    fontSize: 18,
    padding: 8,
  },
  productType: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
  },
  response: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  pendingResponse: {
    color: "orange",
    fontWeight: "bold",
  },
  successResponse: {
    color: "green",
    fontWeight: "bold",
  },
  cancelledResponse: {
    color: "red",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00bfa5",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});

export default ContactList;
