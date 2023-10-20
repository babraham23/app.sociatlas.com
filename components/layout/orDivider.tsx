import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const OrDivider = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.divider, { backgroundColor: colors.text }]} />
            <Text center bold style={styles.text}>
                or
            </Text>
            <View style={[styles.divider, { backgroundColor: colors.text }]} />
        </View>
    );
};

export default OrDivider;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
    },
    divider: {
        width: '40%',
        height: 1,
        marginHorizontal: 10,
        flexShrink: 1,
    },
    text: {},
});
