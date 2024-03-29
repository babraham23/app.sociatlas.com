import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

type Props = {
    userName: string;
    userHandle: string;
    onPress: () => void;
}

const MessageFriendRequestIcon = ({ userName, userHandle, onPress }: Props) => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.container, { borderBottomColor: colors.border }]}>
            <View style={styles.avatar} />
            <View style={styles.textContainer}>
                <View style={styles.top}>
                    <View style={styles.left}>
                        <View style={styles.nameWrapper} >
                            <Text numberOfLines={1} bold>{userName}</Text>
                        </View>
                        <View style={styles.nameWrapper} >
                            <Text numberOfLines={1} color={colors.dark_grey} >@{userHandle}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text color={colors.dark_grey} numberOfLines={1} >Would like to be your friend 😃</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MessageFriendRequestIcon;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
    },
    textContainer: {
        width: '80%',
    },
    top: {
        // backgroundColor: 'red',
        flexDirection: 'row',
    },
    left: {
        width: '75%',
        height: 30,
        // backgroundColor: 'green',
        flexDirection: 'row',
    },
    nameWrapper: {
        maxWidth: '50%',
    },
    right: {
        width: '25%',
        // backgroundColor: 'yellow',
        height: 30,
        alignItems: 'flex-end',
    },
    bottom: {
        width: '100%',
        // backgroundColor: 'red',
        height: 30,
    },
});
