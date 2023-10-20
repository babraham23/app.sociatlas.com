import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import FriendListSearchInput from '../inputs/friendListSearch';


type Props = {
    scrollYValue?: any;
    onChangeText?: any;
    flagImage?: any;
    placeholder?: string;
    onInfoPress?: any;
    onBackPress?: any;
};

const FriendListScrollInput = ({ scrollYValue, onChangeText, placeholder, flagImage, onBackPress }: Props) => {
    let event = scrollYValue;

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
            <FriendListSearchInput placeholder={placeholder} onChangeText={onChangeText} flagImage={flagImage} onBackPress={onBackPress} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // top: Platform.OS === 'ios' ? 30 : 30,
        width: '100%',
        zIndex: 80,
        paddingHorizontal: 20,
    },
    wrapper: {},
    buttonWrapper: {
        flexDirection: 'row',
    },
    text: {
        // position: 'absolute',
        // top: 55,
        padding: 10,
        backgroundColor: 'black',
        width: '100%',
        // bottom: 20,
    },
});

export default FriendListScrollInput;
