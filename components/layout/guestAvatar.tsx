import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { useUserContext } from '../../context/user.context';
import { AntDesign } from '@expo/vector-icons';

const GuestAvatar = ({ onEditPress, noEdit, marginTop, profilePic, name }: any) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { marginTop: marginTop ? marginTop : 10 } ]}>
            {!noEdit && <TouchableOpacity onPress={onEditPress} activeOpacity={1} style={styles.closeWrapper}>
                <AntDesign name="close" size={16} color={'white'} />
            </TouchableOpacity>}
            {profilePic ? (
                <Image source={{ uri: profilePic }} style={[styles.image]} />
            ) : (
                <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.avatar}>
                    {name && <Text fontSize={28} color={'white'}>
                        {name.charAt(0).toUpperCase()}
                    </Text>}
                </LinearGradient>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    closeWrapper: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        position: 'absolute',
        right: -5,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        position: 'relative',
        marginRight: 7,
        // marginTop: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover',
    },
});

export default GuestAvatar;
