import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MessagesReadHeader from '../../components/headers/messagesReadHeader';
import SenderMessage from '../../components/messages/senderMessage';
import { useTheme } from '../../hooks/useTheme';
import UserMessage from '../../components/messages/userMessage';
import MessageTabBar from '../../components/tabBar/messageTabBar';

const MessageReadScreen = () => {
    const { colors } = useTheme();
    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
                <MessagesReadHeader />
                <ScrollView style={[styles.container, { backgroundColor: colors.card }]}>
                    <SenderMessage />
                    <UserMessage />
                </ScrollView>
                <MessageTabBar />
            </KeyboardAvoidingView>
        </>
    );
};

export default MessageReadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // paddingBottom: 300
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between',
    },
});
