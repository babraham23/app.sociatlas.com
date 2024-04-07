import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useMapContext } from '../../context/map.context';
import { useEventsContext } from '../../context/events.context';
import MarkerCard from '../layout/markerCard2';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/useTheme';
import SelectedEventScreen from '../../screens/events/selectedEvent';
import { useCreateEventContext } from '../../context/createEvent.context';
// import { usePlacesContext } from '../../context/places.context';
// import PlacesMarker from '../layout/placesMarker';
// import { Images } from '../../style/images';
import { useNavigation } from '@react-navigation/native';

const BigMap = ({ onMapPress }: any) => {
    const { colors, borderRadius } = useTheme();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const _map: any = React.useRef(null);
    // const { mapRegion, setMapRegion } = useCreateEventContext();
    const { mapRegion, setMapRegion } = useMapContext();
    const { events } = useEventsContext();
    // const { restaurants, bars } = usePlacesContext();
    const [snapPoint, setSnapPoint] = useState('80%');
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.75} />, []);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const navigation: any = useNavigation();

    const handleMarkerPress = (eventId: any) => {
        console.log('Pressed', eventId);
    };

    const handleCalloutPress = (eventId: any) => {
        console.log('callout pressed', eventId);
    };

    const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

    const handleOpen = (eventId: any) => {
        const selectedEventDetails = events.find((event: any) => event._id.toString() === eventId);
        setSelectedEvent(selectedEventDetails);
        setSnapPoint('90%');
        bottomSheetRef.current?.present();
    };

    const handleDismiss = () => {
        console.log('dismiss');
        bottomSheetRef.current?.dismiss();
    };

    React.useEffect(() => {}, [selectedEvent, events]);

    const initialCamera = {
        center: {
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
        },
        pitch: 45,
        heading: 0,
        altitude: 500,
        zoom: 15,
    };

    React.useEffect(() => {
        if (_map.current) {
            const cameraConfig = {
                center: {
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                },
                pitch: 45,
                heading: 0,
                altitude: 500,
                zoom: 15,
            };

            _map.current.animateCamera(cameraConfig, { duration: 500 });
        }
    }, [mapRegion.latitude, mapRegion.longitude]); // Only trigger when latitude or longitude change

    const onPlacePress = (item: any) => {
        navigation.navigate('PlacesScreen', { item });
    };

    return (
        <>
            <View style={styles.container}>
                <MapView
                    ref={_map}
                    style={styles.map}
                    initialRegion={mapRegion}
                    initialCamera={initialCamera}
                    showsCompass={false}
                    showsPointsOfInterest={false}
                    showsUserLocation={true}
                    onLongPress={(e) => onMapPress(e.nativeEvent.coordinate)}
                    onRegionChangeComplete={(region) => {
                        // Only update if there's a significant change
                        if (Math.abs(mapRegion.latitude - region.latitude) > 0.001 || Math.abs(mapRegion.longitude - region.longitude) > 0.001) {
                            setMapRegion(region);
                        }
                    }}
                >
                    {events.map((event: any) => {
                        let latitude = event.location.coordinates[1];
                        let longitude = event.location.coordinates[0];
                        return (
                            <Marker key={event._id} coordinate={{ latitude, longitude }} onPress={() => handleOpen(event._id)}>
                                <MarkerCard interests={event.interests} video={event.video} image={event.image} title={event.title} description={event.description} />
                            </Marker>
                        );
                    })}
                    {/* {restaurants.map((item: any, i: number) => {
                        let latitude = item.geometry.lat ? item.geometry.lat : item.geometry.location.lat;
                        let longitude = item.geometry.lng ? item.geometry.lng : item.geometry.location.lng;
                        return (
                            <Marker key={`coordinate_${i}`} coordinate={{ latitude, longitude }} onPress={() => onPlacePress(item)}>
                                <PlacesMarker icon={Images.RESTAURANT_ICON} />
                            </Marker>
                        );
                    })}
                    {bars.map((item: any, i: number) => {
                        let latitude = item.geometry.lat ? item.geometry.lat : item.geometry.location.lat;
                        let longitude = item.geometry.lng ? item.geometry.lng : item.geometry.location.lng;
                        return (
                            <Marker key={`coordinate_${i}`} coordinate={{ latitude, longitude }} onPress={() => onPlacePress(item)}>
                                <PlacesMarker icon={Images.BEER_ICON} />
                            </Marker>
                        );
                    })} */}
                </MapView>
            </View>

            <BottomSheetModal
                handleIndicatorStyle={{ backgroundColor: colors.text }}
                handleStyle={{
                    backgroundColor: colors.card,
                    borderTopLeftRadius: borderRadius.card,
                    borderTopRightRadius: borderRadius.card,
                    // borderTopColor: colors.border,
                    // borderWidth: 1,
                }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onDismiss={() => handleDismiss()}
                // bottomInset={100}
                // detached={true}
            >
                <SelectedEventScreen event={selectedEvent} />
            </BottomSheetModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    selectedMarker: {},
    callout: {
        backgroundColor: 'yellow',
    },
});

export default BigMap;
