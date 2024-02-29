import { HTTP } from '../http';
import { INVITE_USER_AS_FRIEND, GET_USERS_FRIEND_REQUESTS, RESPOND_TO_FRIEND_REQUEST, REMOVE_FRIEND, GET_ALL_FRIENDS } from '../endpoints';

// inviteUserAsFriend
export const inviteUserAsFriend = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: INVITE_USER_AS_FRIEND,
        Headers: HEADERS,
        Data: DATA,
    });
};

// getUserFriends
export const getUsersFriendRequests = (userId: string, HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_USERS_FRIEND_REQUESTS(userId),
        Headers: HEADERS,
    });
};

// RESPOND_TO_FRIEND_REQUEST
export const respondToFriendRequest = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: RESPOND_TO_FRIEND_REQUEST,
        Headers: HEADERS,
        Data: DATA,
    });
};

// removeFriend
export const removeFriend = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: REMOVE_FRIEND,
        Headers: HEADERS,
        Data: DATA,
    });
};

// get all friends
export const getAllUsersFriends = (userId: string, HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_ALL_FRIENDS(userId),
        Headers: HEADERS,
    });
};
