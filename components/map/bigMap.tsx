import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Region, Camera, Marker } from 'react-native-maps';
import { useMapContext } from '../../context/map.context';
import { useEventsContext } from '../../context/events.context';
import MarkerCard from '../layout/markerCard2';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/useTheme';
import SelectedEventScreen from '../../screens/events/selectedEvent';
import PlacesMarker from '../layout/placesMarker';
import { Images } from '../../style/images';
import { useNavigation } from '@react-navigation/native';
import { customMapStyle } from './customMapStyle';

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

    React.useEffect(() => {
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

    const onPlacePress = (item: any) => {
        navigation.navigate('PlacesScreen', { item });
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
});

export default BigMap;
