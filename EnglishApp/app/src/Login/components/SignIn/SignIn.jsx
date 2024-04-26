import { View, StyleSheet,Text ,TextInput, Button } from "react-native";


export default function SignIn(){
    return(
        <View style={styles.sign_container}>
            <Text style={styles.title} >Sign In</Text>

            <Text> User name: </Text>
            <TextInput placeholder="Example@email.com" />

            <Text> Password: </Text>
            <TextInput placeholder="password" />

            <Button title="Log In" />
        </View>
    )
}

const styles = StyleSheet.create({
    sign_container: {
        alignItems: "center",
    },

    title: {
        fontSize:40
    }

});