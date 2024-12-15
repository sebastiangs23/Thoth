import {
  View,
  TouchableOpacity,
  Pressable,
  Text,
  Vibration,
} from "react-native";
import { useState } from "react";
import { globalStyles } from "../../../../global/styles/styles";

import { Audio } from "expo-av";
import { Icon } from "react-native-elements";

export default function MicrophonePro({ data, getUri }) {
  const [recording, setRecording] = useState(false);

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  /*____________________________
    |   REQUEST TO THE SERVER   */
  async function audioScorePro(uri) {
    try {
      if (uri) {
        console.log("se manda la uri");
        getUri(uri);
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
      Vibration.vibrate(100);

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

      setRecording(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      audioScorePro(uri);
    } catch (error) {
      Message.show({
        type: ALERT_TYPE.DANGER,
        title: ":(",
        textBody:
          "Something unexpected just happened trying to stopRecording in the MicrophonePro.jsx",
        button: "Ok",
        autoClose: 2000,
      });
    }
  }

  return (
    <View style={globalStyles.container_microphone_pro}>
      <View style={globalStyles.container_button_record}>
        <Pressable
          style={
            recording
              ? globalStyles.button_recording_pro
              : globalStyles.button_no_recording_pro
          }
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Icon
            name="mic-circle-outline"
            type="ionicon"
            size={60}
            color={recording ? "#FF5F5F" : "#000000"}
          />
        </Pressable>
      </View>
    </View>
  );
}
