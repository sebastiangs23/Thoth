import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { Icon } from "react-native-elements";
import DatePicker from "../../../../../global/datePicker/datePicker";
import { useSelector } from "react-redux";
import { saveUserSession } from "../../../../common/user/functions";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { globalStyles } from "../../../../global/styles/styles";
import BackButton from "../../../../global/components/BackButton";
import { RFValue } from "react-native-responsive-fontsize";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

// import loginImg from "../../../../assets/images/log_in.png";

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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openB, setOpenB] = useState(false);

  /*_______________________
  |   PASSWORD VISIBLE   */
  const [eyeOpen, setEyeOpen] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

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
          value: country.id,
          icon: () => {
            return (
              <Image source={{ uri: country.flag.png }} style={styles.flag} />
            );
          },
        }));
      }

      setCountries(formattedCountries);
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: ":(",
        textBody: "An unexpected just happened trying to render the countries",
        button: "Ok",
        autoClose: 2000,
      });
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
        selectedCountry == null
      ) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Complete all",
          textBody: "Some fields are missing to fill out",
          button: "Ok",
          autoClose: 2000,
        });
      } else if (password.length < 6 || !/\d/.test(password)) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Invalid Password",
          textBody:
            "Password must be at least 6 characters long and contain at least one number",
          button: "Ok",
          autoClose: 2000,
        });
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !/(@gmail\.com|@hotmail\.com)$/.test(email)
      ) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Invalid Email",
          textBody: "Your email should look like an email",
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
          id_country: selectedCountry,
        };

        const response = await axios.post(`${api}/users/create/`, data);

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

            saveUserSession(response.data.user);
            // navigation.navigate("Plans");
            navigation.navigate("VerifiedEmail");
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
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: ":(",
        textBody: "An unexpected just happened trying to create the user",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  /*________________
  |   FUNCTIONS   */
  function passwordVisible(boolean) {
    setEyeOpen(boolean);
    setSecurePassword(!boolean);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.container}>
          <BackButton module="Login" navigation={navigation} />

          <View style={styles.title_container}>
            <Text style={styles.title}>Sign Up</Text>
            {/* <Image source={loginImg} style={styles.middle_img} /> */}
          </View>

          <View style={styles.container_inputs}>
            <View style={styles.container_input}>
              <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.container_input}>
              <TextInput
                placeholder="Last name"
                style={styles.input}
                onChangeText={(text) => setLastName(text)}
              />
            </View>

            <View style={styles.container_input}>
              <TextInput
                placeholder="Second last name"
                style={styles.input}
                onChangeText={(text) => setSecondLastName(text)}
              />
            </View>

            <View style={styles.container_input}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View>
              <DropDownPicker
                open={openB}
                value={selectedCountry}
                items={countries}
                setOpen={setOpenB}
                setValue={setSelectedCountry}
                setItems={setCountries}
                placeholder="Country"
                dropDownContainerStyle={styles.dropdownContainer}
                itemSeparator={true}
                searchable={true}
                style={styles.dropdown}
                placeholderStyle={{
                  color: "grey",
                }}
                customItemContainer={({ label, icon }) => (
                  <View style={styles.itemContainer}>
                    {icon && icon()}
                    <Text style={styles.label}>{label}</Text>
                  </View>
                )}
              />
            </View>

            {/* <View style={styles.container_date_picker}>
                <DatePicker format={"date"} />
              </View> */}

            <View style={styles.container_input_password}>
              <TextInput
                placeholder="Password"
                style={styles.input_password}
                secureTextEntry={securePassword}
                onChangeText={(text) => setPassword(text)}
              />
              <View style={styles.container_eye}>
                {eyeOpen == false ? (
                  <Icon
                    name="eye-off-outline"
                    type="ionicon"
                    onPress={() => passwordVisible(true)}
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    type="ionicon"
                    onPress={() => passwordVisible(false)}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={styles.create_button_container}>
            <TouchableOpacity style={styles.create_button} onPress={createUser}>
              <Text style={styles.create_button_text}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  middle_img: {
    width: 220,
    height: 220,
  },
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: RFValue(45),
    fontWeight: "bold",
    color: "#18181b",
  },
  container_inputs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container_input: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    width: "75%",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  input: {
    fontSize: RFValue(17),
    borderRadius: 5,
    width: "100%",
    paddingLeft: 10,
  },
  input_password: {
    fontSize: RFValue(17),
    borderRadius: 5,
    width: "85%",
  },
  // container_date_picker: {
  //   width: 290,
  // },
  dropdown: {
    borderColor: "#ccc",
    color: "#FFFFFF",
    width: "75%",
    // marginRight: 25,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 8,
  },
  container_input_password: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 5,
    width: "75%",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    // marginLeft: 75,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: RFValue(5),
    color: "#ccc",
  },
  create_button_container: {
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  create_button: {
    width: "40%",
    height: "30%",
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 5,
  },
  create_button_text: {
    fontSize: RFValue(20),
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
