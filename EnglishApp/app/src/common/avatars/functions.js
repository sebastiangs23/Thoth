import AsyncStorage from "@react-native-async-storage/async-storage";

import latina from "../../assets/avatars/avatar_latina.webp";
import gringa from "../../assets/avatars/avatar_gringa.webp";
import morena from "../../assets/avatars/avatar_africana.webp";
import asiatica from "../../assets/avatars/avatar_asiatica.png";

/*_____________________________________________________________________________________
 |   FOR THE MOMENT ITS GONNA BE HERE BECAUSE I DONT FIND IT SENSE TO PUT IT IN DB   */ 
export const avatars = [
  {
    id: 1,
    name: 'Vanessa Rodriguez',
    img: latina
  },
  {
    id: 2,
    name: 'Charlotte Smith',
    img: gringa
  },
  {
    id: 3,
    name: 'Fatima Lopez',
    img: morena,
  },
  {
    id: 4,
    name: 'Mila Lee',
    img: asiatica
  }];

/*____________________________________________
|    SAVE THE AVATAR IN THE ASYNC STORAGE   */
export async function saveAvatarPicked(avatar) { //saveTutorPicked
  try {
    await AsyncStorage.setItem("avatar", JSON.stringify(avatar));

  } catch (error) {
    console.log("Error saving avatar ", error);
  }
}

/*__________________________________________
|   GET THE AVATAR IN THE ASYNC STORAGE   */
export async function getAvatarPicked(){ //cambiar nombre  a getTutorPicked
    const avatar = await AsyncStorage.getItem('avatar');

    return JSON.parse(avatar);
}
