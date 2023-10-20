import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Animated, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useMapContext } from '../../context/map.context';
import { useTheme } from '../../hooks/useTheme';
import { useEventsContext } from '../../context/events.context';
import MapCard from '../layout/mapCard';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 70;
const CARD_WIDTH = width * 0.8;

type Props = {
    onMapPress?: any;
};

const BigMap = ({ onMapPress }: Props) => {
    const _map: any = React.useRef(null);
    const { mapRegion, setMapRegion } = useMapContext();
    const { events } = useEventsContext();
    const { colors, borderRadius } = useTheme();
    const [selectedEventId, setSelectedEventId] = useState(null);

    const handleMarkerPress = (eventId: any) => {
        setSelectedEventId(eventId);
    };

    console.log('map region', mapRegion);

    return (
        <View style={styles.container}>
            <MapView
                // key={mapRegion.latitude}
                ref={_map}
                initialRegion={mapRegion}
                style={styles.container}
                showsCompass={false}
                showsPointsOfInterest={false}
                showsUserLocation={true}
                onLongPress={(e) => onMapPress(e.nativeEvent.coordinate)}
                onRegionChangeComplete={(region) => setMapRegion(region)}
                // onPress={() => console.log(null)}
                // onPanDrag={(event) => console.log(event.nativeEvent)}
            >
                {events.map((event: any) => {
                    const eventId = event.id.toString();
                    return (
                        <Marker
                            key={eventId}
                            style={[styles.marker, { backgroundColor: colors.card, borderRadius: borderRadius.card, borderColor: colors.border }]}
                            coordinate={event.coordinate}
                            onPress={() => handleMarkerPress(eventId)} // Call handleMarkerPress with eventId
                        >
                            <MapCard style={styles.card} isSelected={eventId === selectedEventId} />
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

export default BigMap;

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
        flex: 1,
        borderWidth: 1,
        padding: 6,
        zIndex: 90,
        backgroundColor: 'blue',
    },
    cardContainer: {},
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        zIndex: 99,
    },
    card: {},
});
