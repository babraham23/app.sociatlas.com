import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Video } from 'expo-av';

type Props = {
    video?: any;
    image?: any;
};

const MarkerCard = ({ video, image }: Props) => {
    return (
        <View>
            {video ? (
                <Video source={video} rate={1.0} isMuted={false} resizeMode="cover" shouldPlay isLooping style={styles.video} />
            ) : (
                <Image source={{ uri: image }} style={styles.marker} />
            )}
        </View>
    );
};

export default MarkerCard;

const styles = StyleSheet.create({
    video: {
        width: 120,
        height: 150,
        borderRadius: 15,
    },
    marker: {
        width: 120,
        height: 150,
        borderRadius: 15,
    },
});
