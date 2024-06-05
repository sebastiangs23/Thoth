import { StyleSheet,View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, {  useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { playAudioNext } from "../../common/functions/functions";
import axios from "axios";
import logo from "../../assets/logos/logo2.png";
import image from "../../assets/logos/login_wallpaper_full.webp";
import { setCountries } from "../../store/slices/countries/slice";


export default function Login({ navigation }) {

  useEffect(() => {
    getCountries();
  }, []);

  /*_______________________________________
  |   REQUEST TO SERVER (GLOBAL STATES)   */
  async function getCountries(){
    const response = await axios.get(
      "http://192.168.43.29:5000/login/get-countries"
    );
    console.log('se ejcuto esta vainaa')
    setCountries(response.data);
  }

  /*________________
  |   FUNCTIONS   */
  function signIn(){
    navigation.navigate("SignIn");
    playAudioNext();
  }

  function signUp(){
    navigation.navigate("SignUp");
    playAudioNext();
  }

  return (
    <View style={styles.main_container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* <Image source={logo} style={styles.logo_image} /> */}

        <View styles={styles.login_form}>
          <View style={styles.title_container}>
            <Text style={styles.title}>Welcome to Thoth /. </Text>
          </View>

          <View style={styles.subtitle_container}>
            <Text style={styles.subtitle}>
              Practice, learn and improve conversations that you will use in
              your daily life with AI.
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
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity
              onPress={() => signUp()}
              color="#F87800"
              style={styles.button}
            >
              <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="auto" />
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
    backgroundColor: "#F87800",
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
