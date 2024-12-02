import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { Icon } from "react-native-elements";
import { saveUserSession } from "../../../../common/user/functions";
import { playAudioNext } from "../../../../common/audio/functions";
import BackButton from "../../../../global/components/BackButton";
import { globalStyles } from "../../../../global/styles/styles";
import loginImg from "../../../../assets/images/log_in.png";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

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

      let response = await axios.get(`${api}/login/login-user`, {
        params: data,
      });

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
            Plans();
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
      console.log(error);
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
  function Plans() {
    navigation.navigate("Plans");
  }

  function passwordVisible(boolean) {
    setEyeOpen(boolean);
    setSecurePassword(!boolean);
  }

  return (
    <View style={globalStyles.container}>
      <BackButton module="Login" navigation={navigation} />

      <View style={styles.title_container}>
        <Text style={styles.title}>Log in</Text>
        <Image source={loginImg} style={styles.middle_img} />
      </View>

      <View style={styles.form_container}>
        <View style={styles.container_input}>
          <Icon  name="person-outline" type="ionicon" color="#bebebe" />
          <TextInput
            placeholder="Example@email.com"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.container_input}>
          <Icon name="lock-closed-outline" type="ionicon" color="#bebebe"></Icon>
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
    </View>
  );
}

const styles = StyleSheet.create({
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: 40,
    fontWeight: "bold",
    color: "#18181b",
  },
  middle_img: {
    width: 220,
    height: 220,
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
    borderColor: "#ccc",
    borderWidth: 1,
  },
  input: {
    borderRadius: 5,
    width: "80%",
  },
  button_container: {
    marginTop: 45,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: 125,
    height: 45,
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
