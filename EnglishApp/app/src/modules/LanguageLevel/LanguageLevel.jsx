import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import BottomTab from "../BottomTab/BottomTab";
import BackButton from "../../global/components/BackButton";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";
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

        <BackButton module={'Plans'} navigation={navigation} />

        <Titles title={'Select the level that represents your current ability'} />

        <View style={globalStyles.container_card}>
          {languageLevels &&
            languageLevels.map((item) => {
              return (
                <View key={item.id} style={globalStyles.card}>
                  <TouchableOpacity
                    style={globalStyles.level_button}
                    onPress={() => updateUserLanguageLevel(item.id)}
                  >
                    <Text style={globalStyles.text_medium}>{item.level} </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={globalStyles.information_button}
                    onPress={() =>
                      showLevelInformation(item.level, item.description_cefr)
                    }
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
      </ScrollView>

      <View style={globalStyles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
};