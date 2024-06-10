import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { AlertNotificationRoot } from "react-native-alert-notification";
import store from "./src/store/store.js";

import Login from "./src/modules/Login/Login.jsx";
import SignIn from "./src/modules/Login/components/SignIn/SignIn.jsx";
import SignUp from "./src/modules/Login/components/SignUp/SignUp.jsx";
import PickAvatar from "./src/modules/PickAvatar/PickAvatar.jsx";
import LanguageLevel from "./src/modules/LanguageLevel/LanguageLevel.jsx";
import TopicConversation from "./src/modules/Conversation/TopicConversation/TopicConversation.jsx";
import Conversation from "./src/modules/Conversation/Conversation/Conversation.jsx";



const Stack = createStackNavigator();
export default function Page() {
  return (
    <Provider store={store}>
      <AlertNotificationRoot>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PickAvatar" component={PickAvatar} />
            <Stack.Screen name="LanguageLevel" component={LanguageLevel} />
            <Stack.Screen name="TopicConversation" component={TopicConversation}/>
            <Stack.Screen name="Conversation" component={Conversation} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertNotificationRoot>
    </Provider>
  );
}
