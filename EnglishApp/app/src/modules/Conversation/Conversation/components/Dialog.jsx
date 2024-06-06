import { View, Text, StyleSheet, Image } from "react-native"


export default function Dialog({ id_conversation, person,dialog }){
    return(
        <View  >
            <Text> {person} </Text>
            <Text> {dialog} </Text>
        </View>
    )
};

const styles = StyleSheet.create({

});
