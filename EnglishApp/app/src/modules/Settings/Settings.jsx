import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import BottomTab from "../BottomTab/BottomTab";
import { getUserSession } from "../../common/user/functions";
import { Icon } from "react-native-elements";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const api = process.env.EXPO_PUBLIC_SERVER_LOCAL;

export default function Settings({ navigation }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await getUserSession();

      setUser(response);
      setName(response.name);
      setLastName(response.last_name);
      setMiddleName(response.second_last_name);
    } catch (error) {
      console.log(error);
    }
  }

  function checkIfChanges() {
    if (
      name !== user.name ||
      lastName !== user.last_name ||
      middleName !== user.second_last_name
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  useEffect(() => {
    if (user !== null) {
      checkIfChanges();
    }
  }, [name, lastName, middleName]);

  async function saveDataUser() {
    try {
      if (
        name !== user.name ||
        lastName !== user.last_name ||
        middleName !== user.second_last_name
      ) {
        const data = {
          id: user.id,
          name: name,
          last_name: lastName,
          second_last_name: middleName,
        };

        const response = await axios.put(`${api}/users/update-data-user`, data);

        if (response.data.status === "Successfull") {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "!Success!",
            textBody: response.data.message,
            button: "Ok",
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function DarkModeInfo() {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "!Dark mode proximamente!",
      textBody: "Nuevas funcionabilidades próximamente! 🎉",
      button: "Ok",
      autoClose: 2000,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.title_container}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {user !== null ? (
          <View>
            <View style={styles.rows}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  value={name}
                  style={styles.input}
                  onChangeText={(text) => {
                    setName(text);
                    checkIfChanges();
                  }}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  value={lastName}
                  style={styles.input}
                  onChangeText={(text) => {
                    setLastName(text);
                    checkIfChanges();
                  }}
                />
              </View>
            </View>

            <View style={styles.rows}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Middle Name</Text>
                <TextInput
                  value={middleName}
                  style={styles.input}
                  onChangeText={(text) => {
                    setMiddleName(text);
                    checkIfChanges();
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        <TouchableOpacity
          style={styles.button_container}
          onPress={() => DarkModeInfo()}
        >
          <Icon
            name="moon-outline"
            color={"#fff"}
            reverseColor={"#18181b"}
            type="ionicon"
            reverse
            size={13}
          />
          <Text style={styles.button_text}>Dark mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button_container,
            {
              backgroundColor: isButtonDisabled ? "#aaa" : "#18181b",
            },
          ]}
          onPress={saveDataUser}
          disabled={isButtonDisabled}
        >
          <Icon
            name="check"
            color={isButtonDisabled ? "#ccc" : "#fff"}
            reverseColor={isButtonDisabled ? "#fff" : "#18181b"}
            type="font-awesome"
            reverse
            size={13}
          />

          <Text
            style={[
              styles.button_text,
              {
                color: isButtonDisabled ? "#ccc" : "#fff",
              },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: "#fff",
  },
  subcontainer: {
    marginBottom: 60,
  },

  title_container: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  title: {
    margin: 5,
    padding: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: "#18181b",
  },
  rows: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  input: {
    borderRadius: 5,
    width: "100%",
    borderWidth: 0.5,
    padding: 3,
  },
  inputWrapper: {
    width: "45%",
    marginTop: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181b",
    borderRadius: 5,
    padding: 3,
    paddingRight: 10,
    marginLeft: 20,
    marginRight: 15,
    marginBottom: 18,
    width: 145,
  },
  button_text: {
    color: "#ffffff", // Color de texto por defecto
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: 90,
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
