import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedButton = () => {
    const { colors } = useTheme();
    const translateY = useRef(new Animated.Value(100)).current;

    const animateButton = () => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            speed: 0.09, // Adjust the speed of the animation (1 is default)
        }).start();
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            animateButton();
        }, 200); // Delay by 0.5 seconds
        return () => clearTimeout(delay);
    }, []);

    return (
        <Animated.View style={[styles.animatedContainer, { backgroundColor: colors.card, borderColor: colors.dark_grey, transform: [{ translateY: translateY }] }]}>
            <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.button}>
                    <Text bold color={'white'} style={styles.buttonText}>
                        Lets GOOO!!!
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        paddingBottom: 40,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 15,
    },
});

export default AnimatedButton;
