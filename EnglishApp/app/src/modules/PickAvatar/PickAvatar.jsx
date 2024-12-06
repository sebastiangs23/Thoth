import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import BottomTab from "../BottomTab/BottomTab";
import BackButton from "../../global/components/BackButton";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";
import { saveAvatarPicked } from "../../common/avatars/functions";
import { avatars } from "../../common/avatars/functions";
import { playAudioNext } from "../../common/audio/functions";
import { useFonts } from "expo-font";

export default function PickAvatar({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Roboto-Italic": require("../../assets/fonts/titles/Roboto-ThinItalic.ttf"), // O la fuente que estés usando
  });

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

  function showAccentInfo() {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "¡Nueva feature!",
      textBody:
        "Nueva funcionabilidad en la próxima versión! 🎉",
      button: "Ok",
      autoClose: 2000,
    });
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <BackButton module={LanguageLevel} navigation={navigation} />

        <Titles title={"Select the IA Tutor you would like to chat with"} />

        <View style={styles.container_card}>
          {avatars &&
            avatars.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => avatarPicked(item)}
                >
                  <View style={styles.row_1}>
                    <Image source={item.img} style={styles.avatar_img} />
                    <Text style={styles.text_name}> {item.name} </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.accent_button}
                    onPress={() => showAccentInfo()}
                  >
                    <Image source={item.flag} style={styles.flag_img} />
                    <Text style={styles.information_button_text}>
                      {item.accent} accent
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <View style={globalStyles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 120,
    padding: 10,
    margin: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  container_card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  row_1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  avatar_img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 5,
  },
  text_name: {
    color: "#18181b",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontStyle: "italic",
    flexShrink: 1,
    maxWidth: 90,
  },
  flag_img: {
    width: 18,
    height: 18,
    borderRadius: 50,
    padding: 5,
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  accent_button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181b",
    borderRadius: 5,
    position: "absolute",
    right: 4,
    bottom: 4,
    padding: 3,
    width: 120,
  },
  information_button_text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
  },
});
