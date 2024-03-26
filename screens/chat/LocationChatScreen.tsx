import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LocationChatCloseButton from '../../components/buttons/locationCHatCloseButton';
import { useChatContext } from '../../context/chat.context';
import { GiftedChat } from 'react-native-gifted-chat';
import MessageBubble from '../../components/chat/MessageBubble';
import { useUserContext } from '../../context/user.context';
import { useTheme } from '../../hooks/useTheme';
import LocationChatToolbar from '../../components/inputs/locationChatBar';
import { useLocationChatContext } from '../../context/locationChat.context';

const LocationChatScreen = ({ route }: any) => {
    const navigation = useNavigation();
    const { getLocationChatRoomById, listenForLocationChatRoomMessages } = useLocationChatContext();
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useUserContext();
    const { colors } = useTheme();

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

    return (
        <>
            <LocationChatCloseButton onPress={() => onClosePress()} style={styles.backbutton} />
            <View style={[styles.container, { backgroundColor: colors.card }]}>
                <GiftedChat
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
                />
                {Platform.OS === 'ios' && <KeyboardAvoidingView />}
            </View>
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
});
