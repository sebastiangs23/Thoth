import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { useDispatch } from "react-redux";
import { setScore } from "../../../../store/slices/score/slice";
import { setDialogsApproved } from "../../../../store/slices/dialog/slice";
import { setAudioUri } from "../../../../store/slices/audioUri/slice";
import { getUserSession } from "../../../../common/user/functions";
const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { playFail, playGood } from "../../../../common/audio/functions";
import { ALERT_TYPE, Dialog as Message } from "react-native-alert-notification";


export default function Microphone({ person, dialog, id_conversation, allApproved }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [recording, setRecording] = useState(false);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    getUser();
  }, []);

  /*________________
  |   FUNCTIONS   */
  async function getUser() {
    try {
      const response = await getUserSession();
      setUser(response);

    } catch (error) {
      Message.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "Something unexpected just happened in the Microphone.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      Vibration.vibrate(100)

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (error) {
      Message.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "Something unexpected just happened in the Microphone.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      Vibration.vibrate(100);

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      dispatch(setAudioUri(uri));
      setRecording(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      audioScore(uri, dialog);
    } catch (error) {
      Message.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody: "Something unexpected just happened trying to stopRecording in the Microphone.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  function speak() {
    const thingToSay = dialog;

    Speech.speak(thingToSay, {
      language: "en",
      pitch: 1,
      rate: 0.8,
    });
  }

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function audioScore(uri, dialog) {
    try {
      const formData = new FormData();

      formData.append("dialog", dialog);
      formData.append("id_user", user.id);
      formData.append("id_dialog", id_conversation);
      formData.append("voice", {
        uri,
        type: "audio/wav",
        name: "audio.wav",
      });

      const response = await axios.post(
        `${api}/score/audio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setScore(response.data));

      //Condition to know if the the approved the dialog or not
      let average = 0;

      if(response.data.pronunciation_level){
        average += response.data.pronunciation_level[0].accuracy_score;
        average += response.data.pronunciation_level[0].completeness_score;
        average += response.data.pronunciation_level[0].fluency_score;
        average += response.data.pronunciation_level[0].pronunciation_score;
        average += response.data.pronunciation_level[0].prosody_score;

        average = average/5;
      }

      if(average >= 75){
        dispatch(setDialogsApproved());
        playGood()
        allApproved;
      }else if(average <= 60){
        playFail()
      }

    } catch (error) {
      Message.show({
        type: ALERT_TYPE.WARNING,
        title: "Something goes wrong :(",
        textBody: "Please get closer to the microphone or speak louder!",
        button: "close",
      });
    }
  }

  return (
    <View key={id_conversation} style={styles.container}>
      {person == 2 ? (
        <View style={styles.button_container}>
          <TouchableOpacity
            style={
              recording ? styles.button_recording : styles.button_no_recording
            }
            onPress={recording ? stopRecording : startRecording}
          >
            <Icon
              name="mic-circle-outline"
              type="ionicon"
              size={25}
              color={recording ? "#FF5F5F" : "#000000"}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button_hear} onPress={speak}>
          <Icon name="play" type="font-awesome" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    minWidth: 55,
    margin: 5,
    padding: 1,
  },
  button_container: {
    marginTop: 5,
    marginBottom: 5,
  },
  button_hear: {
    height: 40,
    width: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginLeft: 6,
  },
  button_recording: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  button_no_recording: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
});
