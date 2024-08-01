import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function BottomTab({ navigation }) {
  /*________________
  |   FUNCTIONS   */
  function languageLevel() {
    navigation.navigate("LanguageLevel");
  }

  function userDashboard() {
    navigation.navigate("UserDashboard");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={languageLevel}>
        <Icon name="home-outline" type="ionicon"color="black" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={userDashboard}>
        <Icon name="person-circle-outline" type="ionicon" color="blue" />
        <Text style={styles.tabText}>Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: 'black',
  },
});