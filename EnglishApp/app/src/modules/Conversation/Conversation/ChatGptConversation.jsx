import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import Score from "./components/Score";
import Dialog from "./components/Dialog";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;
import { Icon } from "react-native-elements";
import { getUserSession } from "../../../common/user/functions";
import axios from "axios";

export default function ChatGptConversation() {
  const [chat, setChat] = useState([]);

  const topic = useSelector((state) => state.chosenTopic.value);
  const situation = useSelector((state) => state.situation.value);

  useEffect(() => {
    getUser();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function talkWithChatgpt(data) {
    try {
      const response = await axios.post(`${api}/chat-gpt/answer`, { data });

      setChat([response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
  |   FUNCTIONS   */
  async function getUser() {
    try {
      const response = await getUserSession();

      let data = {
        id_user: response.id,
        name: response.name,
        last_name: response.last_name,
        id_language_level: response.id_language_level,
        topic,
        situation,
      };

      console.log("before send", data);

      await talkWithChatgpt(data);
    } catch (error) {
      Message.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "Something unexpected just happened in the Microphone.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  async function playAudio() {
    if (audioUri != "") {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Wait",
        textBody:
          "You have to record an audio firts to be able to listen to it",
        autoClose: 2000,
      });
    }
  }

  return (
    <ScrollView>
      <View style={styles.container_score_board}>
        <View style={styles.container_ear_button}>
          <TouchableOpacity onPress={playAudio} style={styles.own_audio}>
            <Text>Your audio</Text>
            <Icon
              name="ear-outline"
              reverseColor="#000000"
              type="ionicon"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <Score />
      </View>

      {chat &&
        chat.map((item, index) => {
          return (
            <View key={index} style={styles.individual_conversation_bot}>
              <View style={styles.container_all_dialog_bot}>
                <Dialog
                  id_conversation={index}
                  person={1}
                  dialog={item.message}
                />
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_score_board: {
    padding: 5,
    backgroundColor: "#EFEFEF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  container_ear_button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  own_audio: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#fff",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  individual_conversation: {
    minHeight: 60,
    minWidth: 200,
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  individual_conversation_bot: {
    minHeight: 60,
    minWidth: 200,
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  container_all_dialog_bot: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#7BAEF8",
    padding: 5,
    margin: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    flexWrap: "wrap",
  },
});
