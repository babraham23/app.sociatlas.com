const API = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=54.9696,1.6198&radius=9&key=AIzaSyBxDwgAiRmplHmbQfNrX4FJ4ZgqA0wp9X4';
export const GOOGLE_BASE_API = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
export const DETAILED_API = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=YOUR_API_KEY`;

export const API_KEY = `AIzaSyBxDwgAiRmplHmbQfNrX4FJ4ZgqA0wp9X4`;
export const radius_number_of_meters = 10;

let maxheight = 2340;
let maxwidth = 4160;
export const getPlacesPhotos = (photo_reference: any) =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&maxheight=${maxheight}&photo_reference=${photo_reference}&key=${API_KEY}`;
export const restaurant_search = (lat: number, lng: number) => `${GOOGLE_BASE_API}restaurants&location=${lat},${lng}&radius=${radius_number_of_meters}&key=${API_KEY}`;
// export const pub_search = (lng: number, lat: number) => `${GOOGLE_BASE_API}bar&location=${lat},${lng}&radius=${radius_number_of_meters}&key=${API_KEY}`;
export const pub_search = (lng: number, lat: number) => `${GOOGLE_BASE_API}bars&location=${lat},${lng}&radius=${1}&key=${API_KEY}`;

export const detailed_search = (place_id: string) => `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${API_KEY}`;

export const endpoints = {
    google: 'https://www.googleapis.com/oauth2/v4/token',
};

export const GEOCODE_API_KEY = 'AIzaSyBW_JwUjAFHuhZV8rBU-BNHb-dw5UN6zIM'