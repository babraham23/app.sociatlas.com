import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import socket from '../api/socket';


let user_id = '6570f7f82394b47863ad4cfa'
let friendId = '6570f8282394b47863ad4cfe'

type Context = {
    chatRooms?: any;
    createRoom: (roomName: string, userId: string, friendId: string) => void;
    getRoomById: (roomId: string) => void;
    listenForRoomMessages: () => void;
    getUserChatRooms: (userId: string) => void;
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

    // Get user chat rooms
    const getUserChatRooms = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/getUserChatRooms/?userId=${userId}`);
            const data = await response.json();
            setChatRooms(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Create room
    const createRoom = async (roomName: string, userId: string, friendId: string) => {
        socket.emit('createRoom', roomName, userId, friendId);
    };

    // Find room by id
    const getRoomById = (roomId: string) => {
        socket.emit('getRoomById', roomId);
    };

    // Listen for room messages
    const listenForRoomMessages = () => {
        console.log('Listening for room messages');
        return new Promise((resolve) => {
            socket.on('listenForRoomMessages', (roomChats) => {
                resolve(roomChats);
            });
        });
    };

    // Create new message
    const createNewMessage = (message: string, roomId: string, user: string) => {
        socket.emit('newMessage', {
            message,
            room_id: roomId,
            user: {
                name: user,
                _id: user_id,
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
