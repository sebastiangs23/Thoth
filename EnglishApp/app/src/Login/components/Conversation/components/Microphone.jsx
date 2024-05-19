import { View, Text, Button } from "react-native";
import { useState } from "react";

export default function Microphone() {
    const [audio, setAudio] = useState(null);

    /*___________________________
    |   REQUEST TO THE SERVER   */
    async function sendRecordedAudio(){
        try{
            
        }catch(error){
            console.log('Error al mandar el audio grabado');
            console.log(error)
        }
    }

  return (
    <View>
      <Button title="click here" />
    </View>
  );
}
