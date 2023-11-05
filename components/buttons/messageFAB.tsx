import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const MessageFab = ({ onPress, style }: any) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
            <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.container}>
                <MaterialCommunityIcons name="message-plus" size={24} color="white" />
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default MessageFab;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});
