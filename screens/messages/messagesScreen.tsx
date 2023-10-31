import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MessagesHeader from '../../components/headers/messagesHeader';
import MessageItem from '../../components/layout/messageItem';
import { useTheme } from '../../hooks/useTheme';
import { fetchChatRooms } from '../../api/chat/chat.requests';

const MessagesScreen = () => {
    const { colors } = useTheme();

    const getChatRooms = async () => {
        const res = await fetchChatRooms();
        console.log('response -->', JSON.stringify(res));
    };

    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/chatrooms');
            const data = await response.json();
            console.log('data -->', JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // getChatRooms();
        fetchGroups();
    }, []);

    return (
        <>
            <MessagesHeader />
            <ScrollView style={[styles.container, { backgroundColor: colors.card }]}>
                <MessageItem />
                <MessageItem />
            </ScrollView>
        </>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
