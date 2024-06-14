import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

import { playAudioNext } from "../../common/audio/functions";
import { getUserSession, saveUserSession } from "../../common/user/functions";

export default function LanguageLevel({ navigation }) {
  const [languageLevels, setLanguageLevels] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getLanguageLevels();
    getUser();
  }, []);

  /*________________________________________
  |   REQUEST TO SERVER (GLOBAL STATES)   */
  async function getUser(){
    const response = await getUserSession();
    setUser(response);

  };

  async function getLanguageLevels() {
    try {
      const response = await axios.get(
        "http://192.168.1.10:5000/languages/get-languages-levels"
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

  async function updateUserLanguageLevel(id_language_level){
    try{
      let data = {
        id_user: user.id,
        id_language_level
        };

      const response = await axios.put('http://192.168.1.10:5000/users/update-level-language', data);

      if(response.data.status == 'Successfull'){

        saveUserSession(response.data.data);
        navigation.navigate("PickAvatar");
        playAudioNext();

      }else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: ":(",
          textBody: "Something unexpected just happened in the Login.jsx",
          button: "Ok",
          autoClose: 2000,
        });
      }

    }catch(error){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "Something unexpected just happened in the Login.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  return (
    <View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Select the level that represents your current ability</Text>
      </View>

      <View style={styles.container_card}>
        {languageLevels &&
          languageLevels.map((item) => {
            return (
              <TouchableOpacity key={item.id} style={styles.button} onPress={() => updateUserLanguageLevel(item.id)}>
                <Text style={styles.text}> {item.level} </Text>
              </TouchableOpacity>
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
  button: {
    width: 100,
    height: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
