import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const RoundButton = ({ onPress }: any) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.container}>
                <AntDesign name="right" size={18} color="white" />
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default RoundButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
