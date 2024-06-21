import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";
import { Icon } from "react-native-elements";
import { saveUserSession } from "../../../../common/user/functions";
import { playAudioNext } from "../../../../common/audio/functions";

import imagebg from "../../../../assets/logos/login_wallpaper_full.webp";

export default function SignIn({ navigation }) {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function sendUserData() {
    try {

      if (!email || !password) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Warning",
          textBody: "The email or password cannot be empty.",
          button: "close",
        });
        return;
      }

      let data = { email: email, password: password };

      let response = await axios.get(
        "https://sgsdeveloper.com/login/login-user",
        { params: data }
      );

      switch (response.data.status) {
        case "Successful": {
          saveUserSession(response.data.user);

          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: response.data.message,
            textBody: "Its good to see you again",
            autoClose: 2000,
          });

          if (response.data.user.id_user_type == 2) {
            playAudioNext();
            LanguageLevel();
            break;

          } else if (response.data.user.id_user_type == 1) {
            //DASHBOARD ADMIN
          } else {
            //COMPONENTE DE RUTA NO ESPECIFICADA
          }

          break;
        }
        case "Unauthorized": {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: response.data.message,
            textBody: "You don´t have authorization to be here",
            button: "close",
          });
          break;
        }

        case "WrongPassword": {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Password incorrect",
            textBody: response.data.message,
            button: "close",
          });
          break;
        }
        default: {
          break;
        }
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: ":(",
        textBody: "Something issues trying to send the form.",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  /*________________
  |   FUNCTIONS   */
  function LanguageLevel() {
    navigation.navigate("LanguageLevel");
  }

  function logIn() {
    navigation.navigate("Login");
  }

  function passwordVisible(boolean) {
    setEyeOpen(boolean);
    setSecurePassword(!boolean);
  }

  return (
    <View style={styles.sign_in_container}>
      <ImageBackground
        source={imagebg}
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
          <Text style={styles.title}>Log in</Text>
        </View>

        <View style={styles.form_container}>
          <View style={styles.container_input}>
            <Icon name="person-outline" type="ionicon" />
            <TextInput
              placeholder="Example@email.com"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.container_input}>
            <Icon name="lock-closed-outline" type="ionicon"></Icon>
            <TextInput
              placeholder="password"
              style={styles.input}
              secureTextEntry={securePassword}
              onChangeText={(text) => setPassword(text)}
            />
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

        <View style={styles.button_container}>
          <TouchableOpacity style={styles.button} onPress={sendUserData}>
            <Text style={styles.text}>Log in</Text>
            <Icon name="log-in-outline" type="ionicon" color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  sign_in_container: {
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
    width: "75%",
    borderRadius: 8,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    width: "80%",
  },
  button_container: {
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: 200,
    height: 55,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
