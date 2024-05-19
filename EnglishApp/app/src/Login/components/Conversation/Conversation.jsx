import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dialog from "./components/Dialog";
import Microphone from "./components/Microphone";

export default function Conversation({}) {
  const dialogs = useSelector((state) => state.dialog.value);

  useEffect(() => {
    console.log("INTO THE CONVERSATION COMPOENNT");
    console.log(dialogs);
  }, []);

  return (
    <View>
      <Text>OHH SHIT HERE WE GO AGAIN</Text>
      {dialogs &&
        dialogs.map((item) => {
          return (
            <View>
              <Dialog
                id_conversation={item.id}
                person={item.person}
                dialog={item.dialog}
              />
              <Microphone />
            </View>
          );
        })}
    </View>
  );
}
