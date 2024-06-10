import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
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
      navigation.navigate("TopicConversation");

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
    <View style={styles.pick_avatar_container}>
      <TouchableOpacity style={styles.container_back_button}>
        <Icon
          name="arrow-back-outline"
          reverseColor="#000000"
          type="ionicon"
          color="white"
          size={20}
          reverse
          onPress={LanguageLevel}
        />
      </TouchableOpacity>

      <View style={styles.title_container}>
        <Text style={styles.title}>Select the IA you would like to talk to</Text>
      </View>

      <View style={styles.container_card}>
        {avatars &&
          avatars.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.container_avatar_img}
                onPress={() => avatarPicked(item)}
              >
                <Image source={item} style={styles.avatar_img} />
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pick_avatar_container: {
    alignItems: "center",
  },
  container_back_button: {
    alignSelf: "flex-start",
    margin: 8,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: 45,
    fontWeight: "bold",
    color: "#000000",
  },
  container_card: {
    display: "flex",
    flexDirection: "row", // Asegura que los items se coloquen en línea horizontal
    flexWrap: "wrap", // Permite que los items se envuelvan a la línea siguiente si no hay espacio
    justifyContent: "flex-start",
  },
  container_avatar_img: {
    padding: 20,
    margin: 10,
    backgroundColor: "#3790F5",
    borderRadius: 100,
  },
  avatar_img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 5,
  },
});
