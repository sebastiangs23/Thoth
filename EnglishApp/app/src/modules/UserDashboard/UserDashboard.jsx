import axios from "axios";
import { useEffect, useState } from "react";
import BottomTab from "../BottomTab/BottomTab";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useFonts } from "expo-font";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import { getUserSession, removeUserSession } from "../../common/user/functions";

export default function UserDashboard({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Inter-Regular": require("../../assets/fonts/titles/Inter_18pt-Regular.ttf"), // O la fuente que estés usando
  });
  const [user, setUser] = useState(null);
  const [average, setAverage] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function getUser() {
    const response = await getUserSession();

    setUser(response);
    await getStatistics(response.id);
  }

  async function getStatistics(id_user) {
    const response = await axios.get(
      `${api}/score/get-user-score-average/${id_user}`
    );

    console.log("here the average: ", response.data);
    setAverage(response.data);
  }

  /*________________
  |   FUNCTIONS   */
  function logOut() {
    removeUserSession();
    navigation.navigate("Login");
  }

  const [chartVisible, setChartVisible] = useState(false);

  // Función para alternar la visibilidad del gráfico
  const toggleChart = () => {
    setChartVisible(!chartVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subcontainer}>
        <View style={styles.name_container}>
          <Icon
            name="paw"
            type="font-awesome"
            reverse
            color="#fff"
            reverseColor="#18181b"
            size={13}
          />
          <Text style={styles.name_user}>
            {user ? user.name + " " + user.last_name : ""}
          </Text>
        </View>

        <View style={styles.line} />

        <View>
          <TouchableOpacity
            style={styles.button_container}
            onPress={toggleChart}
          >
            <Icon
              name="bar-chart-outline"
              type="ionicon"
              reverse
              color="#fff"
              reverseColor="#18181b"
              size={13}
            />
            <Text style={styles.button_text}>Statistics</Text>
            <View style={styles.caret_container}>
              <Icon
                name={chartVisible ? "caret-up" : "caret-down"} // Cambia el ícono según el estado
                type="font-awesome"
                reverse
                color="#18181b"
                reverseColor="#fff"
                size={13}
              />
            </View>
          </TouchableOpacity>

          {chartVisible && (
            <View style={styles.line_chart_container}>
              <LineChart
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={270}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#18181b",
                  backgroundGradientFrom: "#18181b",
                  backgroundGradientTo: "#18181b",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 10,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffffff",
                  },
                }}
                bezier
                style={{
                  borderRadius: 10,
                }}
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button_container}>
          <Icon
            name="pie-chart-outline"
            type="ionicon"
            reverse
            color="#fff"
            reverseColor="#18181b"
            size={13}
          />
          <Text style={styles.button_text}>Best skill</Text>
          <View style={styles.caret_container}>
            <Icon
              name="caret-down"
              type="font-awesome"
              reverse
              color="#18181b"
              reverseColor="#fff"
              size={13}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_container}>
          <Icon
            name="today-outline"
            type="ionicon"
            reverse
            color="#fff"
            reverseColor="#18181b"
            size={13}
          />
          <Text style={styles.button_text}>Days</Text>
          <View style={styles.caret_container}>
            <Icon
              name="caret-down"
              type="font-awesome"
              reverse
              color="#18181b"
              reverseColor="#fff"
              size={13}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_container}>
          <Icon
            name="gift"
            type="font-awesome"
            reverse
            color="#fff"
            reverseColor="#18181b"
            size={13}
          />
          <Text style={styles.button_text}>New features coming soon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_container}>
          <Icon
            name="power-off"
            color="#fff"
            reverseColor="#18181b"
            type="font-awesome"
            reverse
            size={13}
            onPress={() => logOut()}
          />
          <Text style={styles.button_text}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.container_bottom_tab}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  subcontainer: {
    marginBottom: 60,
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  name_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 3,
    paddingRight: 10,
    margin: 15,
    width: 320,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  name_user: {
    color: "#18181b",
    fontSize: 16,
    fontFamily: "Inter-Regular",
    fontWeight: "bold",
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181b",
    borderRadius: 5,
    padding: 3,
    paddingRight: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 18,
    width: 320,
  },
  button_text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: 90,
  },
  line_chart_container: {
    marginLeft: 15,
    backgroundColor: "#18181b",
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: 290,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 20,
  },
  caret_container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
