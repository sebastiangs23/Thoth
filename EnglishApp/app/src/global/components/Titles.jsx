import { View, Text, StyleSheet } from "react-native";

export default function Titles({ title }) {
  return (
    <View style={styles.title_container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: "#18181b",
  },
});
