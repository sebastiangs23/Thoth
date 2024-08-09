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
  container_back_button: {
    alignSelf: "flex-start",
    margin: 8,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  container_score_board: {
    padding: 5,
    backgroundColor: "#EFEFEF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  container_mini_score_board: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  container_microphone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    minWidth: 55,
    margin: 5,
    padding: 1,
  },
  container_button_hear: {
    marginTop: 5,
    marginBottom: 5,
  },
  container_button_record: {
    marginTop: 5,
    marginBottom: 5,
  },
  container_tutor: {
    display: "flex",
    flexDirection: "row",
  },
  container_mini_online: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
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
  text_cursive: {
    fontFamily: "Roboto-Italic",
    color: "#514F4F",
  },
  text_bold: {
    fontWeight: "bold",
  },




  /*______________
  |   BUTTONS   */
  information_button: {
    position: "absolute",
    right: 4,
    bottom: 4,
  },
  hear_button: {
    height: 40,
    width: 40,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginLeft: 6,
  },


  /*_____________
  |   IMAGES   */
  img_avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  /*____________
  |   OTHER   */
  green_point: {
    borderRadius: 50,
    borderColor: "#000000",
    borderWidth: 1,
    width: 10,
    height: 10,
    backgroundColor: "#81E362",
  },
  own_audio: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#fff",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  }
});