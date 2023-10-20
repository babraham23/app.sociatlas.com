import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { Feather, FontAwesome } from '@expo/vector-icons';

export const MapButton = ({ onPress, title, clear, style, map }: any) => {
    const { colors }: any = useTheme();
    return (
        <TouchableOpacity activeOpacity={0.8} style={[style]} onPress={onPress}>
            <LinearGradient colors={[`${colors.primary}70`, colors.primary]} style={styles.mapWrapper}>
                <Text style={[styles.text, { color: colors.card }]}>{title}</Text>
                <View style={{ marginLeft: 10 }}>{map ? <FontAwesome name="map-o" size={14} color={colors.card} /> : <Feather name="list" size={14} color={colors.card} />}</View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    mapWrapper: {
        flexDirection: 'row',
        width: 85,
        height: 30,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});
