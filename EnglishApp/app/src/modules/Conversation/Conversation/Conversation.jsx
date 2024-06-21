import {
  ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, Vibration, Alert
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteScore } from "../../../store/slices/score/slice";
import { deleteAudioUri } from "../../../store/slices/audioUri/slice";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
import { playApprove } from "../../../common/audio/functions";
import * as Font from "expo-font";
import { ALERT_TYPE, Dialog as Message, Toast } from "react-native-alert-notification";

import Microphone from "./components/Microphone";
import Dialog from "./components/Dialog";
import Score from "./components/Score";

import { getAvatarPicked } from "../../../common/avatars/functions";

export default function Conversation({ navigation }) {
  const dispatch = useDispatch();

  const dialogs = useSelector((state) => state.dialog.value);
  const audioUri = useSelector((state) => state.audioUri.value);

  const [avatarImg, setAvatarImg] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

    setAvatarImg(response);
  }

  async function playAudio() {
    if (audioUri != "") {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();

    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Wait",
        textBody: "You have to record an audio firts to be able to listen to it",
        autoClose: 2000
      });
    }
  }

  function TopicConversation() {
    navigation.navigate("TopicConversation");
    dispatch(deleteScore());
    dispatch(deleteAudioUri());
  }

  function verificationAllApproved() {
    let verification = dialogs.filter((dialog) => dialog.approved == true)
      .length;

    if (dialogs.length == verification) {
      Vibration.vibrate(2000);

      Message.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Well Done!",
        textBody:
          "You've just approved all the dialogs. Please choose another.",
        button: "close",
      });

      setTimeout(() => {
        navigation.navigate("TopicConversation");
        dispatch(deleteScore());
      }, 3000);
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.container_score_board}>
        <View style={styles.container_ear_button}>
          <TouchableOpacity onPress={playAudio} style={styles.own_audio}>
            <Text>Your audio</Text>
            <Icon
              name="ear-outline"
              reverseColor="#000000"
              type="ionicon"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <Score />
      </View>

      <View style={styles.container_conversation}>
        <View style={styles.avatar_section}>
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
            return item.approved == true ? (
              <View
                key={item.id}
                style={
                  item.person == 1
                    ? styles.individual_conversation_bot
                    : styles.individual_conversation
                }
              >
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
                  <Microphone
                    person={item.person}
                    dialog={item.dialog}
                    id_conversation={item.id}
                    allApproved={verificationAllApproved()}
                  />
                </View>
              </View>
            ) : (
              <></>
            );
          })}
      </View>
    </ScrollView>
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
  container_ear_button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  container_conversation: {
    marginTop: 9,
  },
  avatar_section: {
    display: "flex",
    flexDirection: "row",
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
    marginTop: 5,
  },
  avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  mini_container_online: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
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
    padding: 5,
    margin: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    flexWrap: "wrap",
  },
  container_all_dialog_bot: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#7BAEF8",
    padding: 5,
    margin: 5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    flexWrap: "wrap",
  },
  individual_conversation: {
    minHeight: 60,
    minWidth: 200,
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  individual_conversation_bot: {
    minHeight: 60,
    minWidth: 200,
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  own_audio: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#fff",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
});
