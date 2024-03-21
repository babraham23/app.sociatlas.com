import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import socket from '../../api/socket';
import { useChatContext } from '../../context/chat.context';
import { GiftedChat } from 'react-native-gifted-chat';
import MessageBubble from '../../components/chat/MessageBubble';
import ChatToolBat from '../../components/inputs/ChatToolBar';
import MessagesHeader from '../../components/headers/messagesHeader';
import { useUserContext } from '../../context/user.context';

let user_id = '6570f7f82394b47863ad4cfa';
let friendId = '6570f8282394b47863ad4cfe';

const Messaging = ({ route, navigation }: any) => {
    const { name, id } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const { getRoomById, listenForRoomMessages, createNewMessage } = useChatContext();
    const { user } = useUserContext();

    const handleRoomDisconnect = () => {
        console.log('Room disconnected');
        setChatMessages([]);
    };

    const getRoomMessages = async () => {
        let roomChats: any = await listenForRoomMessages();
        setChatMessages(roomChats);
    };

    useEffect(() => {
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
                    user={{
                        _id: user._id,
                        name: user.name,
                    }}
                    renderBubble={(props) => <MessageBubble {...props} />}
                    scrollToBottom
                    minInputToolbarHeight={140}
                    renderInputToolbar={(props) => <ChatToolBat {...props} roomId={id} />}
                    inverted={false}
                    infiniteScroll
                    // loadEarlier
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
