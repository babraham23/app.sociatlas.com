import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import socket from '../api/socket';
import { useUserContext } from './user.context';
import { fetchUserChatRooms } from '../api/chat/chat.requests';

// let user_id = '6570f7f82394b47863ad4cfa'
// let friendId = '6570f8282394b47863ad4cfe'

type Context = {
    chatRooms?: any;
    createRoom: (roomName: string, friendId: string) => void;
    getRoomById: (roomId: string) => void;
    listenForRoomMessages: () => void;
    getUserChatRooms: () => void;
    createNewMessage: (message: string, roomId: string, user: string) => void;
};

const ChatContext = createContext<Context>({
    chatRooms: {},
    getUserChatRooms: () => {},
    createRoom: () => {},
    getRoomById: () => {},
    listenForRoomMessages: () => {},
    createNewMessage: () => {},
});

export const ChatProvider = ({ children }: any) => {
    const [chatRooms, setChatRooms] = useState([]);
    const { user } = useUserContext();

    const getUserChatRooms = async () => {
        try {
            let response = await fetchUserChatRooms(user._id);
            setChatRooms(response.data);
        } catch (error: any) {
            if (error.response) {
                console.log('Error getUserChatRooms:', JSON.stringify(error.response.data));
            }
        }
    };

    // Create room
    const createRoom = async (roomName: string, friendId: string) => {
        socket.emit('createRoom', roomName, user._id, friendId);
    };

    // Find room by id
    const getRoomById = (roomId: string) => {
        socket.emit('getRoomById', roomId);
    };

    // Listen for room messages
    const listenForRoomMessages = () => {
        return new Promise((resolve) => {
            socket.on('listenForRoomMessages', (roomChats) => {
                resolve(roomChats);
            });
        });
    };

    // Create new message
    const createNewMessage = (message: string, roomId: string) => {
        socket.emit('newMessage', {
            message,
            room_id: roomId,
            user: {
                name: user,
                _id: user._id,
            },
        });
    };

    return (
        <ChatContext.Provider
            value={{
                chatRooms,
                getUserChatRooms,
                createRoom,
                getRoomById,
                listenForRoomMessages,
                createNewMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = (): Context => useContext<Context>(ChatContext);
