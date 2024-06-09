import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDialog } from "../../../store/slices/dialog/slice";
import { playAudioNext } from "../../../common/audio/functions";
import axios from "axios";

export default function RandomConversation({ navigation }) {
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
        "http://192.168.1.9:5000/conversation/get-conversation-topic"
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
        `http://192.168.1.9:5000/conversation/get-dialogs-conversation/${item.id}`
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

  return (
    <View>
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
    backgroundColor: "#F87800",
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
