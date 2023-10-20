import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

const AddUserButton = ({ onPress, error }: any) => {
    const { colors } = useTheme();
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
                <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.avatar}>
                    <Ionicons name="person-circle-sharp" size={35} color={'white'} />
                </LinearGradient>
                <Text fontSize={14} bold textDecorationLine={'underline'}>
                    Invite
                </Text>
            </TouchableOpacity>
            {error && (
                <Text fontSize={16} bold color={'red'}>
                    Required if event is private
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: 70,
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AddUserButton;
