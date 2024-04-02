import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LocationChatCloseButton from '../../components/buttons/locationCHatCloseButton';
import { useUserContext } from '../../context/user.context';
import { useTheme } from '../../hooks/useTheme';
import { useLocationChatContext } from '../../context/locationChat.context';
import LocationChatMessages from '../../components/chat/LocationChatMessages';
import MessageFab from '../../components/buttons/messageFAB';

const LocationChatScreen = ({ route }: any) => {
    const navigation = useNavigation();
    const { getLocationChatRoomById, listenForLocationChatRoomMessages } = useLocationChatContext();
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useUserContext();
    const { colors } = useTheme();
    const [isInputVisible, setInputVisible] = useState(false);
    const [message, setMessage] = useState('');
    const textInputRef: any = useRef(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const { createNewMessage } = useLocationChatContext();

    const toggleInput = () => {
        setInputVisible(!isInputVisible);
        if (!isInputVisible) {
            setTimeout(() => {
                textInputRef.current.focus();
            }, 100);
        } else {
            Keyboard.dismiss();
        }
    };

    const sendMessage = () => {
        console.log(message); // Replace with your actual message sending logic
        if (message.trim().length > 0) {
            createNewMessage(message, roomId);
            setMessage('');
            Keyboard.dismiss();
            setInputVisible(false);
        }
    };

    let roomId = route.params.item._id;

    const onClosePress = () => {
        navigation.goBack();
        setChatMessages([]);
    };

    const getLocationRoomMessages = async () => {
        let roomChats: any = await listenForLocationChatRoomMessages();
        setChatMessages(roomChats);
    };

    useEffect(() => {
        getLocationChatRoomById(roomId);
        getLocationRoomMessages();
    }, [chatMessages]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => setKeyboardHeight(e.endCoordinates.height));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
        // if keyboard is dismiss set isInpuVisible to false
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    return (
        <>
            <LocationChatCloseButton onPress={() => onClosePress()} style={styles.backbutton} />
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={1}>
                <FlatList
                    style={[styles.container, { backgroundColor: colors.card }]}
                    data={chatMessages}
                    renderItem={({ item }) => <LocationChatMessages message={item.text} username={item.user.username} name={item.user.name} randomColor={item.randomColor} />}
                    keyExtractor={(item: any) => item._id}
                />
                {isInputVisible && (
                    <View style={[styles.textWrapper, { bottom: keyboardHeight, backgroundColor: colors.card, borderTopColor: colors.border }]}>
                        <TextInput
                            multiline
                            ref={textInputRef}
                            style={[styles.input, { borderColor: colors.border, backgroundColor: colors.card }]}
                            value={message}
                            onChangeText={setMessage}
                            onSubmitEditing={sendMessage}
                            placeholder="Type a message"
                        />
                    </View>
                )}
                <MessageFab style={styles.fab} onPress={toggleInput} />
            </KeyboardAvoidingView>
        </>
    );
};

export default LocationChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backbutton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1,
    },
    input: {
        width: '100%',
        padding: 10,
        backgroundColor: 'cyan',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    fab: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabIcon: {
        fontSize: 24,
        color: 'white',
    },
    textWrapper: {
        padding: 10,
        backgroundColor: 'red',
        position: 'absolute',
        width: '100%',
        borderTopWidth: 1,
    },
});

{
    /* <GiftedChat
                    messages={chatMessages}
                    user={{
                        _id: user._id,
                        name: user.name,
                    }}
                    renderBubble={(props) => <MessageBubble {...props} />}
                    scrollToBottom
                    minInputToolbarHeight={140}
                    renderInputToolbar={(props) => <LocationChatToolbar {...props} roomId={roomId} />}
                    inverted={false}
                    infiniteScroll
                    // loadEarlier
                /> */
}

// <LocationChatMessages />
