import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MessageTextInput from '../inputs/messageTextInput';
import SendButton from '../buttons/sendButton';
import { useTheme } from '../../hooks/useTheme';

const MessageTabBar = () => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <View style={styles.messageWrapper}>
                <MessageTextInput />
            </View>
            <View style={styles.sendButton}>
                <SendButton />
            </View>
        </View>
    );
};

export default MessageTabBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        paddingBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    messageWrapper: {
        width: '85%',
    },
    sendButton: {},
});
