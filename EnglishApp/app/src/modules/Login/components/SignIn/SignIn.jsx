import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/slices/user/slice";
import { saveUserSession } from "../../../../common/user/functions";
import { playAudioNext } from "../../../../common/audio/functions";
import image from "../../../../assets/images/sign-in-top-icon-color.png";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function sendUserData() {
    try {
      console.log('1 ' , email , ' 2 ', password);

      if(!email || !password){
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Warning',
          textBody: 'The email or password cannot be empty.',
          button: 'close'
        });
        return;
      };

      let data = { email: email, password: password };

      let response = await axios.get(
        "http://192.168.1.10:5000/login/login-user",
        { params: data }
      );

      switch (response.data.status){
        case 'Successful' : {
          //Llenare ala persona en el estado global redux y en AsyncStorage
          dispatch(setUser(response.data.user));
          saveUserSession(response.data.user);

          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: response.data.message,
            textBody: 'Its good to see you again',
            button: 'Ok',
            autoClose: 100
          })

          if(response.data.user.id_user_type == 2){
            playAudioNext();
            //randomConversation();
            LanguageLevel();
            break;
          }else if(response.data.user.id_user_type == 1){
            //DASHBOARD ADMIN
          }else {
            //COMPONENTE DE RUTA NO ESPECIFICADA
          }

          break;
        }
        case 'Unauthorized': {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: response.data.message,
            textBody: 'The fuck are you doing here',
            button: 'close'
          })
          break;
        }

        case 'WrongPassword': {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Password incorrect',
            textBody: response.data.message,
            button: 'close'
          })
          break;
        }
        default : {
          break;
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  /*________________
  |   FUNCTIONS   */
  function LanguageLevel(){
    navigation.navigate("LanguageLevel");
  }

  function logIn() {
    navigation.navigate("Login");
  }

  function passwordVisible(boolean){
    setEyeOpen(boolean);
    setSecurePassword(!boolean);
  }


  return (
    <KeyboardAvoidingView style={styles.sign_in_container}>

      <View style={styles.container_back_button} >
        <Icon
          name="arrow-back-outline"
          reverseColor="#000000"
          type="ionicon"
          color="white"
          size={20}
          reverse
          style={styles.back_button}
          onPress={logIn}
        />
      </View>
      
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>Log in</Text>

      <View style={styles.container_input}>
        <Icon name="person-outline" type="ionicon" />
        <TextInput
          placeholder="Example@email.com"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.container_input}>
        <Icon name="lock-closed-outline" type="ionicon"></Icon>
        <TextInput
          placeholder="password"
          style={styles.input}
          secureTextEntry={securePassword}
          onChangeText={(text) => setPassword(text)}
        />
        {eyeOpen == false ? (
          <Icon
            name="eye-off-outline"
            type="ionicon"
            onPress={() => passwordVisible(true)}
          />
        ) : (
          <Icon
            name="eye-outline"
            type="ionicon"
            onPress={() => passwordVisible(false)}
          />
        )}
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button} onPress={sendUserData}>
          <Text style={styles.text}>Log in</Text>
          <Icon name="log-in-outline" type="ionicon" color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert(
              "Here its where the user are gonna be redirect to recovery his password throw email"
            )
          }
        >
          <Text style={styles.text}>Recovery password</Text>
          <Icon name="lock-open-outline" type="ionicon" color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container_back_button: {
    alignSelf: 'flex-start',
    padding: 10, 
  },
  back_button: {
    alignSelf: 'flex-start',
  },
  sign_in_container: {
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 240,
  },
  title: {
    fontSize: 40,
  },
  container_input: {
    padding: 5,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 10,
    marginBottom:  10
  },
  input: {
    borderRadius: 5,
    width: "80%",
  },
  button_container: {
    width: "70%",
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    flexDirection: "row",
    height: 35,
    backgroundColor: "#F87800",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 20,
  },
  text: {
    padding: 5,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
