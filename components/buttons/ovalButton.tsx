import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

interface Props {
    title?: string;
    onPress?: () => void;
    secondary?: boolean;
    style?: any;
}

const OvalButton = ({ title, onPress, secondary, style }: Props) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[style, styles.container, { backgroundColor: secondary ? colors.background : colors.text, borderColor: 'black', borderWidth: secondary ? 2 : 0 }]}
        >
            <Text bold color={secondary ? colors.text : colors.ovalButtonTextColor}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default OvalButton;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
});
