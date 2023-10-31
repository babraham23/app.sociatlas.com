import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';

const ImageCounter = ({ index, numOfImages }: any) => {
    return (
        <View style={styles.container}>
            <Text fontSize={14} bold color={'white'}>
                1
            </Text>
            <Text fontSize={14} bold color={'white'}>
                {' '}
                /{' '}
            </Text>
            <Text fontSize={14} bold color={'white'}>
                {numOfImages}
            </Text>
        </View>
    );
};

export default ImageCounter;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 60,
        height: 25,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        opacity: 0.8,
    },
});
