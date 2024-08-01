import { useEffect } from "react";
import BottomTab from "../BottomTab/BottomTab";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Icon } from "react-native-elements";
import { removeUserSession } from "../../common/user/functions";

export default function UserDashboard({ navigation }) {
  /*________________
  |   FUNCTIONS   */
  function logOut() {
    removeUserSession();
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container} > 
      <ScrollView style={styles.subcontainer}>
        <View>
          <Text>Hello : Name</Text>
        </View>

        <Text>HERE IS WHERE THE STATISTICS ARE GOING TO BE xd</Text>
        <Text>Statistics</Text>
        <Icon name="bar-chart-outline" type="ionicon" />
        <Text>En que es mejor</Text>
        <Icon name="pie-chart-outline" type="ionicon" />
        <Text>Days</Text>
        <Icon name="today-outline" type="ionicon" />

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
