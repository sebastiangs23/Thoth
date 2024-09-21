import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getUserSession } from "../../../../common/user/functions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Score from "../components/Score";
import Dialog from "../components/Dialog";
import PlayAudio from "../components/PlayAudio";
import Microphone from "../components/Microphone";
import TutorSection from "../components/TutorSection";
import MicrophonePro from "../components/MicrophonePro";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;
import { Icon } from "react-native-elements";
import axios from "axios";
import { globalStyles } from "../../../../global/styles/styles";

export default function ChatGptConversation({ navigation }) {
  const [chat, setChat] = useState([]);

  const topic = useSelector((state) => state.chosenTopic.value);
  const situation = useSelector((state) => state.situation.value);

  useEffect(() => {
    getUser();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function talkWithChatgpt(data, conversationHistory) {
    try {
      const response = await axios.post(`${api}/chat-gpt/answer`, {
        data,
        conversationHistory,
      });

      let fake_data = [
        {
          system:
            "Hello XD, Sebastian! Nice to meet you. I’m excited to talk about your experience with React today. Can you tell me what you like most about using React?",
        },
        {
          user: "Thats right, I'm senior developer",
        },
      ];
      // setChat([response.data]);
      setChat(fake_data);
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

      await talkWithChatgpt(data, null);
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
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <Score />

        <TutorSection navigation={navigation} />

        {chat &&
          chat.map((item, index) => {
            return (
              <View
                key={index}
                style={
                  item.system
                    ? globalStyles.dialog_bot
                    : globalStyles.dialog_user
                }
              >
                <Dialog
                  id_conversation={index}
                  person={1}
                  dialog={item.system ? item.system : item.user}
                />
                <PlayAudio dialog={item.system ? item.system : item.user} />
                <Microphone
                  person={2}
                  dialog={item.system ? item.system : item.user}
                />
              </View>
            );
          })}
      </ScrollView>

      <View style={globalStyles.container_bottom_tab}>
        <Text>HERE IT SHOIDA BE THE OUTSIDE AUDIPO</Text>
        <MicrophonePro />
      </View>
    </View>
  );
}
