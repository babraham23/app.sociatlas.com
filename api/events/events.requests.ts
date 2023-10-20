import { GET_ALL_EVENTS, GET_EVENTS_NEARBY, GET_EVENTS_BY_INTERESTS, UPLOAD_EVENT_IMAGE_TO_BLOB, CREATE_EVENT, DELETE_IMAGE_FROM_BLOB } from '../endpoints';
import { HTTP } from '../http';

export const getAllEvents = (HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_ALL_EVENTS,
        Headers: HEADERS,
    });
};

export const getEventsNearby = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: GET_EVENTS_NEARBY, 
        Headers: HEADERS,
        Data: DATA,
    });
};

export const getEventByInterest = (DATA?: any, HEADERS?: any) => {
    return HTTP({
        Method: 'GET',
        Url: GET_EVENTS_BY_INTERESTS, 
        Headers: HEADERS,
        Data: DATA,
    });
};

export const uploadEventImageToBlob = (DATA?: any, HEADERS?: any) => {
    return HTTP({
        Method: "POST",
        Url: UPLOAD_EVENT_IMAGE_TO_BLOB,
        Data: DATA,
        Headers: {
            // Authorization: `Bearer ${HEADERS}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};

export const deleteEventImageFromBlob = (blobName: string) => {
    return HTTP({
        Method: "DELETE",
        Url: `${DELETE_IMAGE_FROM_BLOB}/${blobName}`,
        Headers: {
            // Authorization: `Bearer ${HEADERS}`,
            "Content-Type": "application/json",  // Typically used, even if not sending a body
        },
    });
};

export const createEvent = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: CREATE_EVENT, 
        Headers: HEADERS,
        Data: DATA,
    });
};

/*
{
    "latitude": 54.969450152452,
    "longitude": -1.6194726722736448,
    "interestTitle": "F1",
    "maxDistance": 16093.4
} 
 */