import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { useEffect } from "react";
import axios from "axios";

export default function SignIn() {
  // Montador
  useEffect(() => {
    console.log("HOLAAAAAA");
    getUser();
  }, []);

  // Request to the server
  async function getUser() {
    try {
      await axios.get("http://localhost:5000/users");
      console.log("se ejecuto mi fn() getUsers");
    } catch (error) {
      console.log("Error en la fn getUser() ", error);
    }
  }

  return (
    <View style={styles.sign_container}>
      <Text style={styles.title}>Sign In</Text>

      <Text> User name: </Text>
      <TextInput placeholder="Example@email.com" />

      <Text> Password: </Text>
      <TextInput placeholder="password" />

      <Button title="Log In" />
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
