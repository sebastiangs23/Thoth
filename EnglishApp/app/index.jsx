import Login from "./src/modules/Login/Login.jsx";
import SignIn from "./src/modules/Login/components/SignIn/SignIn.jsx";
import SignUp from "./src/modules/Login/components/SignUp/SignUp.jsx";
import RandomConversation from "./src/modules/Conversation/RandomConversation/RandomConversation.jsx";
import Conversation from "./src/modules/Conversation/Conversation/Conversation.jsx";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./src/store/store.js";

const Stack = createStackNavigator();
export default function Page() {
  return (
    <Provider store={store}>
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
          <Stack.Screen
            name="RandomConversation"
            component={RandomConversation}
          />
          <Stack.Screen name="Conversation" component={Conversation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 30,
    color: "#38434D",
  },
  logo_image: {
    width: 60,
    height: 50,
  },
});
