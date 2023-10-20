import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const Card = ({ children, style }: any) => {
    const { colors, borderRadius } = useTheme();
    return <View style={[style, styles.card, { backgroundColor: colors.card, borderRadius: borderRadius.card, borderColor: colors.border }]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
