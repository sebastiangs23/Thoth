import { StyleSheet, Text, View, Image } from "react-native";
import Login from "./src/Login/Login";


export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image style={styles.logo_image} source={require('../assets/logos/logo2.png')} />
        <Text style={styles.title}>Welcome to Thoth</Text>
        <Text styles={styles.subtitle}>We are gonna revolutionate the Language learning throw the IA.</Text>

        {/* LOGIN COMPONENT */}
        <Login />

      </View>
    </View>
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
    fontSize:44,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize:30,
    color: "#38434D",
  },
  logo_image: {
    width: 60,
    height:50,
  }
});
