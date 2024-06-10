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
    navigation.navigate("RandomConversation");
  }

  return (
    <View style={styles.container_conversation}>
      <View style={styles.container_score_board}>
        <View style={styles.container_back_ear_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            size={20}
            reverse
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
  container_conversation: {
    backgroundColor: "#3790F5",
  },
  container_score_board: {
    padding: 5,
    backgroundColor: "#C5C5C5",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container_back_ear_button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Asegura que los íconos se distribuyan en ambos extremos
    alignItems: "center",
  },
  container_all_dialog: {
    backgroundColor: '#95C4F7',
    margin: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    // borderRadius: 10,
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
