import { ScrollView, View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dialog from "./components/Dialog";
import Microphone from "./components/Microphone";
import Score from "./components/Score";

export default function Conversation() {
  const dialogs = useSelector((state) => state.dialog.value);

  useEffect(() => {
    console.log(dialogs);
  }, []);

  return (
    <View>
      
      <View>
        <Text>SCORE ....</Text>
        <Score />
      </View>

      <ScrollView>
        {dialogs &&
          dialogs.map((item) => {
            return (
              <View>
                <Dialog
                  id_conversation={item.id}
                  person={item.person}
                  dialog={item.dialog}
                />
                <Microphone dialog={item.dialog} id_conversation={item.id} />
              </View>
            );
          })}
      </ScrollView>
      
    </View>
  );
}
