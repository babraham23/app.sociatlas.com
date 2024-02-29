import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MessagesHeader from '../../components/headers/messagesHeader';
import MessageFriendRequestIcon from '../../components/layout/MessageFriendRequestIcon';
import { useTheme } from '../../hooks/useTheme';
import { fetchChatRooms } from '../../api/chat/chat.requests';
import MessageFab from '../../components/buttons/messageFAB';
import { useNavigation } from '@react-navigation/native';
import { useFriendsContext } from '../../context/friends.context';


const MessagesScreen = () => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    const { friendRequests, actionFriendRequest, getUserFriendsRequest } = useFriendsContext();

    const getChatRooms = async () => {
        const res = await fetchChatRooms();
        console.log('response -->', JSON.stringify(res));
    };

    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/chatrooms');
            const data = await response.json();
        } catch (err) {
            console.error(err);
        }
    };

    const onFrinedrequestPress = (request: any) => {
        Alert.alert(`@${request.sender.username}`, `${request.sender.name} would like to be your friend`, [
            {
                text: 'Accept',
                onPress: () => actionFriendRequest(request.sender._id, 'accept'),
            },
            {
                text: 'Decline',
                onPress: () => actionFriendRequest(request.sender._id, 'decline'),
            },
            // {
            //     text: 'Block',
            //     onPress: () => console.log('Decline Pressed'),
            // },
        ]);
    };

    useEffect(() => {
        // getChatRooms();
        // fetchGroups();
        // if user is logged in but should never get here if not 
        getUserFriendsRequest();
    }, []);

    return (
        <>
            <MessagesHeader />
            <ScrollView style={[styles.container, { backgroundColor: colors.card }]}>
                {friendRequests.length > 0 &&
                    friendRequests.map((request: any, index: number) => (
                        <MessageFriendRequestIcon key={index} userName={request.sender.name} userHandle={request.sender.username} onPress={() => onFrinedrequestPress(request)} />
                    ))}
                {/* <MessageItem />
                <MessageItem /> */}
            </ScrollView>
            <MessageFab style={styles.fab} onPress={() => navigation.navigate('MessagesFriendList')} />
        </>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 40,
        right: 30,
    },
});
