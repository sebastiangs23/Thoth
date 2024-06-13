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

            saveUserSession(response.data.user);
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
      <ImageBackground
        source={imagegb}
        resizeMode="cover"
        style={styles.image_bg}
      >
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
  sign_up_container: {
    flex: 1,
  },
  image_bg: {
    flex: 1,
    justifyContent: "center",
  },
  container_back_button: {
    position: 'absolute', 
    top: 8,               
    left: 8,             
    marginTop: 5,
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
