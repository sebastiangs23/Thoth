import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { getUserSession } from "../../../../common/user/functions";
import { Icon } from "react-native-elements";
import { setScore } from "../../../../store/slices/score/slice";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { setAudioUri } from "../../../../store/slices/audioUri/slice";

export default function Microphone({ person, dialog, id_conversation }) {
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
      console.log(error);
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

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (error) {
      console.log("An error occurred while trying to start recording");
      console.log(error);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      //setAudioUri(uri);
      dispatch(setAudioUri(uri));
      setRecording(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      audioScore(uri, dialog);
    } catch (error) {
      console.log("An error occurred while trying to stop recording");
      console.log(error);
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
        "http://192.168.1.10:5000/score/audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setScore(response.data));
    } catch (error) {
      console.log("Error al intentar evaluar el audio");
      console.log(error.response ? error.response.data : error);
    }
  }

  return (
    <View style={styles.container}>
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
          <Icon name="ear-outline" type="ionicon" size={20} />
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
    margin: 5,
    padding: 1,
  },
  button_container: {
    width: 30,
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
    marginLeft: 15,
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
