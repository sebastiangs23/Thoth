import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [countries, setCountries] = useState([]);
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  // Request to the server
  async function getCountries() {
    try {
      const response = await axios.get(
        "http://192.168.1.10:5000/login/get-countries"
      );
      console.log("response.data paisessss");

      setCountries(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function sendUserData() {
    try {
      console.log("Se ejecuto la fn sendUserData");
      console.log(email);
      console.log(password)

      let data = { email: email, password: password };
      
      let response =  await axios.get('http://192.168.1.10:5000/login/login-user', { params: data });

      console.log(response.data);
      console.log('Aca debe estar mi usuario y seguir con todo el flujo: ');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.sign_container}>
      <Text style={styles.title}>Sign In</Text>

      <Text> Email: </Text>
      <TextInput
        placeholder="Example@email.com"
        onChangeText={(text) => setEmail(text)}
      />

      <Text> Password: </Text>
      <TextInput 
        placeholder="password"
        onChangeText={(text) => setPassword(text)} />

      <Button title="Log In" onPress={sendUserData} />

    </View>
  );
}

const styles = StyleSheet.create({
  sign_container: {
    alignItems: "center",
  },

  title: {
    fontSize: 40,
  },
});
