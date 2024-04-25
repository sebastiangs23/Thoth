import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [text, setText] = useState('Insertar tus datos');

  return (
    <View style={styles.main_container}>
      <Text>Login</Text>
      <TextInput value={text} />

      <Button title="Register" onPress={() => Alert.alert('Here is where its gonna redirect the user to put his credentials.')} />
      <Button title="Login" onPress={() => Alert.alert('Here is where I gonna redirect the user to register')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
