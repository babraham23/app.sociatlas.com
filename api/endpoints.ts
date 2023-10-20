export const BASE_URL = 'http://localhost:3000/api';
// export const BASE_URL = 'https://api-travel-phrases-com-six.vercel.app/';

export const GOOGLE_ADSENSE_CLIENT_ID = 'ca-app-pub-5595468450745517~8719690904';

// ------ EVENTS ------
// get all events
export const GET_ALL_EVENTS = `${BASE_URL}/events/getAllEvents`;

// get evnets by distance and geolocation
export const GET_EVENTS_NEARBY = `${BASE_URL}/events/getEventsNearby`;

// get all interests
export const GET_EVENTS_BY_INTERESTS = `${BASE_URL}/events/getAllInterests`;

// Post create user event
export const CREATE_EVENT = `${BASE_URL}/events/createEvent`;

// Post event image to blob
export const UPLOAD_EVENT_IMAGE_TO_BLOB = `${BASE_URL}/events/uploadImageToBlob`;

// Delete image from blob
export const DELETE_IMAGE_FROM_BLOB = `${BASE_URL}/events/deleteImageFromBlob`;


// ------ INTERESTS ------
// POST create interest
export const CREATE_INTEREST = `${BASE_URL}/interests/createInterest`;

// Get interest for scrollbar - returns by order (configurable for data and mostLiked)
export const GET_ALL_INTERESTS = `${BASE_URL}/interests/getInterests?order=id`;

// Most used interests in the events collection
export const GET_MOST_USED_INTERESTS = `${BASE_URL}/interests/getMostUsedInterests`;

// Get checkInterestAvailability
export const CHECK_INTEREST_AVAILABILITY = `${BASE_URL}/interests/checkInterestAvailability`;

// nterests/getInterestsByCreator/652094be3fc989966718a950
export const GET_INTERESTS_BY_CREATOR = `${BASE_URL}/interests/getInterestsByCreator`;


// ------ USER ------
// Register user
export const REGISTER_USER = `${BASE_URL}/user/registerUser`;

// Login user
export const LOGIN_USER = `${BASE_URL}/user/loginUser`;

// Login user with bearer token
export const LOGIN_USER_WITH_TOKEN = `${BASE_URL}/user/loginUserWithToken`;

// See if username already exists
export const CHECK_USERNAME_AVAILABILITY = `${BASE_URL}/user/checkUsernameAvailability`;


export const EDIT_USER = `${BASE_URL}/user/editUser`;