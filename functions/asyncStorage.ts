import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreData = async (key: string, value?: string) => {
    if (!value) return;
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
};

export const GetData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.error(e);
    }
};

// delete data
export const DeleteData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(e);
    }
};
