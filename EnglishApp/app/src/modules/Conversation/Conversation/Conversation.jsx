import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
import * as Font from "expo-font";

import Microphone from "./components/Microphone";
import Dialog from "./components/Dialog";
import Score from "./components/Score";

import { getAvatarPicked } from "../../../common/avatars/functions";
import silueta from "../../../assets/avatars/siluetaAvatar.jpg";

export default function Conversation({ navigation }) {
  const dialogs = useSelector((state) => state.dialog.value);
  const audioUri = useSelector((state) => state.audioUri.value);

  // const [fontsLoaded, setFontsLoaded] = useState(false);
  const [avatarImg, setAvatarImg] = useState("");

  useEffect(() => {
    getAvatarImg();
    loadFonts();
  }, []);

  /*________________
  |   FUNCTIONS   */
  async function loadFonts() {
    await Font.loadAsync({
      "Roboto-Italic": require("../../../assets/fonts/titles/Roboto-Italic.ttf"),
    });
    setFontsLoaded(true);
  }

  async function getAvatarImg() {
    const response = await getAvatarPicked();

    console.log(response);
    setAvatarImg(response);
  }

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  }

  function TopicConversation() {
    navigation.navigate("TopicConversation");
  }

  return (
    <View style={styles.main_container}>
      <View style={styles.container_score_board}>
        <View style={styles.container_back_ear_button}>
          <TouchableOpacity style={styles.back_button}>
            <Icon
              name="arrow-back-outline"
              reverseColor="#000000"
              type="ionicon"
              color="white"
              size={20}
              reverse
              onPress={TopicConversation}
            />
          </TouchableOpacity>

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

      <ScrollView style={styles.container_conversation}>
        <View style={styles.container_avatarpicked}>
          <Image source={avatarImg.img} style={styles.avatar} />

          <View>
            <Text style={styles.text_name}> {avatarImg.name} </Text>

            <View style={styles.mini_container_online}>
              <View style={styles.green_point}></View>
              <Text style={styles.text_online}>Online</Text>
            </View>
          </View>
        </View>
        {dialogs &&
          dialogs.map((item) => {
            return (
              <View key={item.id} style={styles.individual_conversation}>
                {/* <Image source={silueta} style={styles.avatar} /> */}
                <View
                  style={
                    item.person == 1
                      ? styles.container_all_dialog_bot
                      : styles.container_all_dialog
                  }
                >
                  <Dialog
                    id_conversation={item.id}
                    person={item.person}
                    dialog={item.dialog}
                  />
                  {item.person == 2 ? (
                    <Microphone
                      dialog={item.dialog}
                      id_conversation={item.id}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: "#FFFFFF",
  },
  container_score_board: {
    padding: 5,
    backgroundColor: "#EFEFEF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  container_back_ear_button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Asegura que los íconos se distribuyan en ambos extremos
    alignItems: "center",
  },
  back_button: {
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
  container_conversation: {
    marginTop: 9,
  },
  container_avatarpicked: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  mini_container_online: {
    display: "flex",
    flexDirection: "row",
    alignItems:'center',
    marginLeft: 5
  },
  green_point: {
    borderRadius: 50,
    borderColor: "#000000",
    borderWidth: 1,
    width: 10,
    height: 10,
    backgroundColor: "#81E362",
  },
  text_name: {
    // fontFamily: 'Roboto-Italic',
    fontWeight: "bold",
  },
  text_online: {
    fontFamily: "Roboto-Italic",
    color: "#514F4F",
  },
  container_all_dialog: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#35B8EE",
    margin: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  container_all_dialog_bot: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#2891BC",
    margin: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
  },
  individual_conversation: {
    padding: 5,
  },
  own_audio: {
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
});
