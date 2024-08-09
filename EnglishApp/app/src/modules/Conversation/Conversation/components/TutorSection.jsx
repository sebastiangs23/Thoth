import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { globalStyles } from "../../../../global/styles/styles";
import { getAvatarPicked } from "../../../../common/avatars/functions";
import { useDispatch } from "react-redux";
import { deleteAudioUri } from "../../../../store/slices/audioUri/slice";
import { deleteScore } from "../../../../store/slices/score/slice";
import { Icon } from "react-native-elements";

export default function TutorSection({ navigation }) {
  const dispatch = useDispatch();

  const [tutor, setTutor] = useState("");

  useEffect(() => {
    getTutor();
    loadFonts();
  }, []);

  /*________________
    |   FUNCTIONS   */
  async function getTutor() {
    const response = await getAvatarPicked();

    setTutor(response);
  };

  async function loadFonts() {
    await Font.loadAsync({
      "Roboto-Italic": require("../../../../assets/fonts/titles/Roboto-Italic.ttf"),
    });
  };

  function Situation() {
    navigation.navigate("Situation");
    dispatch(deleteScore());
    dispatch(deleteAudioUri());
  };

  return (
    <View style={globalStyles.container_tutor}>
      <TouchableOpacity style={globalStyles.container_back_button}>
        <Icon
          name="arrow-back-outline"
          reverseColor="#000000"
          type="ionicon"
          color="white"
          size={20}
          reverse
          onPress={() => Situation()}
        />
      </TouchableOpacity>

      <Image source={tutor.img} style={globalStyles.img_avatar} />

      <View>
        <Text style={globalStyles.text_bold}> {tutor.name} </Text>

        <View style={globalStyles.container_mini_online}>
          <View style={globalStyles.green_point}></View>
          <Text style={globalStyles.text_cursive}>Online</Text>
        </View>
      </View>
    </View>
  );
};
