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

export default function Conversation({ navigation }) {
  const dialogs = useSelector((state) => state.dialog.value);
  const audioUri = useSelector((state) => state.audioUri.value);

  /*_______________
  |   FUNCTIONS   */
  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  }

  function RandomConversation() {
    navigation.navigate("Login");
  }

  return (
    <View>
      <View style={styles.container_score_board}>
        <View style={styles.container_back_ear_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            size={20}
            reverse
            style={styles.back_button}
            onPress={RandomConversation}
          />

          {audioUri && (
            <TouchableOpacity onPress={playAudio} style={styles.own_audio}>
              <Icon
                name="ear-outline"
                reverseColor="#000000"
                type="ionicon"
                color="white"
                size={20}
                reverse
                style={styles.back_button}
              />
            </TouchableOpacity>
          )}
        </View>

        <Score />
      </View>

      <ScrollView>
        {dialogs &&
          dialogs.map((item) => {
            return (
              <View key={item.id}>
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
  container_score_board: {
    padding: 5,
    backgroundColor: "#C5C5C5",
  },
  container_back_ear_button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Asegura que los íconos se distribuyan en ambos extremos
    alignItems: "center",
  },
  back_button: {
    alignSelf: "flex-start",
  },
  container_all_dialog: {
    borderWidth: 3,
    margin: 5,
    borderRadius: 10,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  own_audio: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
