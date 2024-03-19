import { Animated, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FriendListScrollInput from '../../components/layout/friendListScrollInput';
import { useNavigation } from '@react-navigation/native';
import { useCreateEventContext } from '../../context/createEvent.context';
import MessageFriendBanner from '../../components/layout/messageFriendBanner';
import { useFriendsContext } from '../../context/friends.context';

const MessagesFriendList = () => {
    const [scrollYValue] = useState(new Animated.Value(0));
    const navigation: any = useNavigation();
    const { getAllFriends, friends } = useFriendsContext();

    useEffect(() => {
        getAllFriends();
    }, []);

    const handlePress = (friend: any) => {
        
        // check to see if that room exists
        // create a custom room id by combining the user id and the friend id
        // if it exists navigate to that room

        // if not create a new room
        console.log('friend -->', friend._id);
    }

    return (
        <View style={styles.container}>
            <FriendListScrollInput
                placeholder="Search username or name..."
                scrollYValue={scrollYValue}
                onBackPress={() => navigation.goBack()}
                // onChangeText={handleSearch}
            />
            <FlatList
                data={friends}
                indicatorStyle="black"
                snapToEnd={false}
                decelerationRate="normal"
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], { useNativeDriver: false })}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item }: { item: { name: string, username: string, profilePic: string, _id: string } }) => (
                    <MessageFriendBanner
                        name={item.name}
                        username={item.username}
                        profilePic={item.profilePic}
                        _id={item._id}
                        onPress={() => handlePress(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MessagesFriendList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 100,
        paddingBottom: 100,
        paddingHorizontal: 16,
    },
});
