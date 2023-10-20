import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useMapContext } from '../../context/map.context';
import { useEventsContext } from '../../context/events.context';
import MapCard from '../layout/mapCard';
import { Video } from 'expo-av';

const BigMap = ({ onMapPress }: any) => {
    const _map: any = React.useRef(null);
    const _marker: any = React.useRef(null);
    const [selectedMarker, setSelectedMarker] = React.useState(null);
    const { mapRegion, setMapRegion } = useMapContext();
    const { events } = useEventsContext();

    const handleMarkerPress = (eventId: any) => {
        if (selectedMarker === eventId) {
            setSelectedMarker(null);
        } else {
            setSelectedMarker(eventId);
        }
    };

    const handleCalloutPress = (eventId: any) => {
        console.log('callout pressed', eventId);
    };
    // calloutOffset={{ x: -60, y: -150 }
    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                style={styles.map}
                initialRegion={mapRegion}
                showsCompass={false}
                showsPointsOfInterest={false}
                showsUserLocation={true}
                onLongPress={(e) => onMapPress(e.nativeEvent.coordinate)}
                onRegionChangeComplete={(region) => setMapRegion(region)}
                // onPanDrag={(event) => console.log(event.nativeEvent)}
            >
                {events.map((event: any) => {
                    const eventId = event.id.toString();
                    return (
                        <Marker 
                            key={eventId} 
                            coordinate={event.coordinate} 
                            onPress={() => handleMarkerPress(eventId)}
                            calloutAnchor={{ x: -60, y: -150 }}
                            calloutOffset={{ x: -60, y: -150 }}
                        >
                            {event.video ? (
                                <Video source={event.video} rate={1.0} isMuted={false} resizeMode="cover" shouldPlay isLooping style={styles.video} />
                            ) : (
                                <Image source={{ uri: event.image }} style={styles.marker} />
                            )}

                            <Callout tooltip={true} onPress={() => handleCalloutPress(eventId)}>
                                {selectedMarker === eventId ? <MapCard title={event.title} description={event.description} /> : null}
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        width: 120,
        height: 150,
        borderRadius: 15,
    },
    selectedMarker: {
        // width: 60,
        // height: 60,
        // borderRadius: 30,
    },
    callout: {
        // width: 200,
        // height: 200,
        // backgroundColor: 'red'
        // padding: 20
    },
    video: {
        width: 120,
        height: 150,
        borderRadius: 15,
    },
});

export default BigMap;
