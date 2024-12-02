import {
  SafeAreaView,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function DatePicker({ format }) {
  const [date, setDate] = useState(new Date());

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setDate(currentDate);
  }

  function showMode(currentMode) {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  }

  function showDatepicker() {
    //showMode("date");
    showMode(format);
  }

  function showTimepicker() {
    //showMode("time");
    showMode(format);
  }

  return (
    <SafeAreaView style={styles.button_container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.text}>Birthday: {date.toLocaleDateString()}</Text>
        {/* <Text style={styles.text}>Birthday</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button_container: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    width: '50%'
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingLeft: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: "#ccc",
  },
});
