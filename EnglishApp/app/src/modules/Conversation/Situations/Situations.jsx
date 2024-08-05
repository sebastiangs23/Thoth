import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../../../components/BackButton";
import Titles from "../../../components/Titles";

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

        <BackButton module={'SpecificTopic'} navigation={navigation} />

        <Titles title={'Select the scenario'} />

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
