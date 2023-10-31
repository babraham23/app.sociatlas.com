import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { useUserContext } from '../../context/user.context';

const Avatar = ({ edit, onPress, width, height }: any) => {
    const { colors } = useTheme();
    const { user } = useUserContext();

    let fontSize = width / 2;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
            {user.profilePic ? (
                <Image source={{ uri: user.profilePic }} style={[styles.image, { width, height }]} />
            ) : (
                <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={[styles.avatar, { width, height }]}>
                    <Text fontSize={fontSize} color={'white'}>
                        {user.name.charAt(0).toUpperCase()}
                    </Text>
                </LinearGradient>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginRight: 10,
    },
    avatar: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 50,
        resizeMode: 'cover',
    },
});

export default Avatar;
