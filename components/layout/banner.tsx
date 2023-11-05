import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images } from '../../style/images';

const Banner = () => {
    return (
        <View>
            <ImageBackground source={Images.BANNER} resizeMode="cover" style={styles.image}>
                <Text>Banner</Text>
            </ImageBackground>
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
    container: {},
    image: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
