import { ScrollView, View, Vibration } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteScore } from "../../../store/slices/score/slice";
import { deleteAudioUri } from "../../../store/slices/audioUri/slice";
import { ALERT_TYPE, Dialog as Message, Toast } from "react-native-alert-notification";

import Microphone from "./components/Microphone";
import Dialog from "./components/Dialog";
import PlayAudio from "./components/PlayAudio";
import TutorSection from "./components/TutorSection";
import Score from "./components/Score";

import { globalStyles } from "../../../global/styles/styles";

export default function Conversation({ navigation }) {
  const dispatch = useDispatch();

  const dialogs = useSelector((state) => state.dialog.value);

  function verificationAllApproved() {
    let verification = dialogs.filter(
      (dialog) => dialog.approved == true
    ).length;

    if (dialogs.length == verification) {
      Vibration.vibrate(2000);

      Message.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Well Done!",
        textBody:
          "You've just approved all the dialogs. Please choose another.",
        button: "close",
      });

      setTimeout(() => {
        navigation.navigate("Situation");
        dispatch(deleteScore());
        dispatch(deleteAudioUri());
      }, 3000);
    }
  }
  return (
    <ScrollView style={globalStyles.container_conversation}>
      
      <Score />

      <View style={globalStyles.sub_container_dialogs}>

        <TutorSection navigation={navigation} />

        {dialogs &&
          dialogs.map((item) => {
            return item.approved == true ? (
              <View
                key={item.id}
                style={
                  item.person == 1
                    ? globalStyles.dialog_bot
                    : globalStyles.dialog_user
                }
              >
                  <Dialog
                    id_conversation={item.id}
                    person={item.person}
                    dialog={item.dialog}
                  />
                  <Microphone
                    person={item.person}
                    dialog={item.dialog}
                    id_conversation={item.id}
                    allApproved={verificationAllApproved()}
                  />

                  <PlayAudio dialog={item.dialog} />
              </View>
            ) : (
              <></>
            );
          })}
      </View>

    </ScrollView>
  );
};
