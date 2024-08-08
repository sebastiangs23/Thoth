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
import BackButton from "../../../global/components/BackButton";
import Titles from "../../../global/components/Titles";
import { globalStyles } from "../../../global/styles/styles";

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

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>

        <BackButton module={'Areas'} navigation={navigation} />

        <Titles title={'Select a topic you would like to talk'} />

        <View style={globalStyles.container_card}>
          {topics &&
            topics.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={globalStyles.card}
                  onPress={() => getDialogs(item)}
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