import { View, TouchableOpacity, Pressable, Text, Vibration } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../../../global/styles/styles";

import { Audio } from "expo-av";
import { Icon } from "react-native-elements";

export default function MicrophonePro({data, getUri }) {
  const [recording, setRecording] = useState(false);
  
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  /*____________________________
    |   REQUEST TO THE SERVER   */
  async function audioScorePro(uri) {
    try {

      if(uri){
        console.log('se manda la uri');
        getUri(uri)
      }
      
      // const formData = new FormData();
      // console.log("dataaaaa", data);

      // formData.append("id_user", data.id_user);
      // // formData.append("id_plan", idPlan);
      // formData.append("id_language_level", data.id_language_level);
      // formData.append("voice", {
      //   uri,
      //   type: "audio/wav",
      //   name: "audio.wav",
      // });

      // const response = await axios.post(
      //   `${api}/score/chat-gpt/audio`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

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
    <View style={globalStyles.container_microphone}>
      <View style={globalStyles.container_button_record}>
        <TouchableOpacity
          style={
            recording
              ? globalStyles.button_recording
              : globalStyles.button_no_recording
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
    </View>
  );
}
