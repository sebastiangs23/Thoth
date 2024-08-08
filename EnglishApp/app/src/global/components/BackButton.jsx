import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function BackButton({module, navigation}){

    function returnTo(){
        navigation.navigate(module);
    };

    return (
        <View style={styles.container_back_button}>
          <Icon
            name="arrow-back-outline"
            reverseColor="#000000"
            type="ionicon"
            color="white"
            size={20}
            reverse
            onPress={returnTo}
          />
        </View>
    )
};

const styles = StyleSheet.create({
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
});