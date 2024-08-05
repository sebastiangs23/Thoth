import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import Titles from "../../components/Titles";

import { Icon } from "react-native-elements";

export default function Plans({ navigation }) {
  /*________________
    |   FUNCTIONS   */
  async function LanguageLevel(type) {
    console.log(type);
    navigation.navigate("LanguageLevel");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Titles title={"Select the mode"} />

        <TouchableOpacity
          onPress={() => LanguageLevel("normal")}
          style={styles.card}
        >
          {/*
        <Icon name="star" type="font-awesome" color="white"/> */}
          <Icon name="star-outline" type="ionicon" color="white" />
          <Text style={styles.text}>Normal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => LanguageLevel("pro")}
          style={styles.card}
        >
          <Icon
            name="shield-checkmark-outline"
            type="ionicon"
            color="white"
            size={30}
          />
          <Text style={styles.text}>Pro</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  card: {
    width: 130,
    height: 120,
    padding: 5,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
