import AsyncStorage from "@react-native-async-storage/async-storage";

export async function savePlanSelected(type) {
  try {
    await AsyncStorage.setItem("userPlanSelected", JSON.stringify(type));
  } catch (error) {
    console.log("Error saving data",error);
  }
}

export async function getPlanSaved() {
  try {
    const planSaved = await AsyncStorage.getItem("userPlanSelected");

    return JSON.parse(planSaved);
  } catch (error) {
    console.log("Error getting the data", error);
  }
}

export async function removePlanSaved() {
  try {
    await AsyncStorage.removeItem('userPlanSelected');
    
    console.log('The plan selected was successfully removed');
    
  } catch (error) {
    console.log("Error removing the data", error);
  }
}
