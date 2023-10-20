import { Platform } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

export const getMyLocation = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
        alert('Oops, this will not work on Snack in an Android Emulator. Try it on your device!');
        return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
};
