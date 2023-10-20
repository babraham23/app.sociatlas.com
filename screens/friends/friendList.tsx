import { Animated, FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import FriendBanner from '../../components/layout/friendBanner';
import FriendListScrollInput from '../../components/layout/friendListScrollInput';
import { useNavigation } from '@react-navigation/native';
import { useCreateEventContext } from '../../context/createEvent.context';

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

const FriendList = () => {
    const [scrollYValue] = useState(new Animated.Value(0));
    const navigation: any = useNavigation();
    const { invitees, setInvitees } = useCreateEventContext();

    const handleSelection = (item: any) => {
        // Add user to the array if not already selected
        if (!invitees.includes(item)) {
            setInvitees([...invitees, item]);
        }
    };

    const onRemovePress = (item: any) => {
        // Remove user from the array
        setInvitees(invitees.filter((user: any) => user._id !== item._id));
    };

    return (
        <View style={styles.container}>
            <FriendListScrollInput
                placeholder="Search username or name..."
                scrollYValue={scrollYValue}
                onBackPress={() => navigation.goBack()}
                // onChangeText={handleSearch}
            />
            <FlatList
                data={dd}
                indicatorStyle="black"
                snapToEnd={false}
                decelerationRate="normal"
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], { useNativeDriver: false })}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item }) => (
                    <FriendBanner
                        onPress={() => handleSelection(item)}
                        key={item._id}
                        onRemovePress={() => onRemovePress(item)}
                        name={item.name}
                        username={item.username}
                        profilePic={item.profilePic}
                        _id={item._id}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default FriendList;

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
