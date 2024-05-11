import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Alert, Image, Text } from "react-native";
import logo from '../../../assets/logos/logo2.png';

export default function Login({ navigation }) {
  return (
    <View style={styles.main_container}>
      <Image
        style={styles.logo_image}
        source={logo}
      />
      
      <Text style={styles.title}>Welcome to Thoth</Text>
      <Text styles={styles.subtitle}>
        We are gonna revolutionatethe Language
      </Text>

      <Button
        title="Go to Sign In"
        style={styles.redirect_sign_in}
        onPress={() => navigation.navigate("SignIn")}
      />

      <Button 
        title="Go to Sign up"
        style={styles.button_sign_up}
        onPress={() => navigation.navigate('SignUp')}
      />

      {/* RECOVERY PASSWORD */}
      <Button
        title="Recovery password"
        style={styles.recovery_password}
        onPress={() =>
          Alert.alert(
            "Here its where the user are gonna be redirect to recovery his password throw email"
          )
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 30,
    color: "#38434D",
  },
  logo_image: {
    width: 60,
    height: 50,
  },
  redirect_sign_in: {
    padding: "5px",
    margin: "5px",
  },
  button_sign_up: {
    padding: "5px",
    margin: "5px",
  },
  recovery_password: {
    backgroundColor: "#fff",
  },
});
