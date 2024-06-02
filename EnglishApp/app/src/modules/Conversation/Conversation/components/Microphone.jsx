import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setScore } from "../../../../store/slices/score/slice";
import { Audio } from "expo-av";
import { playAudio } from "../../../../common/functions/functions";
import axios from "axios";

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
      <Button
        title={recording ? "Stop Recording" : "Start recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {audioUri && <Button title="Play audio" onPress={() => playAudio(audioUri)} />}
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
});