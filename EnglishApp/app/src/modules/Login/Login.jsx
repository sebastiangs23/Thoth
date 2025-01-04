import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCountries } from "../../store/slices/countries/slice";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { getUserSession, removeUserSession } from "../../common/user/functions";
import { StatusBar } from "expo-status-bar";
import birdHappyImg from "../../assets/images/landing_bird.png";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    activeSession();
    getCountries();
  }, []);

  /*_______________________________________
  |   REQUEST TO SERVER (GLOBAL STATES)   */
  async function getCountries() {
    try {
      const response = await axios.get(`${api}/countries/get-countries-db`);

      dispatch(setCountries(response.data));
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "Something unexpected just happened in the Login.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  /*________________
  |   FUNCTIONS   */
  async function activeSession() {
    const response = await getUserSession();
    console.log('response', response);
    
    if(!response?.emailVerified){
      navigation.navigate('Login');
    }else if(response){
      navigation.navigate("LanguageLevel");
    }

  }

  function signIn() {
    navigation.navigate("SignIn");
  }

  function signUp() {
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.main_container}>
      <View styles={styles.login_form}>
        <View style={styles.title_container}>
          <Text style={styles.title}>Welcome to Mammoth /. </Text>
          <Image source={birdHappyImg} style={styles.middle_img} />
        </View>

        <View style={styles.subtitle_container}>
          <Text style={styles.subtitle}>
            Perfecciona tu pronunciación y habilidades comunicativas con
            conversaciones que usarás en tu vida diaria y en diferentes
            escenarios a través de nuestro Chat AI.
          </Text>
        </View>

        <View style={styles.button_container}>
          <TouchableOpacity
            title="Log in"
            onPress={() => signIn()}
            style={styles.button}
          >
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signUp()}
            color="#3790F5"
            style={styles.button}
          >
            <Text style={styles.text}>Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  middle_img: {
    height: '50%',
    aspectRatio: 1,
  },
  login_form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 24,
  },
  title_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: RFValue(50),
    fontWeight: "bold",
    color: "#18181b",
  },
  subtitle_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: RFValue(18),
    color: "#71717A",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button_container: {
    display: "flex",
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '40%',
    height: 45,
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 5
  },
  text: {
    fontSize: RFValue(21),
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
