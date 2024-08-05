import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setSituation } from "../../../store/slices/situation/slice";
import { Icon } from "react-native-elements";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

export default function Situation({ navigation }) {
  const dispatch = useDispatch();

  const [situations, setSituations] = useState([]);

  useEffect(() => {
    getSituations();
  }, []);

  /*____________________________
    |   REQUEST TO THE SERVER   */
  async function getSituations() {
    try {
      const response = await axios.get(`${api}/conversation/situations`);

      setSituations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*________________
  |   FUNCTIONS   */
  function SpecificTopic() {
    navigation.navigate('SpecificTopic');
  }

  function ChatGptConversation(){
    navigation.navigate('ChatGptConversation');
  }

  function selectSituation(situation){
    dispatch(setSituation(situation.description));
    ChatGptConversation();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container_back_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            size={20}
            reverse
            onPress={SpecificTopic}
          />
        </View>

        <View style={styles.title_container}>
          <Text style={styles.title}>Select the scenario</Text>
        </View>

        <View style={styles.container_card}>
          {situations &&
            situations.map((item) => {
              return (
                <TouchableOpacity key={item.id} style={styles.card} onPress={() => selectSituation(item)}>
                  <Text style={styles.text}>{item.description}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  specifictopic_container: {
    flex: 1,
    position: "relative",
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
});
