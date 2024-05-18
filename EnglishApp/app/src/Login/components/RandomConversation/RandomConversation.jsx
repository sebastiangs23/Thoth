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

      //ESTE MODELO VA DESAPARECER Y TENGO QUE CONSUMIR LA TABLA 'CONVERSATIONS'
      const response = await axios.get(
        "http://192.168.1.9:5000/conversation/get-conversation-topic"
      );
      console.log(response.data)
      console.log("response.data adads")

      setConversationContext(response.data);
      
    } catch (error) {
      console.log("error en function getConversationContexts");
      console.log(error);
    }
  }

  async function selectContext(item){
    try{
      console.log(" lo que se selecciono")
      console.log(item)
      alert(item.id)
  
      const response = await axios.get(`http://192.168.1.9:5000/conversation/get-dialogs-conversation/${item.id}`);
      
      console.log("response.data");
      console.log(response.data);

    }catch(error){
      console.log(error.message)
    }
  };

  return (
    <View>
      <Text>Select a topic you would like to talk.</Text>

      {conversationContext &&
        conversationContext.map((item) => {
          return (
            <Button
              title={item.context}
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
