import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "../../../store/slices/dialog/slice";
import { setChosenTopic } from "../../../store/slices/chosenTopic/slice";
import BottomTab from "../../BottomTab/BottomTab";
import BackButton from "../../../components/BackButton";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import { getUserSession } from "../../../common/user/functions";

export default function SpecificTopic({ navigation }) {
  const topics = useSelector((state) => state.topics.value);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function getDialogs(topic) {
    const response = await axios.get(
      `${api}/conversation/get-dialogs/${topic.id}/${user.id_language_level} `
    );

    dispatch(setChosenTopic(topic.description));
    dispatch(setDialog(response.data));
    Situation();
  };

  async function getUser() {
    const response = await getUserSession();
    setUser(response);
  };

  /*________________
  |   FUNCTIONS   */
  function Situation() {
    //navigation.navigate("ChatGptConversation");
    navigation.navigate("Situation");
  }

  function Areas() {
    navigation.navigate("Areas");
  }

  return (
    <View style={styles.specifictopic_container}>
      <ScrollView style={styles.subcontainer}>

        <BackButton module={'Areas'} navigation={navigation} />

        <View style={styles.title_container}>
          <Text style={styles.title}>
            Select a topic you would like to talk
          </Text>
        </View>

        <View style={styles.container_card}>
          {topics &&
            topics.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => getDialogs(item)}
                >
                  <Text style={styles.text}> {item.description} </Text>
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
  specifictopic_container: {
    flex: 1,
    position: "relative",
  },
  subcontainer: {
    marginBottom: 60,
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
