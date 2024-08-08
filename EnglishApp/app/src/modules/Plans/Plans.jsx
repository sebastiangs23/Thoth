import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BottomTab from "../BottomTab/BottomTab";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";

import { Icon } from "react-native-elements";

export default function Plans({ navigation }) {
  /*________________
    |   FUNCTIONS   */
  async function LanguageLevel(type) {
    console.log(type);
    navigation.navigate("LanguageLevel");
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <Titles title={"Select the mode"} />

        <TouchableOpacity
          onPress={() => LanguageLevel("normal")}
          style={styles.card}
        >
          {/*
        <Icon name="star" type="font-awesome" color="white"/> */}
          <Icon name="star-outline" type="ionicon" color="white" />
          <Text style={styles.text_medium}>Normal</Text>
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
          <Text style={styles.text_medium}>Pro</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  text_medium: {
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
