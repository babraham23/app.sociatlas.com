import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import OvalButton from './ovalButton';


const PopUpButton = ({title, onPress}: any) => {
    const { colors, borderRadius } = useTheme();
    return (
        <Animatable.View animation="fadeInUpBig" style={[styles.animatedContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={[styles.button, { borderRadius: borderRadius.button }]}>
                    <Text bold color={'white'} style={styles.buttonText}>
                        Lets GOOO!!!
                    </Text>
                </LinearGradient>
            </TouchableOpacity> */}
            <OvalButton title={title} onPress={onPress} />
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: '#5cdb5c',
        fontSize: 18,
    },
    animatedContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
        borderTopWidth: 1,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        paddingBottom: 40,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
});

export default PopUpButton;
