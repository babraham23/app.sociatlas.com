import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const QuickJoinButton = ({ onPress }: any) => {
    const { colors, borderRadius } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <LinearGradient colors={[`#5cdb5c`, `#5cdb5cad`]} style={[styles.container, { borderRadius: 30 }]}>
                <Text bold color={"white"} >Quick Join</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default QuickJoinButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        borderRadius: 20,
        marginTop: 10,
    },
});
