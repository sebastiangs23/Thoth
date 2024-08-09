import { View, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";

import { globalStyles } from "../../../../global/styles/styles";
import { Icon } from "react-native-elements";

export default function PlayAudio({ dialog }) {

  /*_______________
  |   FUNCTIONS  */
  function hear() {
    Speech.speak(dialog, {
      language: "en",
      pitch: 1,
      rate: 0.8,
    });
  }

  return (
    <View style={globalStyles.button_hear_container}>
      <TouchableOpacity style={globalStyles.hear_button} onPress={hear}>
        <Icon name="play" type="font-awesome" size={20} />
      </TouchableOpacity>
    </View>
  );
};
