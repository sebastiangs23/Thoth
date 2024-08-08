import {
  ImageBackground,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
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
const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import imagegb from "../../../../assets/logos/login_wallpaper_full.webp";

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

        const response = await axios.post(
          `${api}/users/create/`,
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

            saveUserSession(response.data.user);
            navigation.navigate("Plans");
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
    <View style={globalStyles.container}>
      <ImageBackground
        source={imagegb}
        resizeMode="cover"
        style={styles.image_bg}
      >

        <BackButton module="Login" navigation={navigation} />

        <View style={styles.title_container}>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.form_container}>
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

          <View>
            <DropDownPicker
              open={openB}
              value={selectedCountry}
              items={countries}
              setOpen={setOpenB}
              setValue={setSelectedCountry}
              setItems={setCountries}
              placeholder="Country of birth"
              dropDownContainerStyle={styles.dropdownContainer}
              itemSeparator={true}
              maxHeight={200}
              maxWidth={200}
              style={styles.dropdown}
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              customItemContainer={({ label, icon }) => (
                <View style={styles.itemContainer}>
                  {icon && icon()}
                  <Text style={styles.label}>{label}</Text>
                </View>
              )}
            />
          </View>

          <DatePicker format={"date"} />

          <View style={styles.container_input_password}>
            <TextInput
              placeholder="Password"
              style={styles.input}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image_bg: {
    flex: 1,
    justifyContent: "center",
  },
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: 55,
    fontWeight: "bold",
    color: "#fff",
  },
  form_container: {
    alignItems: "center",
  },

  container_input: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    width: "65%",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    width: "60%",
  },
  container_input_password: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 5,
    width: "65%",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  dropdown: {
    width: "65%",
    color: "#fff",
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
    fontSize: 24,
  },
  create_button_container: {
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  create_button: {
    width: 200,
    height: 55,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  create_button_text: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
