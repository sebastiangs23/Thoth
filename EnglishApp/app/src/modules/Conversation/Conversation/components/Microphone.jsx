import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { setScore } from "../../../../store/slices/score/slice";
import { Audio } from "expo-av";
import { playAudio } from "../../../../common/functions/functions";

export default function Microphone({ dialog, id_conversation }) {
  const dispatch = useDispatch();

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);

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

      setAudioUri(uri);
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
        "http://192.168.1.10:5000/score/audio",
        //'http://192.168.1.10:5001/api/cosmo-ai/score/audio',
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
      {/* <Button
        title={recording ? "Stop Recording" : "Start recording"}
        onPress={recording ? stopRecording : startRecording}
      /> */}

      <View style={styles.button_container}>
        <TouchableOpacity
          style={recording ?  styles.button_recording : styles.button_no_recording}
          onPress={recording ? stopRecording : startRecording}
        >
          <Icon name="mic-circle-outline" type="ionicon" color="white" />
        </TouchableOpacity>
      </View>

      {audioUri && (
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => playAudio(audioUri)}
          >
            <Icon name="ear-outline" type="ionicon" color="white" />
          </TouchableOpacity>
        </View>
      )}
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
  }
});
