import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getUserSession, removeUserSession, saveUserSession } from "../../../../common/user/functions";
import axios from "axios";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

const VerifiedEmail = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [user, setUser] = useState(null);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            setTimer(30);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

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
      if (code === user?.codeVerified) {
        const response = await axios.put(`${api}/users/verified-email/${user?.id}`);
        if (response.data.status === "Successfull") {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: response.data.message,
            button: "Cerrar",
          });
          navigation.navigate("Plans");
        }
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Código incorrecto",
          textBody: "Por favor, ingresa el código correcto",
          button: "Cerrar",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsResendDisabled(true);
      
      const response = await axios.post(`${api}/users/resend-verification-code/${user?.id}`);
      console.log(response.data);
      
      removeUserSession();
      setUser(response.data.user);
      saveUserSession(response.data.user);

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Código reenviado",
        textBody: "Se ha enviado un nuevo código a tu correo.",
        button: "Cerrar",
      });
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
      <TouchableOpacity onPress={handleVerify} style={styles.button}>
        <Text style={styles.text}>Verificar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={handleResendCode}
        style={[
          styles.button,
          styles.resendButton,
          isResendDisabled && styles.disabledButton,
        ]}
        disabled={isResendDisabled}
      >
        <Text style={styles.text}>
          {isResendDisabled ? `Reenviar en ${timer}s` : "Reenviar código"}
        </Text>
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
    width: 135,
    height: 45,
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 8,
  },
  resendButton: {
    marginTop: 10,
    backgroundColor: "#18181b",
  },
  disabledButton: {
    backgroundColor: "#18181b",
  },
  text: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default VerifiedEmail;
