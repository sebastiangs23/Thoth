import { View, Text, StyleSheet } from "react-native"


export default function Dialog({ id_conversation, person, dialog }){
    return(
        <View key={id_conversation} style={styles.container_just_dialog}>
            <Text style={styles.text}> {dialog} </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container_just_dialog: {
        marginTop: 15
    },
    text: {
        color:'white'
    }
});
