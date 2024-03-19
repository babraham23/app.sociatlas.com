import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MessageBubble = (props: any) => {
    // console.log('props', props);
    let message = props.currentMessage.text;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

export default MessageBubble;

const styles = StyleSheet.create({
    container: {
        maxWidth: '60%',
        backgroundColor: '#4ba6f5',
        padding: 16,
        borderRadius: 8,
    },
    text: {
        color: 'white',
    },
});
