import React, { useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Video } from 'expo-av';

const IMAGE_MAX_HEIGHT = 250;

let { width } = Dimensions.get('window');

const ImageFadeScroll = ({ children, style, image, video }: any) => {
    const { colors }: any = useTheme();
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [0, -300],
        extrapolate: 'clamp',
    });

    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    return (
        <>
            {image ? (
                <View style={styles.container}>
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingTop: IMAGE_MAX_HEIGHT - 32, backgroundColor: colors.background }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                            useNativeDriver: true,
                        })}
                        style={{ backgroundColor: colors.background }}
                    >
                        <View style={[style, styles.content, { backgroundColor: colors.card }]}>{children}</View>
                    </Animated.ScrollView>
                    {image && (
                        <Animated.View style={[styles.header, { backgroundColor: colors.backgroundColor, transform: [{ translateY: headerTranslateY }] }]}>
                            <Animated.Image
                                style={[
                                    styles.headerBackground,
                                    {
                                        transform: [{ translateY: imageTranslateY }],
                                    },
                                ]}
                                source={{ uri: image }}
                            />
                        </Animated.View>
                    )}
                    {video && (
                        <Animated.View style={[styles.header, { backgroundColor: colors.backgroundColor, transform: [{ translateY: headerTranslateY }] }]}>
                            <Video style={[styles.headerBackground]} source={{ uri: video }} />
                        </Animated.View>
                    )}
                </View>
            ) : (
                <ScrollView style={[style, styles.noImageContent, { backgroundColor: colors.card }]}>{children}</ScrollView>
            )}
        </>
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
        // marginTop: 30,
        height: IMAGE_MAX_HEIGHT,
        width,
        resizeMode: 'cover',
    },
    content: {
        paddingTop: 20,
        paddingBottom: 170,
    },
    noImageContent: {},
});

export default ImageFadeScroll;
