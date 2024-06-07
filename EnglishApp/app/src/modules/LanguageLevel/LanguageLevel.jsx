import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LanguageLevel() {
  const [languageLevels, setLanguageLevels] = useState([]);

  useEffect(() => {
    getLanguageLevels();
  }, []);

  /*________________
    |   FUNCTIONS   */
  async function getLanguageLevels() {
    try {
      const response = await axios.get(
        "http://192.168.1.12:5000/languages/get-languages-levels"
      );

      setLanguageLevels(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View style={styles.title_container}>
        <Text style={styles.title}>PICK THE LEVEL THAT U THINK U ARE</Text>
      </View>

      <View style={styles.container_card}>
        {languageLevels &&
          languageLevels.map((item) => {
            return (
              <TouchableOpacity key={item.id} style={styles.button}>
                <Text style={styles.text}> {item.level} </Text>
              </TouchableOpacity>
            );
          })}
      </View>
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
    fontSize: 45,
    fontWeight: "bold",
    color: "#000000",
  },
  container_card: {
    display: "flex",
    flexDirection: "row", // Asegura que los items se coloquen en línea horizontal
    flexWrap: "wrap", // Permite que los items se envuelvan a la línea siguiente si no hay espacio
    justifyContent: "flex-start",
  },
  button: {
    width: 100,
    height: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "#F87800",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
