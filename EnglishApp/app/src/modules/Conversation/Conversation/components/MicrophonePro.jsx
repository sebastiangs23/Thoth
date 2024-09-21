import { View, Pressable, Text } from "react-native";
import { Icon } from "react-native-elements";

export default function MicrophonePro({}) {

    /*________________
    |   FUNCTIONS   */
    function onPressFunction(){
        console.log('HOLAAAA')
    }
    
  return (
    <View>
      <Pressable onPress={onPressFunction}>
        <Text>Hey here</Text>
      </Pressable>
    </View>
  );
};