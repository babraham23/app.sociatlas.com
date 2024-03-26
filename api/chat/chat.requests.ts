import { GET_USER_CHAT_ROOMS, GET_LOCATION_CHAT_ROOMS } from '../endpoints';
import { HTTP } from '../http';

export const fetchUserChatRooms = (userId: string, HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_USER_CHAT_ROOMS(userId),
        Headers: HEADERS,
    });
};

export const fetchLocationChatRooms = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: GET_LOCATION_CHAT_ROOMS,
        Headers: HEADERS,
        Data: DATA,
    });
};
