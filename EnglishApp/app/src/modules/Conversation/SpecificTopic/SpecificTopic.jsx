import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "../../../store/slices/dialog/slice";
import BottomTab from "../../BottomTab/BottomTab";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";

export default function SpecificTopic({ navigation }) {
  const topics = useSelector((state) => state.topics.value);

  const dispatch = useDispatch();

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function getDialogs(id) {
    const response = await axios.get(`${api}/conversation/get-dialogs/${id}`);

    dispatch(setDialog(response.data));
    Conversation();
  }

  /*________________
  |   FUNCTIONS   */
  function Conversation() {
    navigation.navigate("Conversation");
  }

  function Areas(){
    navigation.navigate("Areas");
  }

  return (
    <View style={styles.specifictopic_container}>
      <ScrollView style={styles.subcontainer} >
        <View style={styles.container_back_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            size={20}
            reverse
            onPress={Areas}
          />
        </View>

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
                  onPress={() => getDialogs(item.id)}
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
    marginBottom: 60
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
