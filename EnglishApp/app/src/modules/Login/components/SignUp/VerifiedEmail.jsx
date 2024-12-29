import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getUserSession } from "../../../../common/user/functions";
import axios from "axios";
const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

const VerifiedEmail = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  });

  async function getUser() {
    try {
      const response = await getUserSession();
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleVerify = async () => {
    try {
      console.log("code:", code);
      console.log("codeVerified:", user?.codeVerified);

      if (code === user?.codeVerified) {
        console.log("entro aqui??");

        const response = await axios.put(`${api}/users/verified-email/${user?.id}`);

        if (response.data.status === "Successfull") {
          console.log("Was successful");
          navigation.navigate("Plans");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación de Correo Electrónico</Text>
      <Text style={styles.instructions}>
        Por favor, ingresa el código de verificación que te enviamos por correo
        electrónico.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => handleVerify()}
        color="#3790F5"
        style={styles.button}
      >
        <Text style={styles.text}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    width: 125,
    height: 45,
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 5,
  },
  text: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default VerifiedEmail;
