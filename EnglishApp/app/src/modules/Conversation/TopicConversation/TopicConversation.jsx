import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import BottomTab from "../../BottomTab/BottomTab";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDialog } from "../../../store/slices/dialog/slice";
import { getUserSession } from "../../../common/user/functions";
const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import { playAudioNext } from "../../../common/audio/functions";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export default function TopicConversation({ navigation }) {
  const dispatch = useDispatch();

  const [conversationContext, setConversationContext] = useState([]);

  useEffect(() => {
    getConversationContexts();
  }, []);

  /*__________________________
  |   REQUEST TO THE SERVER   */
  async function getConversationContexts() {
    try {
      const user = await getUserSession();

      let id_language_level = user.id_language_level;

      if (id_language_level) {
        const response = await axios.get(
          `${api}/conversation/get-conversations-topic-by-level/${id_language_level}`
        );

        setConversationContext(response.data);
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: ":(",
          textBody: "The user doesn´t have a level, please choose one",
          button: "close",
        });

        navigation.navigate("LanguageLevel");
      }
    } catch (error) {
      console.log("errroww: ", error);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: ":(",
        textBody: "An unexpected happened in TopicConversation.jsx",
        button: "close",
      });
    }
  }

  async function selectContext(item) {
    try {
      const response = await axios.get(
        `http://192.168.1.11:5000/conversation/get-dialogs-conversation/${item.id}`
      );

      dispatch(setDialog(response.data));
      playAudioNext();
      navigateToConversation();
    } catch (error) {
      console.log(error.message);
    }
  }

  /*________________
  |   FUNCTIONS   */
  function navigateToConversation() {
    navigation.navigate("Conversation");
  }

  function PickAvatar() {
    navigation.navigate("PickAvatar");
  }

  return (
    <View style={styles.topicConversation_container}>
      <ScrollView>
        <View style={styles.container_back_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            size={20}
            reverse
            onPress={PickAvatar}
          />
        </View>

        <View style={styles.title_container}>
          <Text style={styles.title}>
            Select a topic you would like to chat about
          </Text>
        </View>

        <View style={styles.container_card}>
          {conversationContext &&
            conversationContext.map((item) => {
              const contextWithNewLines = item.context.replace(/\\n/g, "\n");

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => selectContext(item)}
                >
                  <Text style={styles.text}>{contextWithNewLines}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <View style={styles.container_bottom_tab}>
        <BottomTab navigation={navigation}  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topicConversation_container: {
    flex: 1,
    position: "relative",
  },
  container_back_button: {
    alignSelf: "flex-start",
    margin: 8,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
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
    width: 130,
    height: 120,
    padding: 5,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
