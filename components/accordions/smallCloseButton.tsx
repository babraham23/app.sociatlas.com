import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const SmallCloseButton = ({ onPress, style, size }: any) => {
    const { colors }: any = useTheme();
    const navigation = useNavigation();
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <MaterialCommunityIcons name="window-close" size={11} color={'white'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 15,
        height: 15,
        backgroundColor: 'red',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default SmallCloseButton;
