import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getUserSession } from "../../../common/user/functions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Score from "./components/Score";
import Dialog from "./components/Dialog";
import PlayAudio from "./components/PlayAudio";
import Microphone from "./components/Microphone";
import TutorSection from "./components/TutorSection";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;
import { Icon } from "react-native-elements";
import axios from "axios";
import { globalStyles } from "../../../global/styles/styles";

export default function ChatGptConversation({ navigation }) {
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

  return (
    <ScrollView>

      <Score />

      <TutorSection navigation={navigation} />

      {chat &&
        chat.map((item, index) => {
          return (
            <View key={index} style={globalStyles.dialog_bot}>
              <Dialog
                id_conversation={index}
                person={1}
                dialog={item.message}
              />
              <PlayAudio dialog={item.message} />
              <Microphone person={2} dialog={item.message} />
            </View>
          );
        })}
    </ScrollView>
  );
}
