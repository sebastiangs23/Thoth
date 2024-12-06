import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function BottomTab({ navigation }) {
  
  /*________________
  |   FUNCTIONS   */
  function languageLevel() {
    navigation.navigate("Plans");
  }

  function userDashboard() {
    navigation.navigate("UserDashboard");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={languageLevel}>
        <Icon name="rotate-right" type="font-awesome"color="black" size={20} />
        <Text style={styles.tabText}>Select Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={userDashboard}>
        <Icon name="user" type="font-awesome" color="black" size={20} />
        <Text style={styles.tabText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={userDashboard}>
        <Icon name="gear" type="font-awesome" color="black" size={20}  />
        <Text style={styles.tabText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: "#18181b"
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold'
  },
});