import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dialog from "./components/Dialog";
import Microphone from "./components/Microphone";
import Score from "./components/Score";
import silueta from "../../../assets/avatars/siluetaAvatar.jpg";

export default function Conversation() {
  const dialogs = useSelector((state) => state.dialog.value);

  useEffect(() => {
    console.log(dialogs);
  }, []);

  return (
    <View>
      <View style={styles.container_score_board}>
        <Text style={styles.title}>SCORE333</Text>
        <Score />
      </View>

      <ScrollView>
        {dialogs &&
          dialogs.map((item) => {
            return (
              <View>
                <Image source={silueta} style={styles.avatar} />
                <View style={styles.container_all_dialog}>
                  <Dialog
                    id_conversation={item.id}
                    person={item.person}
                    dialog={item.dialog}
                  />
                  <Microphone dialog={item.dialog} id_conversation={item.id} />
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_all_dialog: {
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
  },

  title: {
    margin: 5,
    padding: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
