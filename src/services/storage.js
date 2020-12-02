import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemToStorage = async (key,value) => {
    await AsyncStorage.setItem(key, value);
}

export const getItemFromStorage = async (key) => {
    return await AsyncStorage.getItem(key);
}

export const removeItemFromStorage = async (key) => {
    await AsyncStorage.removeItem(key);
}