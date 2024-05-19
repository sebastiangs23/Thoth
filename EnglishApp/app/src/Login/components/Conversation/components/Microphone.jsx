import { View, Text, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default function Microphone() {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");//Libera memoria innecesaria para que la aplicación no sea mas pesada para el user
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  /*___________________________
    |   REQUEST TO THE SERVER   */
  async function startRecording() {
    try {
      if (permissionResponse.status != "granted") {
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
      console.log("An error ocurred while trying to start recording");
      console.log(error);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
        
      setAudioUri(uri)
      setRecording(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

    } catch (error) {
      console.log("An error ocurred while trying to stop recording");
      console.log(error);
    }
  }

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  return (
    <View styles={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play audio" onPress={playAudio} />
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
