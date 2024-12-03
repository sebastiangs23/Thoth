import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import BottomTab from "../BottomTab/BottomTab";
import Titles from "../../global/components/Titles";
import { globalStyles } from "../../global/styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { savePlanSelected } from "../../common/plan/functions";

import normalPlan from "../../assets/images/normal_plan.png";
import proPlan from "../../assets/images/pro_plan.png";

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
      console.log("aca los planes", response.data);

      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
    |   FUNCTIONS   */
  function redirect(type) {
    savePlanSelected(type);

    navigation.navigate("LanguageLevel");
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <View style={globalStyles.title_container}>
          <Titles title={"Select the mode"} />
        </View>

        <View style={styles.container_card}>
          {plans.length > 1 ? (
            <TouchableOpacity
              style={styles.card}
              onPress={() => redirect(plans[0].id)}
            >
              <Text style={styles.text_medium}>
                {plans[0].name} ${plans[0].price_usd}
              </Text>
              <Icon
                name={plans[0].icon_name}
                type={plans[0].icon_type}
                color="black"
                size={30}
              />
              
              <Image source={proPlan} style={styles.pro_plan_img} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.container}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.container_card}>
          {plans.length > 1 ? (
            <TouchableOpacity
              style={styles.card}
              onPress={() => redirect(plans[0].id)}
            >
              <Text style={styles.text_medium}>
                {plans[1].name} ${plans[1].price_usd}
              </Text>
              <Icon
                name={plans[1].icon_name}
                type={plans[1].icon_type}
                color="black"
                size={30}
              />
              
              <Image source={normalPlan} style={styles.normal_plan_img} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>

      <View style={globalStyles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card_container: {
    borderWidth: 1,
  },
  normal_plan_img: {
    width: 220,
    height: 120,
  },
  text_medium: {
    fontSize: 16,
    color: "#18181b",
    fontWeight: "bold",
  },
  pro_plan_img: {
    width: 220,
    height: 120,
  },
  card: {
    width: 330,
    height: 200,
    padding: 10,
    margin: 10,
    display: 'flex',
    // flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#18181b",
    borderWidth: 4,
    borderRadius: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#888",
  },
});
