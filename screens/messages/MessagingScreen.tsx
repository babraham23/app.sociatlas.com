import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, FlatList, Pressable, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../api/socket';
import { useChatContext } from '../../context/chat.context';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import MessageBubble from '../../components/chat/MessageBubble';
import ChatToolBat from '../../components/inputs/ChatToolBar';
import MessagesHeader from '../../components/headers/messagesHeader';

let user_id = '6570f7f82394b47863ad4cfa';
let friendId = '6570f8282394b47863ad4cfe';

const Messaging = ({ route, navigation }: any) => {
    const [user, setUser] = useState('');
    const { name, id } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { getRoomById, listenForRoomMessages, createNewMessage } = useChatContext();

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            console.error('Error while loading username!');
        }
    };

    const handleRoomDisconnect = () => {
        console.log('Room disconnected');
        setChatMessages([]);
    };

    const getRoomMessages = async () => {
        console.log('GETTING ROOM MESSAGES')
        let roomChats: any = await listenForRoomMessages();
        setChatMessages(roomChats);
    };

    useEffect(() => {
        navigation.setOptions({ title: name });
        getUsername();
        getRoomById(id);
        getRoomMessages();
        return () => {
            socket.off('listenForRoomMessages', handleRoomDisconnect);
        };
    }, [chatMessages]);

    return (
        <>
            <MessagesHeader />
            <View style={styles.container}>
                <GiftedChat
                    messages={chatMessages}
                    // onSend={(messages) => onSend(messages)}
                    user={{
                        _id: user_id,
                        // Your user details
                        name: 'Brett',
                    }}
                    renderBubble={(props) => <MessageBubble {...props} />}
                    scrollToBottom
                    minInputToolbarHeight={140}
                    renderInputToolbar={(props) => <ChatToolBat {...props} roomId={id} />}
                    inverted={false}
                    infiniteScroll
                    loadEarlier
                />
                {Platform.OS === 'ios' && <KeyboardAvoidingView />}
            </View>
        </>
    );
};

export default Messaging;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    messagingscreen: {
        flex: 1,
        paddingHorizontal: 16,
    },
    messaginginputContainer: {
        width: '100%',
        minHeight: 100,
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    messaginginput: {
        borderWidth: 1,
        padding: 15,
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
    },
    messagingbuttonContainer: {
        width: '30%',
        backgroundColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

{
    /* <View style={styles.messagingscreen}>
                {chatMessages.length > 0 && (
                    <FlatList
                        ref={flatListRef}
                        data={chatMessages}
                        renderItem={({ item }) => <MessageComponent item={item} user={user} />}
                        keyExtractor={(item: any) => item._id.toString()}
                    />
                )}
            </View>

            <View style={styles.messaginginputContainer}>
                <TextInput style={styles.messaginginput} onChangeText={(value) => setMessage(value)} />
                <Pressable style={styles.messagingbuttonContainer} onPress={handleNewMessage}>
                    <Text style={{ color: '#f2f0f1', fontSize: 20 }}>SEND</Text>
                </Pressable>
            </View> */
}
