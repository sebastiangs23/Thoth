import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { AlertNotificationRoot } from "react-native-alert-notification";
import store from "./src/store/store.js";

import Plans from "./src/modules/Plans/Plans.jsx";
import Login from "./src/modules/Login/Login.jsx";
import SignIn from "./src/modules/Login/components/SignIn/SignIn.jsx";
import SignUp from "./src/modules/Login/components/SignUp/SignUp.jsx";
import PickAvatar from "./src/modules/PickAvatar/PickAvatar.jsx";
import LanguageLevel from "./src/modules/LanguageLevel/LanguageLevel.jsx";
import Areas from "./src/modules/Conversation/Areas/Areas.jsx";
import SpecificTopic from "./src/modules/Conversation/SpecificTopic/SpecificTopic.jsx";
import Situation from "./src/modules/Conversation/Situations/Situations.jsx";
import ChatGptConversation from "./src/modules/Conversation/Conversation/ChatGptConversation.jsx";
import Conversation from "./src/modules/Conversation/Conversation/Conversation.jsx";
import UserDashboard from "./src/modules/UserDashboard/UserDashboard.jsx";
import BottomTab from "./src/modules/BottomTab/BottomTab.jsx";


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
            <Stack.Screen name="Plans" component={Plans} />
            <Stack.Screen name="LanguageLevel" component={LanguageLevel} />
            <Stack.Screen name="PickAvatar" component={PickAvatar} />
            <Stack.Screen name="Areas" component={Areas}/>
            <Stack.Screen name="SpecificTopic" component={SpecificTopic}/>
            <Stack.Screen name="Situation" component={Situation}/>
            <Stack.Screen name="Conversation" component={Conversation} />
            <Stack.Screen name="ChatGptConversation" component={ChatGptConversation} />
            <Stack.Screen name="UserDashboard" component={UserDashboard} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertNotificationRoot>
    </Provider>
  );
}
