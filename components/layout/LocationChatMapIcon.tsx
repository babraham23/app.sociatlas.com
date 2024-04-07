import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';

const LocationChatMapIcon = () => {
    const { colors } = useTheme();
    return (
        <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.container}>
            <Text fontSize={60}>💬</Text>
        </LinearGradient>
    );
};

export default LocationChatMapIcon;

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
