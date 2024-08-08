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
import BackButton from "../../../global/components/BackButton";
import Titles from "../../../global/components/Titles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTopics } from "../../../store/slices/specificTopics/slice";
import { globalStyles } from "../../../global/styles/styles";

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
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>

        <BackButton module={'PickAvatar'} navigation={navigation} />

        <Titles title={'Select a profession you would like to chat about'} />

        <View style={globalStyles.container_card}>
          {areas &&
            areas.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={globalStyles.card_high}
                  onPress={() => selectArea(item.id)}
                >
                  <Text style={globalStyles.text_semi_small}> {item.description} </Text>
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
};
