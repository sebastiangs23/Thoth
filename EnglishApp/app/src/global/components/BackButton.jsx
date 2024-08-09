import { View } from "react-native";
import { Icon } from "react-native-elements";
import { globalStyles } from "../styles/styles";

export default function BackButton({module, navigation}){

    function returnTo(){
        navigation.navigate(module);
    };

    return (
        <View style={globalStyles.container_back_button}>
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