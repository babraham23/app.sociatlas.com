import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { getAllUsersFriends, getUsersFriendRequests, inviteUserAsFriend, respondToFriendRequest } from '../api/friends/friendsRequest';
import { useUserContext } from './user.context';

const FriendsContext = createContext({
    addUserAsFriend: (receiverUserId: string) => {},
    getUserFriendsRequest: async () => {},
    // removeFriendFromList: async () => { },
    actionFriendRequest: async (receiverUserId: string, action: string) => {},
    friendRequests: [],
    getAllFriends: async () => {},
    friends: []
});

export const FriendsProvider = ({ children }: any) => {
    const { user, userLoggedIn } = useUserContext();
    const [friendRequests, setFriendsRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const addUserAsFriend = async (receiverUserId: string) => {
        let body = {
            senderUserId: user._id,
            receiverUserId,
        };
        try {
            let response = await inviteUserAsFriend(body);
            alert('Friend request sent');
            console.log('success', response.data);
        } catch (error: any) {
            if (error.response) {
                console.log('Error sending friend request:', JSON.stringify(error.response.data));
                alert(JSON.stringify(error.response.data.message));
            }
        }
    };

    const getUserFriendsRequest = async () => {

        try {
            let response = await getUsersFriendRequests(user._id);
            // alert(JSON.stringify(response.data));
            setFriendsRequests(response.data.invitations);
        } catch (error: any) {
            if (error.response) {
                // console.log('Error getting user friends:', JSON.stringify(error.response.data));
            }
        }
    };

    const actionFriendRequest = async (senderUserId: string, action: string) => {
        let body = {
            senderUserId,
            receiverUserId: user._id,
            action,
        };
        console.log('actionFriendRequest body-->', body);
        try {
            let response = await respondToFriendRequest(body);
            getUserFriendsRequest();
            console.log(JSON.stringify(response.data));
        } catch (error: any) {
            if (error.response) {
                console.log('Error responding to friend request:', JSON.stringify(error.response.data));
            }
        }
    };

    const getAllFriends = async () => {
        try {
            let response = await getAllUsersFriends(user._id);
            console.log('getting friend requests respond -->', JSON.stringify(response.data));
            setFriends(response.data.friends);
        } catch (error: any) {
            if (error.response) {
                console.log('Error getting user friends:', JSON.stringify(error.response.data));
            }
        }
    };

    useEffect(() => {
        if (userLoggedIn) {
            getUserFriendsRequest();
        }
    }, [userLoggedIn]);

    return (
        <FriendsContext.Provider
            value={{
                addUserAsFriend,
                getUserFriendsRequest,
                // respondToFriendRequest,
                // removeFriendFromList,
                friendRequests,
                actionFriendRequest,
                getAllFriends,
                friends
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};

export const useFriendsContext = () => useContext(FriendsContext);
