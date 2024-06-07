import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
import Microphone from "./components/Microphone";
import Dialog from "./components/Dialog";
import Score from "./components/Score";
import silueta from "../../../assets/avatars/siluetaAvatar.jpg";

export default function Conversation() {
  const dialogs = useSelector((state) => state.dialog.value);
  const audioUri = useSelector((state) => state.audioUri.value);

  /*_______________
  |   FUNCTIONS   */
  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  }

  return (
    <View>
      <View style={styles.container_score_board}>
        <Text style={styles.title}>SCORE</Text>
        {audioUri && (
          <View style={styles.button}>
            <TouchableOpacity onPress={playAudio}>
              <Icon name="ear-outline" type="ionicon" color="white" />
            </TouchableOpacity>
          </View>
        )}
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
  button: {
    flexDirection: "row",
    height: 35,
    backgroundColor: "#F87800",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 20,
  },
});
