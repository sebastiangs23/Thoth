import AsyncStorage from "@react-native-async-storage/async-storage";

import latina from "../../assets/avatars/avatar_latina.webp";
import gringa from "../../assets/avatars/avatar_gringa.webp";
import morena from "../../assets/avatars/avatar_africana.webp";
import asiatica from "../../assets/avatars/avatar_asiatica.png";
import francesa from "../../assets/avatars/avatar_francesa.webp";
import colombiana from "../../assets/avatars/avatar_colombiana.webp";
import americana from "../../assets/avatars/avatar_americana.webp";
import nigeriana from "../../assets/avatars/avatar_nigeriana.webp";

import spanishFlag from "../../assets/flags/spanish_flag.png";
import ukFlag from "../../assets/flags/uk_flag.png";
import drFlag from "../../assets/flags/dr_flag.png";
import chineseFlag from "../../assets/flags/chinese_flag.png";

import frenchFlag from "../../assets/flags/french_flag.png";
import colombiaFlag from "../../assets/flags/colombia_flag.png";
import americaFlag from "../../assets/flags/usa_flag.webp";
import nigeriaFlag from "../../assets/flags/nigeria_flag.png";


/*_____________________________________________________________________________________
 |   FOR THE MOMENT ITS GONNA BE HERE BECAUSE I DONT FIND IT SENSE TO PUT IT IN DB   */ 
export const avatars = [
  {
    id: 1,
    name: 'Vanessa Rodriguez',
    img: latina,
    accent: 'Spanish',
    flag: spanishFlag
  },
  {
    id: 2,
    name: 'Charlotte Smith',
    img: gringa,
    accent: 'UK',
    flag: ukFlag
  },
  {
    id: 3,
    name: 'Fatima Lopez',
    img: morena,
    accent: 'Latin',
    flag: drFlag
  },
  {
    id: 4,
    name: 'Mila Lee',
    img: asiatica,
    accent: 'Asian',
    flag: chineseFlag
  },
  // {
  //   id:5,
  //   name: 'Karen Lefevre',
  //   img: francesa,
  //   accent: 'French',
  //   flag: frenchFlag
  // },
  {
    id: 6,
    name: 'Daniela Amaya',
    img: colombiana,
    accent: 'Latin',
    flag: colombiaFlag
  },
  {
    id: 7,
    name: 'Emily Johnson',
    img: americana,
    flag: americaFlag,
    accent: 'American',
  },
  // {
  //   id: 8,
  //   name: 'Ngozi Okafor',
  //   img: nigeriana,
  //   flag: nigeriaFlag
  // },
];

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
