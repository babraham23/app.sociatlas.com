import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

// generate some lipsum
const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl';

const SenderMessage = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.avatar} />
            <View style={styles.bubbleWrapper}>
                <View style={[styles.messageBubble, { backgroundColor: colors.background, borderRadius: 15 }]}>
                    <Text>{lipsum + lipsum}</Text>
                </View>
                <View style={styles.bottomWrapper}>
                    <Text>Date</Text>
                    <View style={styles.reaction} />
                </View>
            </View>
        </View>
    );
};

export default SenderMessage;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        marginRight: 10,
    },
    bubbleWrapper: {},
    messageBubble: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
    },
    reaction: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        marginRight: 30,
        position: 'absolute',
        right: 10,
        top: -10,
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
