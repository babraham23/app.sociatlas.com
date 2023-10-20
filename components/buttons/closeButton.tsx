import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

type Props = {
    onPress: () => void;
    style?: any;
};

const CloseButton = ({ onPress, style }: Props) => {
    const { colors } = useTheme()
    return (
        <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
            <AntDesign name="close" size={20} color={colors.text} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default CloseButton;
