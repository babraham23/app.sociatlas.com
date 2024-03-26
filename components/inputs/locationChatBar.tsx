import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocationChatContext } from '../../context/locationChat.context';

const LocationChatToolbar = ({ style, roomId }: any) => {
    const [messageText, setMessageText] = useState('');
    const { createNewMessage } = useLocationChatContext();

    const handleSend = () => {
        if (messageText.trim().length > 0) {
            createNewMessage(messageText, roomId);
            setMessageText('');
        }
    };

    return (
        <View style={[styles.container, style]}>
            <TextInput
                style={styles.inputStyle}
                textAlign="left"
                placeholder="Type a message..."
                placeholderTextColor="grey"
                multiline={true}
                numberOfLines={4}
                value={messageText}
                onChangeText={setMessageText}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => handleSend()}>
                <Ionicons name="send-sharp" size={16} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: '100%',
        borderTopColor: '#eaeaea',
        borderTopWidth: 1,
        padding: 16,
        backgroundColor: 'white',
        zIndex: 100,
    },
    inputStyle: {
        height: 100,
        width: '100%',
        borderWidth: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        padding: 8,
        color: 'black',
        fontSize: 16,
        borderColor: '#eaeaea',
    },
    button: {
        position: 'absolute',
        right: 26,
        bottom: 30,
        backgroundColor: '#4ba6f5',
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4,
    },
});

export default LocationChatToolbar;
