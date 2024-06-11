import { View, Text, StyleSheet, Image } from "react-native"


export default function Dialog({ id_conversation, person,dialog }){
    return(
        <View style={styles.container_just_dialog}>
            {/* <Text style={styles.text}> {person} </Text> */}
            <Text style={styles.text}> {dialog} </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container_just_dialog: {
        // width: '50%'
    },
    text: {
        color:'white'
    }
});
