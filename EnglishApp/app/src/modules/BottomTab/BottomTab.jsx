import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

// I NEED TO START THIS SHIT 
export default function BottomTab({ navigation }) {
  return (
    <View>
      <View>
        <Icon name="fa-house" type="font-awesome" />
        <Text>Home</Text>
      </View>
      <View>
        <Text>Statistics</Text>
      </View>
    </View>
  );
}
