import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import BottomTab from "../BottomTab/BottomTab";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;
import { Icon } from "react-native-elements";

export default function Plans({ navigation }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getPlans();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function getPlans() {
    try {
      const response = await axios.get(`${api}/plans`);

      setPlans(response.data);
      console.log("los planes locos: ", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
    |   FUNCTIONS   */
  function redirect(type){
    //Aca redireccionara dependiendo del plan que tenga
    console.log('type--->', type);
    navigation.navigate("LanguageLevel");
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <Titles title={"Select the mode"} />

        <View style={globalStyles.container_card}>
          {plans &&
            plans.map((item) => {
              return (
                <TouchableOpacity style={globalStyles.card} onPress={() => redirect(item.id)} >
                  <Icon
                    name={item.icon_name}
                    type={item.icon_type}
                    color="white"
                    size={30}
                  />
                  <Text style={globalStyles.text_medium}>{item.name} ${item.price_usd} </Text>
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