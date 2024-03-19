import { Alert, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import MessagesHeader from '../../components/headers/messagesHeader';
import MessageFriendRequestIcon from '../../components/layout/MessageFriendRequestIcon';
import { useTheme } from '../../hooks/useTheme';
import MessageFab from '../../components/buttons/messageFAB';
import { useNavigation } from '@react-navigation/native';
import { useFriendsContext } from '../../context/friends.context';
import { useChatContext } from '../../context/chat.context';
import MessageItem from '../../components/layout/messageItem';
import { useUserContext } from '../../context/user.context';

const MessagesScreen = () => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    const { friendRequests, actionFriendRequest, getUserFriendsRequest } = useFriendsContext();
    const { user } = useUserContext(); 
    const { chatRooms, getUserChatRooms } = useChatContext();


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
        ]);
    };

    useEffect(() => {
        getUserFriendsRequest();
    }, []);

    useEffect(() => {
        let user_id = '6570f7f82394b47863ad4cfa';
        if (getUserChatRooms) {
            getUserChatRooms(user_id);
        }
    }, [chatRooms]);

    const handleOnPress = (room: any) => {
        navigation.navigate('MessagingScreen', {
            id: room._id,
            name: room.name,
        });
    };

    return (
        <>
            <MessagesHeader />
            <ScrollView style={[styles.container, { backgroundColor: colors.card }]}>
                {friendRequests.length > 0 &&
                    friendRequests.map((request: any, index: number) => (
                        <MessageFriendRequestIcon key={index} userName={request.sender.name} userHandle={request.sender.username} onPress={() => onFrinedrequestPress(request)} />
                    ))}
                {chatRooms.length > 0 && chatRooms.map((room: any, index: number) => <MessageItem key={room._id} name={room.name} onPress={() => handleOnPress(room)} />)}
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
