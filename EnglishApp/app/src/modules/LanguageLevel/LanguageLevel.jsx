import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import BottomTab from "../BottomTab/BottomTab";
import BackButton from "../../global/components/BackButton";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";
import { useFonts } from 'expo-font';
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

  let [fontsLoaded] = useFonts({
    'Roboto-Italic': require('../../assets/fonts/titles/Roboto-ThinItalic.ttf'), // O la fuente que estés usando
  });

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
      const response = await axios.get(`${api}/languages/get-languages-levels`);

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
        `${api}/users/update-level-language`,
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
  function showLevelInformation(level, description) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: level,
      textBody: description,
      autoClose: 12000,
    });
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <BackButton module={"Plans"} navigation={navigation} />

        <Titles
          title={"Select the level that represents your current ability"}
        />

        <View style={globalStyles.container_card}>
          {languageLevels &&
            languageLevels.map((item) => {
              return (
                <View key={item.id} style={styles.card}>
                  <TouchableOpacity
                    style={styles.level_button}
                    onPress={() => updateUserLanguageLevel(item.id)}
                  >
                    <View style={styles.row_1}>
                      <Text style={styles.text_medium}>{item.level} </Text>
                      <Text style={styles.text_level}>{item.name} </Text>
                    </View>

                    <View>
                      <Text style={styles.text_description}>
                        {item.description_cefr.length > 60
                          ? item.description_cefr.substring(0, 60) + "..."
                          : item.description_cefr}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.information_button}
                    onPress={() =>
                      showLevelInformation(item.level, item.description_cefr)
                    }
                  >
                    <Text style={styles.information_button_text}>
                      Read more
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>

      <View style={globalStyles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  row_1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text_medium: {
    color: "#18181b",
    fontSize: 18,
    fontWeight: "bold",
  },
  text_description: {
    // marginTop: 6,
    color: "#18181b",
    fontSize: 12,
  },
  text_level: {
    color: "#18181b",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  information_button: {
    backgroundColor: "#18181b",
    borderRadius: 5,
    position: "absolute",
    right: 4,
    bottom: 4,
  },
  information_button_text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
  },
});
