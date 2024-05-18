import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

export default function SignUp({}) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [secondLastName, setSecondLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountryBirth, setSelectedCountryBirth] = useState(null);
  const [selectedCountryResid, setSelectedCountryResid] = useState(null);
  const [openB, setOpenB] = useState(false);
  const [openR, setOpenR] = useState(false);

  // Request to the server
  async function getCountries() {
    try {
      const response = await axios.get(
        "http://192.168.1.12:5000/login/get-countries"
      );

      let formattedCountries;

      if (response.data.length) {
        formattedCountries = response.data.map((country) => ({
          label: country.name,
          value: country.iso_code,
          icon: () => {
            return (
              <Image source={{ uri: country.flag.png }} style={styles.flag} />
            );
          },
        }));
      }

      setCountries(formattedCountries);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createUser() {
    try {
      console.log(
        name,
        email,
        lastName,
        secondLastName,
        password,
        selectedCountryBirth,
        selectedCountryResid
      );
      console.log(
        "arribaaa!"
      );

      let data = {
        name: name,
        last_name: lastName,
        second_last_name: secondLastName,
        email: email,
        password: password,
        birth_country: selectedCountryBirth,
        residence_country: selectedCountryResid,
      };

      const response = await axios.post(
        "http://192.168.1.6:5000/users/create/", data
      );

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>

      <Text>Name: </Text>
      <TextInput placeholder="Name" onChangeText={(text) => setName(text)} />

      <Text>Last Name: </Text>
      <TextInput
        placeholder="LastName"
        onChangeText={(text) => setLastName(text)}
      />

      <Text>Second last Name: </Text>
      <TextInput
        placeholder="Second lastName"
        onChangeText={(text) => setSecondLastName(text)}
      />

      <Text>Email:</Text>
      <TextInput
        placeholder="Example@email.com"
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Password:</Text>
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />

      <DropDownPicker
        open={openB}
        value={selectedCountryBirth}
        items={countries}
        setOpen={setOpenB}
        setValue={setSelectedCountryBirth}
        setItems={setCountries}
        placeholder="Country of birth"
        dropDownContainerStyle={styles.dropdownContainer}
        itemSeparator={true}
        style={styles.dropdown}
        customItemContainer={({ label, icon }) => (
          <View style={styles.itemContainer}>
            {icon && icon()}
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
      />

      <DropDownPicker
        open={openR}
        value={selectedCountryResid}
        items={countries}
        setOpen={setOpenR}
        setValue={setSelectedCountryResid}
        setItems={setCountries}
        placeholder="Country of residence"
        dropDownContainerStyle={styles.dropdownContainer}
        itemSeparator={true}
        style={styles.dropdown}
        customItemContainer={({ label, icon }) => (
          <View style={styles.itemContainer}>
            {icon && icon()}
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
      />

      <Button title="Create an Account" onPress={createUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  dropdown: {
    height: 50,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});
