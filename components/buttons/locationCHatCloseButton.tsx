import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

type Props = {
    onPress: () => void;
    style?: any;
};

const LocationChatCloseButton = ({ onPress, style }: Props) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
            <AntDesign name="close" size={25} color={colors.text} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slightly transparent background
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LocationChatCloseButton;
