import { Linking, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import ImageFadeScroll from '../../components/scrolls/ImageFadeScroll';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';
import PopUpButton from '../../components/buttons/popUpButton';

// const event = {
//     additionalInfo: 'Bring your own laptop for hands-on experience!',
//     currentAttendees: 2,
//     date: 1687455483,
//     description: 'This is the best video game masterclass for beginners',
//     id: '24',
//     image: 'https://picsum.photos/200/200',
//     interests: [{ icon: '🏎', id: 2, title: 'Motor Sports' }],
//     location: { address: '123 This Road, Newcastle, NE1 5BY, United Kingdom', latitude: 54.969450152452, longitude: -1.6194726722736448 },
//     maxCapacity: 23,
//     organizer: { avatar: 'https://example.com/johndoe-avatar.jpg', email: 'johndoe@example.com', name: 'John Doe' },
//     price: 15.99,
//     socialMedia: { facebook: 'https://www.facebook.com/eventpage', instagram: 'https://www.instagram.com/eventpage', twitter: 'https://www.twitter.com/eventpage' },
//     title: 'Video Game Masterclass',
//     video: 1,
// };

const SelectedEventScreen = ({ event }: any) => {
    const { colors } = useTheme();
    if (!event) {
        return null;
    }

    const { title, description, date, maxCapacity, currentAttendees, interests, location, image, video, organizer, price, socialMedia, additionalInfo } = event;

    const formatDate = (timestamp: any) => {
        const options: any = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(timestamp * 1000).toLocaleString('en-US', options);
    };

    return (
        <>
            <ImageFadeScroll image={image} video={video}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text bold fontSize={20} style={styles.title}>
                            {title}
                        </Text>
                        <View style={[styles.interestWrapper, { borderColor: colors.border }]}>
                            {interests !== undefined &&
                                interests.map((interest: any) => (
                                    <Text fontSize={15} key={interest.id}>
                                        {interest.icon}
                                    </Text>
                                ))}
                        </View>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                    <View style={[styles.infoContainer, { borderColor: colors.border }]}>
                            <Text style={styles.textPadding} >Organizer: {organizer.name}</Text>
                        <Text>{formatDate(date)}</Text>
                        <Text style={styles.textPadding} >{new Date(date * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>

                        <Text style={styles.textPadding} >
                            {currentAttendees}/{maxCapacity} going
                        </Text>
                        {price ? <Text  style={styles.textPadding}  >Ticket Price: ${price.toFixed(2)}</Text> : null}
                    </View>

                    <View style={[styles.additionWrapper, { borderColor: colors.border }]}>
                        <Text style={styles.additionalInfo} bold>
                            Additional Info:
                        </Text>
                        <Text style={styles.additionalInfo} lineHeight={29}>
                            {additionalInfo}
                        </Text>
                    </View>
                </View>
            </ImageFadeScroll>
            <PopUpButton title={'Join'} />
        </>
    );
};

export default SelectedEventScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 16,
    },
    title: {
        marginTop: 16,
        width: '70%',
    },
    description: {
        marginTop: 8,
        paddingBottom: 20,
    },
    infoContainer: {
        borderTopWidth: 0.5,
        paddingTop: 20,
        // paddingBottom: 20,
    },
    interestWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: 10,
    },
    additionalInfo: {
        fontStyle: 'italic',
        color: '#777',
    },
    additionWrapper: {
        borderTopWidth: 0.5,
        paddingTop: 16,
    },
    textPadding: {
        paddingBottom: 20,
    },
});
