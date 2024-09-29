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
import TutorSection from "../components/TutorSection";
import MicrophonePro from "../components/MicrophonePro";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;
import { Icon } from "react-native-elements";
import axios from "axios";
import { globalStyles } from "../../../../global/styles/styles";

export default function ChatGptConversation({ navigation }) {
  const [chat, setChat] = useState([]);
  const [data, setData] = useState({});

  const topic = useSelector((state) => state.chosenTopic.value);
  const situation = useSelector((state) => state.situation.value);

  useEffect(() => {
    getUser();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function talkWithChatgptFirtsInteraction(data, chat, uri) {
    try {
      let response = [];

      if (chat && uri) {
        const formData = new FormData();

        formData.append("voice", {
          uri,
          type: "audio/wav",
          name: "audio.wav",
        });
        formData.append("data", JSON.stringify(data));
        formData.append("chat", JSON.stringify(chat));

        response = await axios.post(
          `${api}/score/chat-gpt/audio`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params:{
              data,
              chat,
            }
          },
        );
      } else {
        response = await axios.post(`${api}/score/chat-gpt/audio`, {
          data,
          chat,
        });
      }
      console.log("ABC", [response.data, { user: "" }]);

      setChat([response.data, { role: "user", content: "" }]);
    } catch (error) {
      console.log(error);
    }
  }

  async function talkWithChatgpt(data, chat, uri) {
    try {
      let response = [];

      if (chat && uri) {
        const formData = new FormData();

        formData.append("voice", {
          uri,
          type: "audio/wav",
          name: "audio.wav",
        });
        formData.append("data", JSON.stringify(data));
        formData.append("chat", JSON.stringify(chat));

        response = await axios.post(
          `${api}/score/chat-gpt/audio`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params:{
              data,
              chat,
            }
          },
        );
      } else {
        response = await axios.post(`${api}/score/chat-gpt/audio`, {
          data,
          chat,
        });
      }
      console.log("ABC", response.data);

      setChat(response.data);
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

      setData(data);

      console.log("before send", data);

      await talkWithChatgptFirtsInteraction(data, null);
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

  async function getUri(uri) {
    console.log("lauri??", uri);

    await talkWithChatgpt(data, chat, uri);
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
                  dialog={item.system ? item.system : item.content}
                />
                <PlayAudio dialog={item.system ? item.system : item.user} />
              </View>
            );
          })}
      </ScrollView>

      <View style={globalStyles.container_bottom_tab}>
        <MicrophonePro data={data} getUri={getUri} />
      </View>
    </View>
  );
}
