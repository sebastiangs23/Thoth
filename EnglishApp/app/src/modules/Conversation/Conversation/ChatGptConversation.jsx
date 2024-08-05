import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;
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
      const response = await axios.post(
        `${api}/chat-gpt/answer`, { data }
      );

      setChat([response.data]);
    } catch (error) {
      console.log(error);
    }
  };


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
        situation
      };
      
      console.log('before send', data)

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
    <View>
      <Text>HERE IT WILL BE THE CHAT GPT VERSION PRO</Text>
      {chat &&
        chat.map((item) => {
          return (
            <View>
              <Text> {item.message} </Text>
            </View>
          );
        })}
    </View>
  );
}
