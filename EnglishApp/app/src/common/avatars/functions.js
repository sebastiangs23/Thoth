import AsyncStorage from "@react-native-async-storage/async-storage";

import latina from "../../assets/avatars/avatar_latina.webp";
import gringa from "../../assets/avatars/avatar_gringa.webp";
import morena from "../../assets/avatars/avatar_africana.webp";
import asiatica from "../../assets/avatars/avatar_asiatica.png";

export const avatars = [latina, gringa, morena, asiatica];

/*____________________________________________
|    SAVE THE AVATAR IN THE ASYNC STORAGE   */
export async function saveAvatarPicked(avatar) {
  try {
    await AsyncStorage.setItem("avatar", avatar.toString());

  } catch (error) {
    console.log("Error saving avatar ", error);
  }
}

/*__________________________________________
|   GET THE AVATAR IN THE ASYNC STORAGE   */
export async function getAvatarPicked(){
    const avatar = await AsyncStorage.getItem('avatar');

    return avatar;
}
