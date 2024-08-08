import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import BottomTab from "../BottomTab/BottomTab";
import BackButton from "../../global/components/BackButton";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";

import { saveAvatarPicked } from "../../common/avatars/functions";
import { avatars } from "../../common/avatars/functions";
import { playAudioNext } from "../../common/audio/functions";
import { Icon } from "react-native-elements";

export default function PickAvatar({ navigation }) {
  /*_____________________________
    |   REQUEST TO THE SERVER   */
  async function avatarPicked(avatar) {
    try {

      saveAvatarPicked(avatar);
      playAudioNext();
      navigation.navigate("Areas");

    } catch (error) {
      console.log(error);
    }
  }

  /*________________
    |   FUNCTIONS   */
  function LanguageLevel() {
    navigation.navigate("LanguageLevel");
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView>

        <BackButton module={LanguageLevel} navigation={navigation} />
        
        <Titles title={'Select the IA Tutor you would like to chat with'} />

        <View style={styles.container_card}>
          {avatars &&
            avatars.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.container_avatar_img}
                  onPress={() => avatarPicked(item)}
                >
                  <Image source={item.img} style={styles.avatar_img} />
                  <Text style={styles.text_name}> {item.name} </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <View style={styles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_card: {
    display: "flex",
    flexDirection: "row", // Asegura que los items se coloquen en línea horizontal
    flexWrap: "wrap", // Permite que los items se envuelvan a la línea siguiente si no hay espacio
    justifyContent: "center",
    alignItems: "center",
  },
  container_avatar_img: {
    width: 160,
    maxHeight: 150,
    padding: 15,
    margin: 7,
    backgroundColor: "#3790F5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar_img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 5,
  },
  text_name: {
    color: "#fff",
    fontWeight: "bold",
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
