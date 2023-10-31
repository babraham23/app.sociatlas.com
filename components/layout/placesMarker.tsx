import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images } from '../../style/images';

const PlacesMarker = ({ icon }: any) => {
    return (
        <View>
            <Image source={icon} style={styles.icon} />
        </View>
    );
};

export default PlacesMarker;

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});
