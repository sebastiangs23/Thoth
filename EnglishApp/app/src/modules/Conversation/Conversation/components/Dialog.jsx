import { View, Text } from "react-native";
import { globalStyles } from "../../../../global/styles/styles";


export default function Dialog({ id_conversation, person, dialog }){
    return(
        <View key={id_conversation} style={globalStyles.container_dialog_sentence}>
            <Text style={globalStyles.text_dialog_sentence}> {dialog} </Text>
        </View>
    )
};