import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import image from "../../../../assets/images/sign-up-top-icon.png";
import { Icon } from "react-native-elements";
import DatePicker from "../../../../../global/datePicker/datePicker";
import { useSelector } from "react-redux";

export default function SignUp({ navigation }) {
  const countriesRedux = useSelector((state) => state.countries.value);

  /*___________
  |   FORM   */
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

  useEffect(() => {
    renderCountries();
  }, []);

  async function renderCountries() {
    try {
      let formattedCountries;

      if (countriesRedux.length) {
        formattedCountries = countriesRedux.map((country) => ({
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
      console.log(error);
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
      console.log("arribaaa!");

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
        "http://192.168.1.12:5000/users/create/",
        data
      );

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  /*________________
  |   FUNCTIONS   */
  function logIn() {
    navigation.navigate("Login");
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container_back_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            reverse
            style={styles.back_button}
            onPress={logIn}
          />
        </View>

        <Image source={image} style={styles.image} />
        <Text style={styles.title}>Sign Up</Text>

        <DatePicker />

        <View style={styles.container_input}>
          <TextInput
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.container_input}>
          <TextInput
            placeholder="LastName"
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View style={styles.container_input}>
          <TextInput
            placeholder="Second lastName"
            onChangeText={(text) => setSecondLastName(text)}
          />
        </View>

        <View style={styles.container_input}>
          <TextInput
            placeholder="Example@email.com"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.container_input}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  container_back_button: {
    alignSelf: "flex-start",
    padding: 10,
  },
  back_button: {
    alignSelf: "flex-start",
  },
  image: {
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 40,
  },
  container_input: {
    padding: 5,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
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
