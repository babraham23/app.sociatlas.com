import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Animated, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useMapContext } from '../../context/map.context';
import { useTheme } from '../../hooks/useTheme';
import { useEventsContext } from '../../context/events.context';
import MapCard from '../layout/mapCard';
import { ConvertDateadTime, SmallCardConvertDate } from '../../functions/helpers';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 70;
const CARD_WIDTH = width * 0.8;

type Props = {
    onMapPress?: any;
};

const ExploreScreen = ({ onMapPress }: Props) => {
    const _map: any = React.useRef(null);
    const { mapRegion, setMapRegion } = useMapContext();
    const { events } = useEventsContext();
    const { colors, borderRadius } = useTheme();
    const [expandedIndexes, setExpandedIndexes] = useState<{ [key: string]: boolean }>({});
    const cardSizes = useState<{ [key: string]: Animated.Value }>({} as { [key: string]: Animated.Value })[0];

    const handlePress = (eventId: string) => {
        const isExpanded = expandedIndexes[eventId] || false;
        const newExpandedIndexes = { ...expandedIndexes, [eventId]: !isExpanded };
        setExpandedIndexes(newExpandedIndexes);

        const cardSize = cardSizes[eventId] || new Animated.Value(100);
        cardSizes[eventId] = cardSize;

        Animated.timing(cardSize, {
            toValue: isExpanded ? 100 : 250,
            duration: 250,
            useNativeDriver: false,
        }).start();
    };

    const getCardStyle = (eventId: string, type: any) => {
        if (type === 'card') {
            const cardSize = cardSizes[eventId] || new Animated.Value(100);
            return {
                height: cardSize,
                width: cardSize,
                zIndex: expandedIndexes[eventId] ? 90 : 0,
            };
        } else if (type === 'description') {
            return {
                top: 110,
                left: 0,
                zIndex: expandedIndexes[eventId] ? 90 : 0,
            };
        } else if (type === 'title') {
            return {
                top: expandedIndexes[eventId] ? 0 : 0,
                left: expandedIndexes[eventId] ? 110 : 5,
                // zIndex: expandedIndexes[eventId] ? 90 : 0,
                zIndex: 99,
                width: expandedIndexes[eventId] ? '45%' : '95%',
                paddingTop: expandedIndexes[eventId] ? 0 : 0,
            };
        } else if (type === 'titleText') {
            return {
                fontSize: expandedIndexes[eventId] ? 16 : 14,
                fontFamily: 'bold',
                color: expandedIndexes[eventId] ? colors.text : 'white',
                // textAlign: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: expandedIndexes[eventId] ? 0 : 2 },
                shadowOpacity: expandedIndexes[eventId] ? 0 : 0.8,
                shadowRadius: expandedIndexes[eventId] ? 0 : 2,
            };
        } else if (type === 'descriptionText') {
            return {
                fontSize: 16,
                fontFamily: 'regular',
                color: colors.text,
            };
        } else if (type === 'dateText') {
            return {
                bottom: 5,
                left: 5,
                zIndex: expandedIndexes[eventId] ? 90 : 0,
            };
        } else if (type === 'buttonAnim') {
            return {
                bottom: 0,
                right: 0,
                zIndex: expandedIndexes[eventId] ? 100 : 0,
            };
        } else if (type === 'marker') {
            return {
                zIndex: expandedIndexes[eventId] ? 90 : 100,
            }
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                key={mapRegion.latitude}
                ref={_map}
                initialRegion={mapRegion}
                style={styles.container}
                showsCompass={false}
                showsPointsOfInterest={false}
                showsUserLocation={true}
                onLongPress={(e) => onMapPress(e.nativeEvent.coordinate)}
                // onRegionChangeComplete={(region) => console.log(region)}
            >
                {events.map((event: any) => {
                    const eventId = event.id.toString();
                    return (
                        <Marker
                            key={eventId}
                            style={[styles.marker, { backgroundColor: colors.card, borderRadius: borderRadius.card, borderColor: colors.border }]}
                            coordinate={event.coordinate}
                            onPress={() => handlePress(eventId)}
                        >
                            <Animated.View style={[styles.cardContainer, getCardStyle(eventId, 'card')]}>
                                {/* <MapCard style={styles.card} /> */}
                                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={[styles.image, { borderRadius: borderRadius.card }]} />
                                <Animated.View style={[styles.title, getCardStyle(eventId, 'title')]}>
                                    <Animated.Text numberOfLines={5} style={[getCardStyle(eventId, 'titleText')]}>
                                        {event.title}
                                    </Animated.Text>
                                </Animated.View>
                                <Animated.View style={[styles.content, getCardStyle(eventId, 'description')]}>
                                    <Animated.Text numberOfLines={5} style={[getCardStyle(eventId, 'descriptionText')]}>
                                        {event.description}
                                    </Animated.Text>
                                </Animated.View>

                                <Animated.View style={[styles.content, getCardStyle(eventId, 'dateText')]}>
                                    <Animated.Text numberOfLines={5} style={[getCardStyle(eventId, 'descriptionText')]}>
                                        {SmallCardConvertDate(event.date)}
                                    </Animated.Text>
                                </Animated.View>

                                {/* <Animated.View style={[styles.content, getCardStyle(eventId, 'buttonAnim')]}> */}
                                    <Animated.View style={[styles.buttonContainer, getCardStyle(eventId, 'buttonAnim')]}>
                                        <TouchableOpacity onPress={() => console.log('pressed')} style={styles.button} />
                                    </Animated.View>
                                {/* </Animated.View> */}
                            </Animated.View>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: 'absolute',
        bottom: 100,
    },
    bodyBackground: {
        overflow: 'hidden',
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    bodyContainer: {
        position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        width: CARD_WIDTH,
    },
    marker: {
        borderWidth: 1,
        padding: 6,
        zIndex: 90,
    },
    cardContainer: {},
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        zIndex: 99,
    },
    card: {
        position: 'absolute',
        zIndex: 1,
        // top: 10,
        // left: 10,
    },
    title: {
        position: 'absolute',
        // zIndex: 2,
        // bottom: 0,
        // sahdow for text
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
    },
    content: {
        position: 'absolute',
        // zIndex: 2,
        bottom: 0,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 100,
    },
    button: {
        width: 100,
        height: 40,
        borderRadius: 50 / 2,
        backgroundColor: 'lightgreen',
    },
});