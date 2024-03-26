import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import socket from '../api/socket';
import { useUserContext } from './user.context';
import { fetchLocationChatRooms } from '../api/chat/chat.requests';

type Context = {
    locationChatRooms?: any;
    getLocationChatRooms: () => void;
    getLocationChatRoomById: (roomId: string) => void;
    listenForLocationChatRoomMessages: () => void;
    createNewMessage: (message: string, roomId: string) => void;
};

const LocationChatContext = createContext<Context>({
    locationChatRooms: {},
    getLocationChatRooms: () => {},
    getLocationChatRoomById: () => {},
    listenForLocationChatRoomMessages: () => {},
    createNewMessage: () => {},
});

export const LocationChatProvider = ({ children }: any) => {
    const [locationChatRooms, setLocationChatRooms] = useState([]);
    const { user } = useUserContext();

    const getLocationChatRooms = async (interestTitle?: string, interestRadius?: number) => {
        let data = {
            lat: -1.6195554112037769, // Replace with the latitude you want to query
            lng: 54.96948404152383, // Replace with the longitude you want to query
            distance: 5, // Distance in the unit as per your controller logic (e.g., kilometers)
        };
        try {
            let response = await fetchLocationChatRooms(data);
            // console.log('Location Chat Rooms:', JSON.stringify(response.data));
            setLocationChatRooms(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getLocationChatRoomById = (roomId: string) => {
        socket.emit('getLocationChatRoomById', roomId);
    };

    // Listen for room messages
    const listenForLocationChatRoomMessages = () => {
        return new Promise((resolve) => {
            socket.on('listenForLocationChatRoomMessages', (roomChats) => {
                resolve(roomChats);
            });
        });
    };

    // Create new message
    const createNewMessage = (message: string, roomId: string) => {
        socket.emit('newlocationChatMessage', {
            message,
            room_id: roomId,
            user: {
                name: user.username,
                _id: user._id,
                username: user.username,
                profilePic: user.profilePic,
            },
        });
    };

    return (
        <LocationChatContext.Provider
            value={{
                locationChatRooms,
                getLocationChatRooms,
                getLocationChatRoomById,
                listenForLocationChatRoomMessages,
                createNewMessage,
            }}
        >
            {children}
        </LocationChatContext.Provider>
    );
};

export const useLocationChatContext = (): Context => useContext<Context>(LocationChatContext);
