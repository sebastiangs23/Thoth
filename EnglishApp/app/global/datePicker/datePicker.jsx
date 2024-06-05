import {
  SafeAreaView,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function DatePicker() {
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
    showMode("date");
  }

  function showTimepicker() {
    showMode("time");
  }

  return (
    <SafeAreaView style={styles.button_container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
        <Text style={styles.text}>Birthday: {date.toLocaleString()}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button_container: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 55,
    backgroundColor: "#F87800",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
