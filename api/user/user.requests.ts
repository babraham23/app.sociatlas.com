import { LOGIN_USER, REGISTER_USER, LOGIN_USER_WITH_TOKEN, CHECK_USERNAME_AVAILABILITY, EDIT_USER } from '../endpoints';
import { HTTP } from '../http';

export const registerUser = (DATA: any, HEADERS?: any) => {
    return HTTP({
        Method: 'POST',
        Url: REGISTER_USER,
        Headers: HEADERS,
        Data: DATA,
    });
};

export const loginUser = (DATA: any) => {
    return HTTP({
        Method: 'POST',
        Url: LOGIN_USER,
        Data: DATA,
    });
};

export const loginUserWithToken = (authToken?: any) => {
    return HTTP({
        Method: 'POST',
        Url: LOGIN_USER_WITH_TOKEN,
        Headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const checkUsernameAvailability = (DATA: any) => {
    return HTTP({
        Method: 'POST',
        Url: CHECK_USERNAME_AVAILABILITY,
        Data: DATA,
    });
};

export const editUser = async (id: any, DATA?: any) => {
    return HTTP({
        Method: 'PUT',
        Url: `${EDIT_USER}/${id}`,
        Data: DATA,
    });
};
