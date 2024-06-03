import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image
} from "react-native";
import { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import axios from "axios";
import image from "../../../../assets/images/sign-in-top-icon.png";

export default function SignIn({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  useEffect(() => {}, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function sendUserData() {
    try {
      let data = { email: email, password: password };

      let response = await axios.get(
        "http://192.168.1.10:5000/login/login-user",
        { params: data }
      );

      console.log(response.data.user);
      console.log("Aca debe estar mi usuario y seguir con todo el flujo: ");

      switch (response.data.user.id_user_type) {
        case 2: {
          randomConversation();
          break;
        }
        case 1: {
          //Aca se logeo el administrador
          break;
        }
        default: {
          console.log("Aqui no se quien chch se logeo");
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
  |   FUNCTIONS   */
  function randomConversation() {
    navigation.navigate("RandomConversation");
  }

  function logIn() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.sign_container}>
      <Image source={image} style={styles.image} />

      <View>
        <Icon
          name="arrow-back-outline"
          reverseColor="#000000"
          type="ionicon"
          color="white"
          reverse
          onPress={logIn}
        />
      </View>

      <Text style={styles.title}>Log in</Text>

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
          onChangeText={(text) => setPassword(text)}
        />
        <Icon name="eye-off-outline" type="ionicon" />
        <Icon name="eye-outline" type="ionicon" />
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={sendUserData}>
          <Text style={styles.text}>Log in</Text>
          <Icon name="log-in-outline" type="ionicon" color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert(
              "Here its where the user are gonna be redirect to recovery his password throw email"
            )
          }
        >
          <Text style={styles.text}>Recovery password</Text>
          <Icon name="lock-open-outline" type="ionicon" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sign_container: {
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 240
  },
  title: {
    fontSize: 40,
  },
  container_input: {
    borderWidth: 1,
    borderRadius: 20
  },
  input: {
    borderRadius: 5,
    width: "70%",
    padding: 5,
  },
  recovery_password: {
    backgroundColor: "#fff",
  },
  button: {
    display: "flex",
    width: "70%",
    height: 35,
    backgroundColor: "#F87800",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    padding: 5,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
