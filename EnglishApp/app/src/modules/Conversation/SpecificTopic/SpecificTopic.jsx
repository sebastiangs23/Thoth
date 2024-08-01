import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export default function SpecificTopic() {
  const topics = useSelector((state) => state.topics.value);

  /*____________________________
  |   REQUEST TO THE SERVER   */

  return (
    <View>
      <Text>HERE I WILL NEED TO SELECT A SPECIFIC TOPIC OF A PROFESSION</Text>
      <ScrollView>
        <View style={styles.container_card}></View>
        {topics &&
          topics.map((item) => {
            return (
              <TouchableOpacity key={item.id} style={styles.card}>
                <Text style={styles.text}> {item.description} </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_card: {
    display: "flex",
    flexDirection: "row", // Asegura que los items se coloquen en línea horizontal
    flexWrap: "wrap", // Permite que los items se envuelvan a la línea siguiente si no hay espacio
    justifyContent: "flex-start",
  },
  card: {
    width: 130,
    height: 120,
    padding: 5,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
