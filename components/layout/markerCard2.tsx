import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { ResizeMode, Video } from 'expo-av';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

type Props = {
    video?: any;
    image?: any;
    title?: string;
    description?: any;
    interests?: any;
};

const MarkerCard = ({ video, image, title, description, interests }: Props) => {
    const { colors, borderRadius } = useTheme();
    // console.log('image', image)
    return (
        <View style={[styles.container, { borderRadius: 15, backgroundColor: colors.card, borderColor: colors.primary, shadowColor: colors.primary }]}>
            {video ? (
                <Video source={video} rate={1.0} isMuted={false} resizeMode={ResizeMode.COVER} shouldPlay isLooping style={styles.video} />
            ) : // <Image source={{ uri: image }} style={styles.marker} />
            image ? (
                <Image source={{ uri: image }} style={styles.marker} />
            ) : null}
            <View style={[image ? styles.interestWrapper : styles.interestWrapperNoImage, { borderColor: colors.border, backgroundColor: '' }]}>
                {interests !== undefined &&
                    interests.map((interest: any) => (
                        <View key={interest._id} style={styles.wrapper}>
                            {interest.image ? (
                                <Image source={{ uri: interest.image }} style={[styles.image, { borderColor: colors.border }]} />
                            ) : (
                                <Text style={styles.icon} fontSize={15}>
                                    {interest.icon}
                                </Text>
                            )}
                        </View>
                    ))}
            </View>
            <View style={styles.content}>
                <Text fontSize={13} lineHeight={15} bold numberOfLines={4} style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.description} fontSize={13} lineHeight={15} numberOfLines={4}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

export default MarkerCard;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 7,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    video: {
        // width: 120,
        height: 170,
        borderRadius: 15,
    },
    marker: {
        // width: 120,
        height: 170,
        borderRadius: 15,
    },
    content: {
        paddingVertical: 5,
    },
    description: {
        paddingTop: 5,
    },
    interestWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        position: 'absolute',
        zIndex: 99,
        top: 1,
        right: -5,
    },
    interestWrapperNoImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 5,
        borderRadius: 20,
    },
    title: {
        width: 120,
    },
    icon: {
        paddingRight: 5,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 0.5,
    },
    wrapper: {
        // backgroundColor: 'red'
    },
});
