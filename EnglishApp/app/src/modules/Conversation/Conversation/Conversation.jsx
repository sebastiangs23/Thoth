import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteScore } from "../../../store/slices/score/slice";
import { deleteAudioUri } from "../../../store/slices/audioUri/slice";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
import { playApprove } from "../../../common/audio/functions";
import * as Font from "expo-font";
import {
  ALERT_TYPE,
  Dialog as Message,
  Toast,
} from "react-native-alert-notification";
import BackButton from "../../../global/components/BackButton";

import Microphone from "./components/Microphone";
import Dialog from "./components/Dialog";
import PlayAudio from "./components/PlayAudio";
import TutorSection from "./components/TutorSection";
import Score from "./components/Score";

import { globalStyles } from "../../../global/styles/styles";

export default function Conversation({ navigation }) {
  const dispatch = useDispatch();

  const dialogs = useSelector((state) => state.dialog.value);
  const audioUri = useSelector((state) => state.audioUri.value);

  /*________________
  |   FUNCTIONS   */
  async function playAudio() {
    if (audioUri != "") {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Wait",
        textBody:
          "You have to record an audio firts to be able to listen to it",
        autoClose: 2000,
      });
    }
  }

  function verificationAllApproved() {
    let verification = dialogs.filter(
      (dialog) => dialog.approved == true
    ).length;

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
        navigation.navigate("Situation");
        dispatch(deleteScore());
        dispatch(deleteAudioUri());
      }, 3000);
    }
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

        <TutorSection navigation={navigation} />

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

                  <PlayAudio dialog={item.dialog} />

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
    display: "flex",
    flexDirection: "row",
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
