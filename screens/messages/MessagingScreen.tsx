import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import socket from '../../api/socket';
import { useChatContext } from '../../context/chat.context';
import { GiftedChat } from 'react-native-gifted-chat';
import MessageBubble from '../../components/chat/MessageBubble';
import ChatToolBat from '../../components/inputs/ChatToolBar';
import MessagesHeader from '../../components/headers/messagesHeader';
import { useUserContext } from '../../context/user.context';


const Messaging = ({ route }: any) => {
    const { id } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const { getRoomById, listenForRoomMessages } = useChatContext();
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
    }
});
