import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { setScore } from "../../../../store/slices/score/slice";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { setAudioUri } from "../../../../store/slices/audioUri/slice";

export default function Microphone({ dialog, id_conversation }) {
  const dispatch = useDispatch();
  
  const [user, setUser] = useState(null);
  const [recording, setRecording] = useState(false);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  /*________________
  |   FUNCTIONS   */
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
  };

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
  };

  function speak() {
    const thingToSay = dialog;

    Speech.speak(thingToSay, {
      language: "en",
      pitch: 1,
      rate: 0.8,
    });
  };

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function audioScore(uri, dialog) {
    try {
      const formData = new FormData();
      formData.append("voice", {
        uri,
        type: "audio/wav",
        name: "audio.wav",
      });
      formData.append("dialog", dialog);

      const response = await axios.post(
        "http://192.168.1.9:5000/score/audio",
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
      <View>
        <View style={styles.button_container}>
          <TouchableOpacity
            style={
              recording ? styles.button_recording : styles.button_no_recording
            }
            onPress={recording ? stopRecording : startRecording}
          >
            <Icon name="mic-circle-outline" type="ionicon" color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.button_container}>
          <TouchableOpacity style={styles.button} onPress={speak}>
            <Icon name="ear-outline" type="ionicon" color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  button_container: {
    width: 30,
    marginTop: 10,
    marginBottom: 10,
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
  button_recording: {
    flexDirection: "row",
    height: 35,
    backgroundColor: "#41D84A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 20,
  },
  button_no_recording: {
    flexDirection: "row",
    height: 35,
    backgroundColor: "#F87800",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 20,
  },
});
