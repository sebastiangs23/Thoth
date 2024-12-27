import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  /*_________________
  |   CONTAINERS   */
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: '#FFFFFF'
  },
  subcontainer: {
    marginBottom: 60,
  },
  title_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  container_card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
    // justifyContent: "flex-start",
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
  container_conversation: {
    backgroundColor: "#FFFFFF",
  },
  sub_container_dialogs: {
    marginTop: 9,
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
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer_ear_button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  container_microphone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    margin: 5,
    padding: 1,
  },
  container_microphone_pro: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    minWidth: 85,
    margin: 5,
    padding: 1,
  },
  container_button_hear: {
    marginTop: 5,
    marginBottom: 5,
  },
  container_play_audio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
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
  container_dialog_sentence: {
    marginTop: 15
  },

  /*____________
  |   CARDS   */
  card: {
    width: 100,
    height: 100,
    padding: 10,
    margin: 10,
    backgroundColor: "#18181b",
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
    // backgroundColor: "#3790F5",
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },


  /*______________
  |   DIALOGS   */
  dialog_bot: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    minHeight: 60,
    minWidth: 200,
    padding: 5,
    margin: 5 ,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    flexWrap: "wrap",
    backgroundColor: "#18181b",
  },
  dialog_user: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    minHeight: 60,
    minWidth: 200,
    padding: 5,
    margin: 5 ,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    flexWrap: "wrap",
    backgroundColor: "#ccc",
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
  text_dialog_sentence: {
    color: 'white'
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
    marginTop: 10,
    marginLeft: 5
  },
  button_recording: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  button_no_recording: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  button_recording_pro: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  button_no_recording_pro: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },


  /*_____________
  |   IMAGES   */
  img_avatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  middle_img: {
    width: 220,
    height: 220,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#18181b",
    height: 35,
    maxWidth: 120,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    color: "#fff"
  },
  own_audio_text: {
    color: '#FFF',
    fontWeight: "bold",
  }
});