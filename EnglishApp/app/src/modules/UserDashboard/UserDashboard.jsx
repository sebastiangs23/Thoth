import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useEffect } from "react";

export default function UserDashboard({}) {
  /*________________
  |   FUNCTIONS   */

  return (
    <View>
      <View>
        <Text>Hello : Name</Text>
      </View>

      <Text>HERE IS WHERE THE STATISTICS ARE GOING TO BE xd</Text>
      <Text>Statistics</Text>
      <Icon name="bar-chart-outline" type="ionicon" />
      <Icon name="pie-chart-outline" type="ionicon" />
      <View>
        <Icon name="gift" type="font-awesome" />
        <Text>New features coming soon</Text>
      </View>

      <Text>Days</Text>
    </View>
  );
}
