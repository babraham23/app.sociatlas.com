import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { Images } from '../../style/images';

const MarkerCenter = ({ style }: any) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, style, { backgroundColor: colors.primary }]}>
            <Text style={styles.icon}>🎮</Text>
        </View>
    );
};

const BigMapMarker = ({scaleStyle}: any) => {
    return (
        <Animated.View style={scaleStyle} >
            <Image source={Images.MAP_ICON} style={styles.pin} />
            <MarkerCenter style={styles.marker} />
        </Animated.View>
    );
};

export default BigMapMarker;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 27,
    },
    pin: {
        width: 55,
        height: 55,
        resizeMode: 'contain',
    },
    marker: {
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icon: {
        fontSize: 20,
        zIndex: 99,
    },
    secondIcon: {
        fontSize: 15,
        position: 'absolute',
        top: 15,
        left: 0,
        zIndex: 98,
    },
    thirdIcon: {
        fontSize: 15,
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 97,
    },
});
