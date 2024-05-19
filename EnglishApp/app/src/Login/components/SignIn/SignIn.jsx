import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SignIn({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function getCountries() {
    try {
      const response = await axios.get(
        "http://192.168.1.9:5000/login/get-countries"
      );
      console.log("response.data paisessss");

      setCountries(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function sendUserData() {
    try {
      let data = { email: email, password: password };
      
      let response =  await axios.get('http://192.168.1.9:5000/login/login-user', { params: data });

      console.log(response.data.user);
      console.log('Aca debe estar mi usuario y seguir con todo el flujo: ');

      switch(response.data.user.id_user_type){
        case 2: {
          navigateToRandomConversation();
          break;
        };
        case 1 : {
          //Aca se logeo el administrador
          break;
        }
        default: {
          console.log('Aqui no se quien chch se logeo')
          break;
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


  function navigateToRandomConversation(){
    navigation.navigate('RandomConversation')
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
