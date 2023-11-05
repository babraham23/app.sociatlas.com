import { Animated, FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import FriendListScrollInput from '../../components/layout/friendListScrollInput';
import { useNavigation } from '@react-navigation/native';
import MessageFriendBanner from '../../components/layout/messageFriendBanner';
import { searchForUser } from '../../api/user/user.requests';

const dd = [
    { _id: 1, name: 'John Doe', username: 'johndoe123', profilePic: '' },
    { _id: 2, name: 'Alice Smith', username: 'alicesmith45', profilePic: '' },
    { _id: 3, name: 'Bob Johnson', username: 'bob.johnson', profilePic: '' },
    { _id: 4, name: 'Emily Davis', username: 'emilydavis88', profilePic: '' },
    { _id: 5, name: 'Michael Brown', username: 'mikebrown22', profilePic: '' },
    { _id: 6, name: 'Sara Wilson', username: 'sarawilson77', profilePic: '' },
    { _id: 7, name: 'David Lee', username: 'davidlee123', profilePic: '' },
    { _id: 8, name: 'Emma White', username: 'emmawhite55', profilePic: '' },
    { _id: 9, name: 'James Smith', username: 'jamessmith34', profilePic: '' },
    { _id: 10, name: 'Olivia Johnson', username: 'oliviaj', profilePic: '' },
    { _id: 11, name: 'William Davis', username: 'willdavis99', profilePic: '' },
    { _id: 12, name: 'Sophia Brown', username: 'sophiabrown', profilePic: '' },
    { _id: 13, name: 'Daniel Taylor', username: 'danieltaylor123', profilePic: '' },
    { _id: 14, name: 'Ava Miller', username: 'avamiller', profilePic: '' },
    { _id: 15, name: 'Liam Wilson', username: 'liamwilson78', profilePic: '' },
];

const MyFriendList = () => {
    const [scrollYValue] = useState(new Animated.Value(0));
    const navigation: any = useNavigation();
    const [ searchResults, setSearchResults ] = useState([]);

    const handleNavigation = () => {
        navigation.goBack();
        navigation.navigate('FriendProfileScreen');
    };

    const searchUsers = async (search: string) => {
        if (search.length >= 3) {
            let body = { searchTerm: search };
            try {
                let response = await searchForUser(body);
                setSearchResults(response.data);
            } catch {
                console.log('error');
            }
        } else setSearchResults([]);
    };

    return (
        <View style={styles.container}>
            <FriendListScrollInput placeholder="Search username or name..." scrollYValue={scrollYValue} onBackPress={() => navigation.goBack()} onChangeText={searchUsers} />
            <FlatList
                data={searchResults}
                indicatorStyle="black"
                snapToEnd={false}
                decelerationRate="normal"
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], { useNativeDriver: false })}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item }) => (
                    <MessageFriendBanner onPress={handleNavigation} key={item._id} name={item.name} username={item.username} profilePic={item.profilePic} _id={item._id} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MyFriendList;

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
