import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { ConvertDate } from '../../functions/helpers';
import { ResizeMode, Video } from 'expo-av';

type Props = {
    title?: string;
    description?: string;
    price?: number;
    maxCapacity?: number;
    currentAttendees?: number;
    date?: any;
    image?: string;
    video?: any;
    interests?: any;
    onPress?: any;
};

const EventCard = ({ title, description, price, maxCapacity, currentAttendees, date, image, video, interests, onPress }: Props) => {
    const { colors, borderRadius } = useTheme();

    const renderMedia = () => {
        if (video === 1) {
            return <Video source={require(`../../assets/video/video.mp4`)} rate={1.0} isMuted={false} resizeMode={ResizeMode.COVER} shouldPlay isLooping style={styles.video} />;
        } else if (image !== "") {
            return <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.image} />;
        } else return null;
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card, borderRadius: borderRadius.card }]}>
            <View style={[styles.interestWrapper, { borderColor: colors.border, backgroundColor: '' }]} >
                {interests !== undefined &&
                    interests.map((interest: any) => (
                        <Text key={interest._id}>
                            {interest.icon}
                        </Text>
                    ))}
            </View>
            {renderMedia()}
            <View style={styles.contentTop}>
                <Text style={styles.title} bold fontSize={18} numberOfLines={4}>
                    {title}
                </Text>
                <Text style={styles.decription} numberOfLines={4}>
                    {description}
                </Text>
            </View>
            <View style={styles.footer}>
                <Text fontSize={14} style={styles.longText}>
                    {currentAttendees}/{maxCapacity} going
                </Text>
                <Text fontSize={14}>{ConvertDate(date)}</Text>
            </View>
            {price !== undefined && price > 0 ? <Text fontSize={14}>£{price} entrance</Text> : null}
        </TouchableOpacity>
    );
};

export default EventCard;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 16,
    },
    interestWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        // borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 20,
        position: 'absolute',
        zIndex: 99,
        top: 10,
        right: 10,
    },
    video: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    title: {
        width: '70%',
    },
    decription: {
        paddingTop: 10,
    },
    contentTop: {
        paddingVertical: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    longText: {
        // width: '25%',
    },
});
