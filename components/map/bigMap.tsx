import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Region, Camera, Marker } from 'react-native-maps';
import { useMapContext } from '../../context/map.context';
import { useEventsContext } from '../../context/events.context';
import MarkerCard from '../layout/markerCard3';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/useTheme';
import SelectedEventScreen from '../../screens/events/selectedEvent';
import PlacesMarker from '../layout/placesMarker';
import { Images } from '../../style/images';
import { useNavigation } from '@react-navigation/native';
import { customMapStyle } from './customMapStyle';
import { useLocationChatContext } from '../../context/locationChat.context';
import { Text } from '../../style/typography';

interface BigMapProps {
    onMapPress: (coordinate: { latitude: number; longitude: number }) => void;
}

const BigMap: React.FC<BigMapProps> = ({ onMapPress }) => {
    const { colors, borderRadius } = useTheme();
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const _map = useRef<MapView | null>(null);
    const { mapRegion, setMapRegion } = useMapContext();
    const { mapScreenEvents } = useEventsContext();
    const [snapPoint, setSnapPoint] = useState('80%');
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.75} />, []);
    const navigation: any = useNavigation();
    const [currentAltitude, setCurrentAltitude]: any = useState<number>(500);
    const { getLocationChatRooms, locationChatRooms } = useLocationChatContext();

    const handleOpen = (eventId: string) => {
        const selectedEventDetails = mapScreenEvents.find((event: any) => event._id.toString() === eventId);
        setSelectedEvent(selectedEventDetails);
        setSnapPoint('90%');
        bottomSheetRef.current?.present();
    };

    const handleDismiss = () => {
        bottomSheetRef.current?.dismiss();
    };

    const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

    useEffect(() => {
        if (_map.current) {
            const cameraConfig: Camera = {
                center: {
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                },
                pitch: 45,
                heading: 0,
                altitude: currentAltitude,
                zoom: 15,
            };

            _map.current.animateCamera(cameraConfig, { duration: 500 });
        }
    }, [mapRegion.latitude, mapRegion.longitude, currentAltitude]);

    // useEffect(() => {
    //     getLocationChatRooms();
    // }, []);
    useEffect(() => {
        if (getLocationChatRooms) {
            getLocationChatRooms();
        }
    }, [locationChatRooms]);

    const onLocationChatOpen = (item: any) => {
        navigation.navigate('LocationChatScreen', { item });
    };

    return (
        <>
            <View style={styles.container}>
                <MapView
                    ref={(ref) => (_map.current = ref)}
                    style={styles.map}
                    initialRegion={mapRegion}
                    showsCompass={false}
                    showsPointsOfInterest={false}
                    showsUserLocation={true}
                    onLongPress={(e) => onMapPress(e.nativeEvent.coordinate)}
                    onRegionChangeComplete={(region: Region) => {
                        if (Math.abs(mapRegion.latitude - region.latitude) > 0.001 || Math.abs(mapRegion.longitude - region.longitude) > 0.001) {
                            setMapRegion(region);
                            _map.current?.getCamera().then((camera: Camera) => {
                                setCurrentAltitude(camera.altitude);
                            });
                        }
                    }}
                >
                    {mapScreenEvents.map((event: any) => {
                        let latitude = event.location.coordinates[1];
                        let longitude = event.location.coordinates[0];
                        return (
                            <Marker key={event._id} coordinate={{ latitude, longitude }} onPress={() => handleOpen(event._id)}>
                                <MarkerCard icon={event.interests[0].icon} title={event.title} />
                            </Marker>
                        );
                    })}
                    {locationChatRooms &&
                        locationChatRooms.length > 0 &&
                        locationChatRooms.map((room: any) => {
                            let latitude = room.location.coordinates[0];
                            let longitude = room.location.coordinates[1];
                            return (
                                <Marker key={room._id} coordinate={{ latitude, longitude }} onPress={() => onLocationChatOpen(room)}>
                                    <TouchableOpacity style={styles.locationChatCard}>
                                        <Text fontSize={60} >💬</Text>
                                    </TouchableOpacity>
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
                }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onDismiss={handleDismiss}
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
    locationChatCard: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#0bc4ff',
    },
});

export default BigMap;
