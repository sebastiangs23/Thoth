import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function Microphone({ dialog, id_conversation }) {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
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
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);
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
      {audioUri && <Button title="Play audio" onPress={playAudio} />}
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
