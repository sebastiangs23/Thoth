import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function LanguageLevel({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [languageLevels, setLanguageLevels] = useState([]);

  useEffect(() => {
    getLanguageLevels();
  }, []);

  /*________________________________________
  |   REQUEST TO SERVER (GLOBAL STATES)   */
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

  async function updateUserLanguageLevel(id_language_level){
    try{
      let data = {
        id_user: user.id,
        id_language_level
      };

      const response = await axios.put('http://192.168.1.12:5000/users/update-level-language', data);

      if(response.data.status == 'Successfull'){
        navigation.navigate("RandomConversation");
      }else {
        //notification that somethings goes wrong
      }

    }catch(error){
      console.log(error)
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
              <TouchableOpacity key={item.id} style={styles.button} onPress={() => updateUserLanguageLevel(item.id)}>
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
