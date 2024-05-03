import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);

  // Request to the server
  async function createUser(){
    try{
      console.log(name, email, lastName, password)
    }catch(error){
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>

      <Text>Name: </Text>
      <TextInput 
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />

      <Text>Last Name: </Text>
      <TextInput
        placeholder="LastName"
        onChangeText={(text) => setLastName(text)}
      />

      <Text>Email:</Text>
      <TextInput
        placeholder="Example@email.com"
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Password:</Text>
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />

      <Button 
        title="Create an Account" 
        onPress={createUser} 
      />
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
