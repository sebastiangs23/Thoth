import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  /*_________________
  |   CONTAINERS   */
  container: {
    flex: 1,
    position: "relative",
  },
  subcontainer: {
    marginBottom: 60,
  },
  container_card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  container_bottom_tab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  /*____________
  |   CARDS   */
  card: {
    width: 100,
    height: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  card_size_2 : {
    width: 160,
    maxHeight: 150,
    padding: 15,
    margin: 7,
    backgroundColor: "#3790F5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card_high: {
    width: 130,
    height: 120,
    padding: 5,
    margin: 10,
    backgroundColor: "#3790F5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  /*____________
  |   TEXTS   */
  text_small: {
    color: "#000",
    fontWeight: "bold",
  },
  text_semi_small: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  text_medium: {
    fontSize: 23,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  level_button: {
    padding: 8,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },



  /*______________
  |   BUTTONS   */
  information_button: {
    position: "absolute",
    right: 4,
    bottom: 4,
  },

});