import { StyleSheet, View } from 'react-native';
import React from 'react';
import StandardHeader from '../../components/headers/standardHeader';
import Banner from '../../components/layout/banner';
import Avatar from '../../components/layout/avatar';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const FriendProfileScreen = () => {
    const { colors } = useTheme();
    return (
        <>
            <StandardHeader title="Jane@doe" />
            <View>
                <Banner />
                <View style={[styles.avatarWrapper, { backgroundColor: colors.background }]}>
                    <Avatar width={100} height={100} marginRight={1} />
                </View>
                <View style={styles.contentWrapper} >
                    <Text bold fontSize={20} >Jane</Text>
                    <Text color={colors.font_grey}  >@doe</Text>
                    <Text lineHeight={23} style={styles.bio}  >{lorem}</Text>
                </View>
            </View>
        </>
    );
};

export default FriendProfileScreen;

const styles = StyleSheet.create({
    avatarWrapper: {
        width: 105,
        height: 105,
        justifyContent: 'center',
        borderRadius: 100,
        alignItems: 'center',
        position: 'absolute',
        top: 150,
        left: 15,
    },
    contentWrapper: {
        marginTop: 50,
        padding: 20
    },
    bio: {
        marginTop: 10,
    }
});
