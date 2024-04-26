import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>

      <Text>Name: </Text>
      <TextInput placeholder="Name" />

      <Text>Last Name: </Text>
      <TextInput placeholder="LastName" />

      <Text>Email</Text>
      <TextInput placeholder="Example@email.com" />

      <Button title="Create an Account" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
