import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { DeleteData, GetData, StoreData } from '../functions/asyncStorage';
import { loginUser, loginUserWithToken } from '../api/user/user.requests';

type Context = {
    userLoggedIn?: boolean;
    setUserLoggedIn?: any;
    user?: any;
    setUser?: any;
    logUserOut?: any;
    logUserInWithEmailAndPassword?: any;
    getUser?: any;
};

const UserContext = createContext<Context>({
    userLoggedIn: false,
    setUserLoggedIn: () => {},
    user: {},
    setUser: () => {},
    logUserOut: () => {},
    logUserInWithEmailAndPassword: () => {},
    getUser: () => {},
});

export const UserProvider = ({ children }: any) => {
    const [userLoggedIn, setUserLoggedIn]: any = useState(false);
    const [user, setUser]: any = useState({});

    const getUser = async () => {
        const token = await GetData('@token');
        if (token != undefined) {
            try {
                let response = await loginUserWithToken(token);
                // console.log('response -->', JSON.stringify(response.data));
                StoreData('@userId', response.data.user._id);
                setUser(response.data.user);
                setUserLoggedIn(true);
            } catch (error: any) {
                console.log('error loggin in with token', error.response.data);
                DeleteData('@userId');
                setUser([]);
                setUserLoggedIn(false);
            }
        }
    };

    const logUserOut = async () => {
        setUserLoggedIn(false);
        setUser({});
        await DeleteData('@userId');
        await DeleteData('@token');
    };

    const logUserInWithEmailAndPassword = async (body: any) => {
        try {
            let response = await loginUser(body); // sending object with email and password properties
            // console.log('response -->', response.data);
            if (response.status == 200) {
                StoreData('@userId', response.data.user._id);
                StoreData('@token', response.data.token);
                setUser(response.data.user);
                setUserLoggedIn(true);
                return response.status;
            }
        } catch (error: any) {
            return error.response.data.error;
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                userLoggedIn,
                setUserLoggedIn,
                user,
                setUser,
                logUserOut,
                logUserInWithEmailAndPassword,
                getUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): Context => useContext<Context>(UserContext);
