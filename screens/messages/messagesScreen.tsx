import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MessagesHeader from '../../components/headers/messagesHeader';
import MessageItem from '../../components/layout/messageItem';
import { useTheme } from '../../hooks/useTheme';

const MessagesScreen = () => {
    const { colors } = useTheme();
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
