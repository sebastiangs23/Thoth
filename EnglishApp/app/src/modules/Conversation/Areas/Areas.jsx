import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import BottomTab from "../../BottomTab/BottomTab";
import BackButton from "../../../components/BackButton";
import Titles from "../../../components/Titles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTopics } from "../../../store/slices/specificTopics/slice";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import { playAudioNext } from "../../../common/audio/functions";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";


export default function Areas({ navigation }) {
  const dispatch = useDispatch();

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAreas();
  }, []);

  /*__________________________
  |   REQUEST TO THE SERVER   */
  async function getAreas() {
    try {
      const response = await axios.get(`${api}/conversation/get-areas`);

      setAreas(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  async function selectArea(id) {
    try {
      const response = await axios.get(
        `${api}/conversation/get-specific-topics/${id}`
      );

      dispatch(setTopics(response.data));
      playAudioNext();
      specificTopic();

    } catch (error) {
      console.log(error.message);
      //X
    }
  }

  /*________________
  |   FUNCTIONS   */
  function specificTopic(){
    navigation.navigate("SpecificTopic");
  }

  return (
    <View style={styles.topicConversation_container}>
      <ScrollView style={styles.subcontainer}>

        <BackButton module={'PickAvatar'} navigation={navigation} />

        <Titles title={'Select a profession you would like to chat about'} />

        <View style={styles.container_card}>
          {areas &&
            areas.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => selectArea(item.id)}
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
  topicConversation_container: {
    flex: 1,
    position: "relative",
  },
  subcontainer: {
    marginBottom: 60,
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
