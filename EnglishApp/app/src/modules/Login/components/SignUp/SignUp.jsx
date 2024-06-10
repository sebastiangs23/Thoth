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
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon } from "react-native-elements";
import DatePicker from "../../../../../global/datePicker/datePicker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/slices/user/slice";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
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

  /*____________________________
  |   REQUEST TO THE SERVER   */
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
      // Validate all the fields
      if (
        name == null ||
        email == null ||
        lastName == null ||
        secondLastName == null ||
        password == null ||
        selectedCountryBirth == null ||
        selectedCountryResid == null
      ) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Complete all",
          textBody: "Some fields are missing to fill out",
          button: "Ok",
          autoClose: 2000,
        });
      } else {
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
          "http://192.168.1.10:5000/users/create/",
          data
        );

        switch (response.data.status) {
          case "Successful":
            {
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Perfect",
                textBody: response.data.message,
                button: "Ok",
                autoClose: 2000,
              });
            }

            dispatch(setUser(response.data.user));
            navigation.navigate("LanguageLevel");
            break;

          case "Warning": {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: "Something goes wrong",
              textBody: response.data.message,
              button: "Ok",
              autoClose: 3000,
            });

            break;
          }

          default: {
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: "???",
              textBody: "Something unexpected just happened",
              button: "Ok",
              autoClose: 2000,
            });

            break;
          }
        }

        console.log(response.data);
      }
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
    <View style={styles.sign_up_container}>
      <View style={styles.container_back_button}>
        <Icon
          name="arrow-back-outline"
          reverseColor="#000000"
          type="ionicon"
          color="white"
          size={20}
          reverse
          onPress={logIn}
        />
      </View>

      {/* <Image source={image} style={styles.image} /> */}
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.container_input}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.container_input}>
        <TextInput
          placeholder="LastName"
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      <View style={styles.container_input}>
        <TextInput
          placeholder="Second lastName"
          style={styles.input}
          onChangeText={(text) => setSecondLastName(text)}
        />
      </View>

      <View style={styles.container_input}>
        <TextInput
          placeholder="Example@email.com"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View >
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
      </View>

      <View>
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
      </View>

      <DatePicker format={"date"} />

      <View style={styles.container_input}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.create_button_container}>
        <TouchableOpacity style={styles.create_button} onPress={createUser}>
          <Text style={styles.text}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sign_up_container: {
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
  },
  container_back_button: {
    alignSelf: "flex-start",
    margin: 8,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
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
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    width: "80%",
  },
  dropdown: {
    height: 50,
    width: "65%",
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
  create_button_container: {
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',

  },
  create_button: {
    flexDirection: "row",
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    padding: 5,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
