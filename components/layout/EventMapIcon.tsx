import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    icon: string;
    title: string;
    image?: string;
    video?: any;
};

let dummyImage = 'https://picsum.photos/200/200';
let dummyVideo = require(`../../assets/video/video.mp4`);

const EventMapIcon = ({ icon, title, image, video }: Props) => {
    const { colors } = useTheme();
    return (
        <LinearGradient colors={[`${'#ff4500'}`, `${'#FF0016'}`]} style={styles.container}>
            {icon && <Text fontSize={70}>{icon}</Text>}
            {image && <Image source={{ uri: dummyImage }} style={styles.image} />}
            {video && <Video source={dummyVideo} style={styles.image} resizeMode={ResizeMode.COVER} shouldPlay isLooping />}
            <Text center bold lineHeight={16} numberOfLines={4} color={'white'}>
                {title}
            </Text>
        </LinearGradient>
    );
};

export default EventMapIcon;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        marginBottom: 5,
    },
});
