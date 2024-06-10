import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { getUserSession } from "../../common/user/functions";
import { avatars } from "../../common/avatars/functions";
import { playAudioNext } from "../../common/audio/functions";

export default function PickAvatar({ navigation }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

  /*_____________________________
    |   REQUEST TO THE SERVER   */
    async function avatarPicked(source){
        try{
            let data = {
                id_user: user.id,
                avatar: source
            };
            
            const response = await axios.put('http://192.168.1.10:5000/users/update-avatar', data);
            playAudioNext();
            navigation.navigate("RandomConversation");

        }catch(error){
            console.log(error);
        }
    }

    async function getUser(){
        try{
            const response = await getUserSession();
            setUser(response);

        }catch(error){
            console.log(error)
        }
    }

  return (
    <View>
      <View style={styles.title_container}>
        <Text style={styles.title}>Select your avatar</Text>
      </View>

      <View style={styles.container_card}>
        {avatars &&
          avatars.map((item, index) => {
            return (
              <TouchableOpacity style={styles.container_avatar_img} onPress={() => avatarPicked(item)} >
                <Image source={item} style={styles.avatar_img} />
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
  container_avatar_img: {
    padding: 20,
    margin: 10,
    backgroundColor: "#F87800",
    borderRadius: 100,
  },
  avatar_img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 5,
  },
});
