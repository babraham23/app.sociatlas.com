import axios from 'axios';
import { GEOCODE_API_KEY } from '../google-endpoints';

export const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const url = `${baseUrl}?latlng=${latitude},${longitude}&key=${GEOCODE_API_KEY}`;
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    try {
        const response = await axios.get(url);
        if (response.data && response.data.results && response.data.results.length > 0) {
            return response.data.results[0].formatted_address;
        } else {
            throw new Error('No results returned from Google Maps API');
        }
    } catch (error: any) {
        throw new Error(`Error fetching address: ${error.message}`);
    }
};
