import { StyleSheet,View, Text, ImageBackground,TouchableOpacity } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCountries } from "../../store/slices/countries/slice";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { playAudioNext } from "../../common/audio/functions";
import { getUserSession, removeUserSession } from "../../common/user/functions";
import { StatusBar } from 'expo-status-bar';
import image from "../../assets/logos/login_wallpaper_full.webp";

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
      const response = await axios.get(
        "https://sgsdeveloper.com/countries/get-countries-db" 
      );

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

    if (response) {
      navigation.navigate("LanguageLevel");
    }
  }

  function signIn() {
    navigation.navigate("SignIn");
    playAudioNext();
  }

  function signUp() {
    navigation.navigate("SignUp");
    playAudioNext();
  }

  return (
    <View style={styles.main_container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View styles={styles.login_form}>
          <View style={styles.title_container}>
            <Text style={styles.title}>Welcome to Thoth /. </Text>
          </View>

          <View style={styles.subtitle_container}>
            <Text style={styles.subtitle}>
              Practice, learn and improve conversations that you will use in
              your daily life with AI.
            </Text>
{/* 
            {
              texto && (
                <Text style={styles.text}> nose: {texto} </Text>
              )
            }  */}
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity
              title="Log in"
              onPress={() => signIn()}
              style={styles.button}
            >
              <Text style={styles.text}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity
              onPress={() => signUp()}
              color="#3790F5"
              style={styles.button}
            >
              <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  login_form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 24,
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
  subtitle_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  logo_image: {
    width: 60,
    height: 50,
  },

  button_container: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 55,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
