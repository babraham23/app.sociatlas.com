import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GuestAvatar from './guestAvatar';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const MessageFriendBanner = ({ onPress, name, username, profilePic }: any) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <GuestAvatar profilePic={profilePic} noEdit marginTop={1} name={name} username={username} />
            <View style={styles.nameWrapper}>
                <Text fontSize={18}>{name}</Text>
                <Text fontSize={18} lineHeight={18}>
                    @{username}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default MessageFriendBanner;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    nameWrapper: {
        width: '70%',
    },
    selected: {
        width: 25,
        height: 25,
        borderRadius: 13,
        zIndex: 1,
        borderWidth: 1.5,
    },
});
