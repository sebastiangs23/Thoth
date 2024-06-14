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

export async function playGood(){
  try{
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../../assets/sounds/good_sound.mp3"));
    await sound.playAsync();
    
  }catch(error){
    console.log("Error in the playGood fn().");
    res.status(500).send(error);
  }
}

export async function playFail(){
  try{
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../../assets/sounds/fail_sound.mp3"));
    await sound.playAsync();

  }catch(error){
    console.log(error);
    res.status(500).send(error);
  }
}

export async function playApprove(){
  try{
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../../assets/sounds/approve_sound.mp3"));
    await sound.playAsync();

  }catch(error){
    console.log(error);
    res.status(500).send(error);
  }
}