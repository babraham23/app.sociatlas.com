import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import GooglePlacesInput from './googleAreaInput';
import ScrollBar from '../scrollbar';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { Feather, FontAwesome } from '@expo/vector-icons';

type Props = {
    scrollYValue?: any;
    onChangeText?: any;
    flagImage?: any;
    placeholder?: string;
    onInfoPress?: any;
};

const AnimatedSearchInput = ({ scrollYValue, onChangeText, placeholder, flagImage, onInfoPress }: Props) => {
    let event = scrollYValue;
    const { colors } = useTheme();
    const navigation: any = useNavigation();

    const clampedScroll = Animated.diffClamp(
        Animated.add(
            event.interpolate({
                inputRange: [0, 5],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            new Animated.Value(0)
        ),
        0,
        50
    );

    const searchBarTranslate = clampedScroll.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -250],
        extrapolate: 'clamp',
    });

    const searchBarOpacity = clampedScroll.interpolate({
        inputRange: [0, 20],
        outputRange: [2, 0],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        {
                            translateY: searchBarTranslate,
                        },
                    ],
                    opacity: searchBarOpacity,
                },
            ]}
        >
            <View style={styles.wrapper}>
                <GooglePlacesInput style={styles.search} />
                <TouchableOpacity
                    activeOpacity={9}
                    onPress={() => navigation.toggleDrawer()}
                    style={[styles.burgerWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                    <Feather name="menu" size={34} color={colors.text} />
                </TouchableOpacity>
            </View>
            <ScrollBar style={styles.scrollbar} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        zIndex: 80,
        width: '100%',
    },
    wrapper: {
        flexDirection: 'row',
        marginRight: 20,
        marginTop: 15,
    },
    search: {
        marginLeft: 20,
        paddingBottom: 10,
    },
    buttonWrapper: {
        flexDirection: 'row',
    },
    text: {
        padding: 10,
        backgroundColor: 'black',
        width: '100%',
    },
    scrollbar: {
        width: '100%',
    },
    burgerWrapper: {
        width: '15%',
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        borderWidth: 0.5,
    },
});

export default AnimatedSearchInput;
