import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUserSession(userSession){
  try {
    await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
    
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export async function getUserSession(){
    try{
        const userSession = await AsyncStorage.getItem('userSession');

        return JSON.parse(userSession);

    }catch(error){
        console.log('Error getting the data', error);
    }
};

export async function removeUserSession(){
    try{
        await AsyncStorage.removeItem('userSession');
        console.log('the user session was successfully removed')
    }catch(error){
        console.log('Error trying to remove the user session.');
    }
}