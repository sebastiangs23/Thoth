import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Alert } from "react-native";
import { Link } from "expo-router";

export default function Login({}) {
  return (
    <View style={styles.main_container}>

      {/* BUTTON SIGN IN */}
      <Link href="/components/SignIn/SignIn" style={styles.redirect_sign_in} >
        Go to Sign In
      </Link>

      {/* BUTTON SIGN UP */}
      <Link href="/components/SignUp/SignUp" >
        Go to Sign Up
      </Link>

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
