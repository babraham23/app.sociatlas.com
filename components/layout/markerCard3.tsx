import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';
import { ResizeMode, Video } from 'expo-av';

type Props = {
    icon: string;
    title: string;
    image?: string;
    video?: any;
};

let dummyImage = 'https://picsum.photos/200/200';
let dummyVideo = require(`../../assets/video/video.mp4`);

const MarkerCard3 = ({ icon, title, image, video }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { borderColor: colors.primary, backgroundColor: colors.card }]}>
            {icon && <Text fontSize={70}>{icon}</Text>}
            {image && <Image source={{ uri: dummyImage }} style={styles.image} />}
            {video && <Video source={dummyVideo} style={styles.image} resizeMode={ResizeMode.COVER} shouldPlay isLooping />}
            <Text center bold lineHeight={16} numberOfLines={4}>
                {title}
            </Text>
        </View>
    );
};

export default MarkerCard3;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        padding: 5,
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
