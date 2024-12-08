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
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

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

  function showDetails(name, description) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: name,
      textBody: description,
      autoClose: 12000,
      theme: 'dark', //no funciona :s
    });
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.subcontainer}>
        <View style={globalStyles.title_container}>
          <Titles title={"Select the mode"} />
        </View>

        {/* PLAN NORMAL */}
        <View style={styles.container_card}>
          {plans.length > 1 ? (
            <TouchableOpacity
              style={styles.card}
              onPress={() => redirect(plans[0].id)}
            >
              <View style={styles.container_plan_name_price}>
                <View style={styles.container_plan_name}>
                  <Icon
                    name={plans[0].icon_name}
                    type={plans[0].icon_type}
                    color="black"
                    size={20}
                  />
                  <Text style={styles.text_medium}>{plans[0].name}</Text>
                </View>

                <View>
                  <Text style={styles.text_medium_price}>
                    ${plans[0].price_usd}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.information_button}
                onPress={() => showDetails(plans[0].name, plans[0].description)}
              >
                <Text style={styles.information_button_text}>Details</Text>
              </TouchableOpacity>

              <Image source={normalPlan} style={styles.normal_plan_img} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* PLAN PRO */}
        <View style={styles.container_card}>
          {plans.length > 1 ? (
            <TouchableOpacity
              style={styles.card}
              onPress={() => redirect(plans[1].id)}
            >
              <View style={styles.container_plan_name_price}>
                <View style={styles.container_plan_name}>
                  <Icon
                    name={plans[1].icon_name}
                    type={plans[1].icon_type}
                    color="black"
                    size={20}
                  />
                  <Text style={styles.text_medium}>{plans[1].name}</Text>
                </View>

                <View>
                  <Text style={styles.text_medium_price}>
                    ${plans[1].price_usd}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.information_button}
                onPress={() => showDetails(plans[1].name, plans[1].description)}
              >
                <Text style={styles.information_button_text}>Details</Text>
              </TouchableOpacity>
              <Image source={proPlan} style={styles.pro_plan_img} />
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
  container_plan_name_price: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
  },
  container_plan_name: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text_medium: {
    fontSize: 16,
    color: "#18181b",
    fontWeight: "bold",
  },
  text_medium_price: {
    color: "#18181b",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontStyle: "italic",
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
    display: "flex",
    // flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#18181b",
    borderWidth: 4,
    borderRadius: 10,
  },
  divider: {
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
  information_button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181b",
    borderRadius: 5,
    position: "absolute",
    right: 4,
    bottom: 4,
    elevation: 5, // Para Android
    zIndex: 10,
  },
  information_button_text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    padding: 5,
    elevation: 5,
  },
});
