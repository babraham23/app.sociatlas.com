import { GET_ALL_INTERESTS, CREATE_INTEREST, GET_MOST_USED_INTERESTS, CHECK_INTEREST_AVAILABILITY, GET_INTERESTS_BY_CREATOR, GET_INTERESTS, GET_SCROLL_BAR_DATA } from '../endpoints';
import { HTTP } from '../http';

export const createInterest = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: CREATE_INTEREST,
        Headers: HEADERS,
        Data: DATA,
    });
};

export const getAllInterests = (HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_ALL_INTERESTS,
        Headers: HEADERS,
    });
};

export const getMostUsedInterests = (HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_MOST_USED_INTERESTS,
        Headers: HEADERS,
    });
};

export const checkInterestAvailibility = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: CHECK_INTEREST_AVAILABILITY,
        Data: DATA,
        Headers: HEADERS,
    });
};

export const getInterestsByCreator = async (id: any) => {
    return HTTP({
        Method: 'GET',
        Url: `${GET_INTERESTS_BY_CREATOR}/${id}`,
    });
};

export const getInterests = async () => {
    return HTTP({
        Method: 'GET',
        Url: GET_INTERESTS,
    });
};

export const getScrollBarData = async () => {
    return HTTP({
        Method: 'GET',
        Url: GET_SCROLL_BAR_DATA,
    });
};