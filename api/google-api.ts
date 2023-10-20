import axios from 'axios';

import { endpoints } from './google-endpoints';

export type User = {
    ID: number;
    firstName?: string;
    lastName?: string;
    email: string;
    savedProperties?: number[];
    allowsNotifications: boolean;
    pushToken?: string;
    sessionID?: string;
    accessToken: string;
    refreshToken: string;
};

type DataRes = { data: User };

export const googleLoginOrRegister = async (accessToken: string) => {
    try {
        const { data }: DataRes = await axios.post(endpoints.google, {
            accessToken,
        });
        console.log('success -->', data);
        return data;
    } catch (error) {
        console.log('error -->', error);
    }
};
