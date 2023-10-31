import { FETCH_CHAT_ROOMS } from '../endpoints';
import { HTTP } from '../http';

export const fetchChatRooms = (HEADERS?: any) => {
    return HTTP({
        Method: 'FETCH',
        Url: FETCH_CHAT_ROOMS,
        Headers: HEADERS,
    });
};
