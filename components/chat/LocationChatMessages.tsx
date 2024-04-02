import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';

const TestScreen = ({ message, username, name }: any) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/200/200' }} />
            <Text style={styles.message}>
                <Text bold color={colors.primary} style={styles.username}>
                    {username}@{name}
                </Text>
                {`: ${message}`}
            </Text>
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 5,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 8,
    },
    username: {
        fontWeight: 'bold',
        color: 'red',
    },
    message: {
        flexShrink: 1,
        lineHeight: 20,
    },
});
