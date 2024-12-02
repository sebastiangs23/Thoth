import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../../../global/components/BackButton";
import Titles from "../../../global/components/Titles";
import BottomTab from "../../BottomTab/BottomTab";
import { globalStyles } from "../../../global/styles/styles";
import { getPlanSaved } from "../../../common/plan/functions";

import { useDispatch, useSelector } from "react-redux";
import { setSituation } from "../../../store/slices/situation/slice";
import { Icon } from "react-native-elements";
import { getUserSession } from "../../../common/user/functions";
import { setDialog } from "../../../store/slices/dialog/slice";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

export default function Situation({ navigation }) {
  const dispatch = useDispatch();

  const topics = useSelector((state) => state.topics.value);
  const chosenTopic = useSelector((state) => state.chosenTopic.value);

  const [user, setUser] = useState({});
  const [situations, setSituations] = useState([]);

  useEffect(() => {
    getUser()
    getSituations();
  }, []);

  /*____________________________
    |   REQUEST TO THE SERVER   */
  async function getSituations() {
    try {
      const id_area = topics[0].id_area;

      const response = await axios.get(
        `${api}/conversation/situations/${id_area}`
      );
      setSituations(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
  |   FUNCTIONS   */
  function ChatGptConversation() {
    navigation.navigate("ChatGptConversation");
  }

  function NormalConversation() {
    navigation.navigate("Conversation");
  }

  async function selectSituation(situation) {
    try {
      dispatch(setSituation(situation.description));
      const plan = await getPlanSaved();

      if (plan === 1) {
        const response = await axios.get(
          `${api}/conversation/get-dialogs/${chosenTopic.id}/${situation.id}/${user.id_language_level} `
        );
        dispatch(setDialog(response.data));
        NormalConversation();
      } else if (plan === 2) {
        ChatGptConversation();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    const response = await getUserSession();
    setUser(response);
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <BackButton module={"SpecificTopic"} navigation={navigation} />

        <Titles title={"Select the scenario"} />

        <View style={globalStyles.container_card}>
          {situations &&
            situations.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={globalStyles.card_high}
                  onPress={() => selectSituation(item)}
                >
                  <Text style={globalStyles.text_semi_small}>
                    {item.description}
                  </Text>
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
