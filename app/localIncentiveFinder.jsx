import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { searchLocation } from '../lib/appwrite'; 

const SearchForm = () => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [town, setTown] = useState('');
  const [details, setDetails] = useState(null);

  const handleSearch = async () => {
    if (!province || !district || !town) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      // Call the Appwrite searchLocation function
      const response = await searchLocation(province, district, town);

      if (response && response.length > 0) {
        setDetails(response[0]); // Assuming the first result is the correct one
      } else {
        setDetails(null);
        Alert.alert('No Results', 'No details found for the selected area.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while searching.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check Your Area</Text>

      {/* Province Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Province:</Text>
        <Picker
          selectedValue={province}
          onValueChange={(value) => setProvince(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Province" value="" />
          <Picker.Item label="North Western" value="North Western" />
          <Picker.Item label="North" value="North" />
          <Picker.Item label="Western" value="Western" />
          <Picker.Item label="Southern" value="Southern" />
          <Picker.Item label="Sabaragamuwa" value="Sabaragamuwa" />
          <Picker.Item label="Eastern" value="Eastern" />
          <Picker.Item label="North Central" value="North Central" />
          <Picker.Item label="Central" value="Central" />
          <Picker.Item label="Uva" value="Uva" />
        </Picker>
      </View>

      {/* District Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>District:</Text>
        <Picker
          selectedValue={district}
          onValueChange={(value) => setDistrict(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select District" value="" />
          <Picker.Item label="Kurunegala" value="Kurunegala" />
          <Picker.Item label="Puttalama" value="Puttalama" />
          <Picker.Item label="Jaffna" value="Jaffna" />
          <Picker.Item label="Mulathiv" value="Mulathiv" />
          <Picker.Item label="Vavniya" value="Vavniya" />
          <Picker.Item label="Mannar" value="Mannar" />
          <Picker.Item label="Kilinochchi" value="Kilinochchi" />
          <Picker.Item label="Colombo" value="Colombo" />
          <Picker.Item label="Gampaha" value="Gampaha" />
          <Picker.Item label="Kaluthara" value="Kaluthara" />
          <Picker.Item label="Galle" value="Galle" />
          <Picker.Item label="Matara" value="Matara" />
          <Picker.Item label="Hambanthota" value="Hambanthota" />
          <Picker.Item label="Kegalle" value="Kegalle" />
          <Picker.Item label="Rathnapura" value="Rathnapura" />
          <Picker.Item label="Batticaloa" value="Batticaloa" />
          <Picker.Item label="Thrincomalee" value="Thrincomalee" />
          <Picker.Item label="Ampara" value="Ampara" />
          <Picker.Item label="Anuradhapura" value="Anuradhapura" />
          <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
          <Picker.Item label="Monaragala" value="Monaragala" />
          <Picker.Item label="Badulla" value="Badulla" />
          <Picker.Item label="NuwaraEliya" value="NuwaraEliya" />
          <Picker.Item label="Kandy" value="Kandy" />
          <Picker.Item label="Matale" value="Matale" />
        </Picker>
      </View>

      {/* Town Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nearest Town:</Text>
        <TextInput
          value={town}
          onChangeText={setTown}
          placeholder="Enter your nearest town"
          style={styles.input}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* Display Results */}
      {details && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Area Details:</Text>
          <Text style={styles.resultText}>Province: <Text style={styles.resultValue}>{details.province || 'N/A'}</Text></Text>
          <Text style={styles.resultText}>District: <Text style={styles.resultValue}>{details.district || 'N/A'}</Text></Text>
          <Text style={styles.resultText}>Town: <Text style={styles.resultValue}>{details.town || 'N/A'}</Text></Text>
          <Text style={styles.resultText}>Suitability: <Text style={styles.resultValue}>{details.suitability || 'N/A'}</Text></Text>
          <Text style={styles.resultText}>Other Details: <Text style={styles.resultValue}>{details.otherDetails || 'N/A'}</Text></Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#11ABAB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultsContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#DBD3D3',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
  resultValue: {
    fontWeight: 'bold',
    color: '#11ABAB',
  },
});

export default SearchForm;
