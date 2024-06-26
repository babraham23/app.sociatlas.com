import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { generateReadableRandomColor, generateReadableRandomColorForLight } from '../../functions/helpers';
import { useTheme } from '../../hooks/useTheme';

const username = 'username@username';
const message = 'This is a really long message to determine if the flex box text does wrap around the component - please let me know if this works or not';

const TestScreen = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/200/200' }} />
            <Text style={styles.message}>
                <Text bold color={colors.randomColor} style={styles.username}>
                    {username}
                </Text>
                {`: ${message}`}
            </Text>
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flexDirection: 'row',
        paddingHorizontal: 10,
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
