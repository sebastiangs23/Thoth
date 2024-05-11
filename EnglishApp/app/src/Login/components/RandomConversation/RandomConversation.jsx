import { View, StyleSheet, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RandomConversation({}) {
  const [conversationContext, setConversationContext] = useState([]);

  useEffect(() => {
    getConversationContexts();
  }, []);

  /*__________________________
|   REQUEST TO THE SERVER   */
  async function getConversationContexts() {
    try {
      const response = await axios.get(
        "http://192.168.1.12:5000/conversation-context/get-conversations-context"
      );
      setConversationContext(response.data);
      console.log(response.data);
      console.log("conversation-context");
    } catch (error) {
      console.log("error en function getConversationContexts");
      console.log(error);
    }
  }

  function selectContext(item){
    console.log(" lo que se selecciono")
    console.log(item)
    alert(item.id)
  }

  return (
    <View>
      <Text>Select a topic you would like to talk.</Text>

      {conversationContext &&
        conversationContext.map((item) => {
          return (
            <Button
              title={item.description}
              style={styles.button_context}
              onPress={() => selectContext(item)}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  button_context: {
    padding: "5px",
    margin: "5px",
  },
});
