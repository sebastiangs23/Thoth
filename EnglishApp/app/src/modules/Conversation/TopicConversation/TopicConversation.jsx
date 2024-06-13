import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { setDialog } from "../../../store/slices/dialog/slice";
import { playAudioNext } from "../../../common/audio/functions";
import axios from "axios";

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
      //ESTE MODELO VA DESAPARECER Y TENGO QUE CONSUMIR LA TABLA 'CONVERSATIONS'
      const response = await axios.get(
        "http://192.168.1.10:5000/conversation/get-conversation-topic"
      );

      setConversationContext(response.data);
    } catch (error) {
      console.log("error en function getConversationContexts");
      console.log(error);
    }
  }

  async function selectContext(item) {
    try {
      const response = await axios.get(
        `http://192.168.1.10:5000/conversation/get-dialogs-conversation/${item.id}`
      );

      dispatch(setDialog(response.data));
      playAudioNext();
      navigateToConversation();
      
    } catch (error) {
      console.log(error.message);
    }
  }

  function navigateToConversation() {
    navigation.navigate("Conversation");
  }

  function PickAvatar() {
    navigation.navigate("PickAvatar");
  }

  return (
    <View>
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
          Select a topic you would like to talk about
        </Text>
      </View>

      <View style={styles.container_card}>
        {conversationContext &&
          conversationContext.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.button}
                onPress={() => selectContext(item)}
              >
                <Text style={styles.text}>{item.context}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
