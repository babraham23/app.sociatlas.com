import axios from 'axios';
import { BAR_SEARCH, GEOCODE_API_KEY, RESTAURANT_SEARCH } from '../google-endpoints';

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


export const getGoogleRestaurants = async (lat: number, lng: number, radius: number) => {
    try {
        const restaurantResponse = await fetch(RESTAURANT_SEARCH(lat, lng, radius));
        // console.log('restaurant response -->', JSON.stringify(restaurantResponse));
        const restaurant = await restaurantResponse.json();
        if (restaurant.status === 'REQUEST_DENIED') alert('Request denied');
        else {
            return restaurant.results;
            // set places for map
        }
    } catch (error) {
        console.error('error e62 -->', error);
    }
};


export const getGoogleBars = async (lat: number, lng: number, radius: number) => {
    try {
        const barsResponse = await fetch(BAR_SEARCH(lat, lng, radius));
        // console.log('restaurant response -->', JSON.stringify(barsResponse));
        const bars = await barsResponse.json();
        if (bars.status === 'REQUEST_DENIED') alert('Request denied');
        else {
            return bars.results;
            // set places for map
        }
    } catch (error) {
        console.error('error e62 -->', error);
    }
};