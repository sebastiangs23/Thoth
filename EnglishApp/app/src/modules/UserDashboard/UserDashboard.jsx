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

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

import { Icon } from "react-native-elements";
import { getUserSession, removeUserSession } from "../../common/user/functions";

export default function UserDashboard({ navigation }) {
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

    console.log('here the average: ', response.data);
    setAverage(response.data);
  }

  /*________________
  |   FUNCTIONS   */

  function logOut() {
    removeUserSession();
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subcontainer}>
        <View>
          <Text>Hello : {user ? user.name + " " + user.last_name : ""}</Text>
        </View>

        <Text>HERE IS WHERE THE STATISTICS ARE GOING TO BE xd</Text>
        <Text>Statistics</Text>
        <Icon name="bar-chart-outline" type="ionicon" />
        <Text>En que es mejor</Text>
        <Icon name="pie-chart-outline" type="ionicon" />
        <Text>Days</Text>
        <Icon name="today-outline" type="ionicon" />
        <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={300} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#18181b",
      backgroundGradientTo: "#18181b",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffffff"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

        <View>
          <Text>New features coming soon</Text>
          <Icon name="gift" type="font-awesome" />
        </View>

        <TouchableOpacity>
          <Text>Log out</Text>
          <Icon name="power-off" type="font-awesome" reverse onPress={logOut} />
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
});
