import { View, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../../global/styles/styles.jsx";
import { Audio } from "expo-av";
import { ALERT_TYPE, Dialog as Message, Toast } from "react-native-alert-notification";
import Bar from "../components/Bar.jsx";

import { Icon } from "react-native-elements";

export default function Score() {

  const score = useSelector((state) => state.score.value);
  const audioUri = useSelector((state) => state.audioUri.value);

  /*________________
  |   FUNCTIONS   */
  async function playAudio() {
    if (audioUri != "") {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Wait",
        textBody:
          "You have to record an audio firts to be able to listen to it",
        autoClose: 2000,
      });
    }
  }

  return (
    <View style={globalStyles.container_score_board}>
      
      <TouchableOpacity onPress={playAudio} style={globalStyles.own_audio}>
        <Text style={globalStyles.own_audio_text} >Your audio</Text>
        <Icon
          name="ear-outline"
          reverseColor="#ffffff"
          type="ionicon"
          color="white"
          size={20}
        />
      </TouchableOpacity>

      {score.pronunciation_level && (
        <View>
          <View>
            <Bar
              type={"Acurracy"}
              porcentaje={score.pronunciation_level[0].accuracy_score}
              icon_name={"crosshairs"}
              icon_type={"font-awesome"}
            />

            <Bar
              type={"Completeness"}
              porcentaje={score.pronunciation_level[0].completeness_score}
              icon_name={"check"}
              icon_type={"font-awesome"}
            />

            <Bar
              type={"Fluency"}
              porcentaje={score.pronunciation_level[0].fluency_score}
              icon_name={"air"}
              icon_type={"material"}
            />

            <Bar
              type={"Pronunciation"}
              porcentaje={score.pronunciation_level[0].pronunciation_score}
              icon_name={"laugh-wink"}
              icon_type={"font-awesome-5"}
            />
          </View>
        </View>
      )}
    </View>
  )
};
