import React, { useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { GET_PLACES_PHOTOS } from '../../api/google-endpoints';
import ImageCounter from '../layout/imageCounter';
import PlacesHeader from '../headers/placesHeader';

const IMAGE_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 85;
const HEADER_SCROLL_DISTANCE = IMAGE_MAX_HEIGHT - HEADER_MIN_HEIGHT;

let { width } = Dimensions.get('window');

const PlacesScroll = ({ children, title, hideClose, style, images }: any) => {
    const { colors }: any = useTheme();
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE + 40],
        outputRange: [0, -HEADER_SCROLL_DISTANCE - 35],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, 150, 200],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });

    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE + 30],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <PlacesHeader hideClose={hideClose} title={title} />
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: IMAGE_MAX_HEIGHT - 32 }}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: true,
                })}
            >
                <View style={style}>{children}</View>
            </Animated.ScrollView>
            <Animated.View style={[styles.header, { backgroundColor: colors.backgroundColor, transform: [{ translateY: headerTranslateY }] }]}>
                <ScrollView
                    bounces={false}
                    decelerationRate={'fast'}
                    horizontal
                    style={{ flex: 1 }}
                    snapToInterval={width}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={(e) => {console.log(e.)}}
                    scrollEventThrottle={16}
                >
                    {images.map((image: any, index: number) => {
                        return (
                            <Animated.Image
                                key={index}
                                style={[
                                    styles.headerBackground,
                                    {
                                        opacity: imageOpacity,
                                        transform: [{ translateY: imageTranslateY }],
                                    },
                                ]}
                                source={{ uri: GET_PLACES_PHOTOS(image.photo_reference) }}
                            />
                        );
                    })}
                </ScrollView>
                {/* <Animated.View style={[styles.indexBox, { opacity: imageOpacity }]}>
                    <ImageCounter index={'index'} numOfImages={images.length} />
                </Animated.View> */}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        height: IMAGE_MAX_HEIGHT + 20,
    },
    headerBackground: {
        alignSelf: 'center',
        marginTop: 45,
        height: IMAGE_MAX_HEIGHT,
        width,
        resizeMode: 'cover',
    },
    indexBox: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
});

export default PlacesScroll;
