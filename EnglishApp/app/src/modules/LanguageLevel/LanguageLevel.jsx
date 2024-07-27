import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import { playAudioNext } from "../../common/audio/functions";
import {
  getUserSession,
  saveUserSession,
  removeUserSession,
} from "../../common/user/functions";

export default function LanguageLevel({ navigation }) {
  const [languageLevels, setLanguageLevels] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getLanguageLevels();
    getUser();
  }, []);

  /*________________________________________
  |   REQUEST TO SERVER (GLOBAL STATES)   */
  async function getUser() {
    const response = await getUserSession();
    setUser(response);
  }

  async function getLanguageLevels() {
    try {
      const response = await axios.get(
        `${api}/languages/get-languages-levels`
      );

      setLanguageLevels(response.data);
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "An unexpected just happened in the LanguageLevel.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  async function updateUserLanguageLevel(id_language_level) {
    try {
      let data = {
        id_user: user.id,
        id_language_level,
      };

      const response = await axios.put(
        "http://192.168.1.11:5000/users/update-level-language",
        data
      );

      if (response.data.status == "Successfull") {
        saveUserSession(response.data.data);
        navigation.navigate("PickAvatar");
        playAudioNext();
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: ":(",
          textBody: "Something unexpected just happened in the Login.jsx",
          button: "Ok",
          autoClose: 2000,
        });
      }
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
  function logOut() {
    removeUserSession();
    navigation.navigate("Login");
  }
  
  function showLevelInformation(level, description){
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: level,
      textBody: description,
      autoClose: 12000,
    });
  }

  return (
    <View>
      <TouchableOpacity>
        <Icon name="power-off" type="font-awesome" reverse onPress={logOut} />
      </TouchableOpacity>

      <View style={styles.title_container}>
        <Text style={styles.title}>
          Select the level that represents your current ability
        </Text>
      </View>

      <View style={styles.container_card}>
        {languageLevels &&
          languageLevels.map((item) => {
            return (
              <View key={item.id} style={styles.card}>
                <TouchableOpacity
                  style={styles.level_button}
                  onPress={() => updateUserLanguageLevel(item.id)}
                >
                  <Text style={styles.text}>{item.level} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.information_button}
                  onPress={() => showLevelInformation(item.leven, item.description_cefr)}
                >
                  <Icon
                    name="information-circle-outline"
                    type="ionicon"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: 45,
    fontWeight: "bold",
    color: "#000000",
  },
  container_card: {
    display: "flex",
    flexDirection: "row", // Asegura que los items se coloquen en línea horizontal
    flexWrap: "wrap", // Permite que los items se envuelvan a la línea siguiente si no hay espacio
    justifyContent: "flex-start",
  },
  card: {
    width: 100,
    height: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  level_button: {
    padding: 8,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  information_button: {
    position: 'absolute',
    right: 4,
    bottom: 4
  }
});
