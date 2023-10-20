import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../style/typography';

const MapMarker = ({ color, size, icon }: any) => {
    const markerSize = size || 40;
    const markerStyle = {
        width: markerSize,
        height: markerSize,
        borderRadius: markerSize / 2,
        // backgroundColor: color || 'red',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    };

    return (
        <View style={styles.container}>
            <View style={[styles.marker, markerStyle]}>
                <Text>{icon}</Text>
            </View>
            <View style={styles.pointer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    marker: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointer: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftWidth: 5,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        borderLeftColor: 'transparent',
        transform: [{ rotate: '180deg' }],
    },
});

export default MapMarker;
