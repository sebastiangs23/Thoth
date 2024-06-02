import { Audio } from "expo-av";

export async function playAudio(audioUri) {
  try {
    console.log("audioUri ", audioUri);
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });

    await sound.playAsync();
  } catch (error) {
    console.log("Error en la fn() playAudio.");
    res.status(500).send(error);
  }
}

export async function playAudioNext() {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../../assets/sounds/next_cut.mp3"));
    await sound.playAsync();
  } catch (error) {
    console.log("Error in the playAudioLocal fn().");
    res.status(500).send(error);
  }
}
