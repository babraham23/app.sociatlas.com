import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OvalButton from '../../components/buttons/ovalButton';
import { getUsersFriendRequests, inviteUserAsFriend, removeFriend, respondToFriendRequest } from '../../api/friends/friendsRequest';

const TestScreen = () => {
    const addUserAsFriend = async () => {
        let body = {
            senderUserId: '6570f7f82394b47863ad4cfa',
            receiverUserId: '6570f8282394b47863ad4cfe',
        };
        let response = await inviteUserAsFriend(body);
        console.log(JSON.stringify(response.data));
    };

    const getUserFriends = async () => {
        let response = await getUsersFriendRequests('6570f8282394b47863ad4cfe');
        console.log(JSON.stringify(response.data));
    };

    const respondToFrinedRequest = async () => {
        let body = {
            senderUserId: '6570f7f82394b47863ad4cfa',
            receiverUserId: '6570f8282394b47863ad4cfe',
            action: 'accept',
        };
        let response = await respondToFriendRequest(body);
        console.log(JSON.stringify(response.data));
    };

    const removeFriendFromList = async () => {
        let body = {
            userId: '6570f8282394b47863ad4cfe',
            friendId: '6570f7f82394b47863ad4cfa',
        };
        let response = await removeFriend(body);
        console.log(JSON.stringify(response.data));
    };

    return (
        <View style={styles.container}>
            <OvalButton title="Invite user" onPress={() => addUserAsFriend()} />
            <OvalButton title="Get users friends requests" onPress={() => getUserFriends()} />
            <OvalButton title="Respond to friend request" onPress={() => respondToFrinedRequest()} />
            <OvalButton title="Remove friend" onPress={() => removeFriendFromList()} />
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});
