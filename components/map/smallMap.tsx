import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useCreateEventContext } from '../../context/createEvent.context';
import { getAddressFromCoordinates } from '../../api/google/address';


type Props = {
    style?: any;
};

const SmallMap: React.FC<Props> = ({ style }) => {
    const { colors, borderRadius } = useTheme();
    let mapView: any = useRef();
    const { mapRegion, eventLatitude, eventLongitude, address, setAddress } = useCreateEventContext();

    const coords: any = {
        latitude: eventLatitude,
        longitude: eventLongitude,
    };

    const getLocationData = async () => {
        try {
            let res = await getAddressFromCoordinates(eventLatitude, eventLongitude);
            setAddress(res);
        } catch (error: any) {
            console.log('error -->', error);
        }
    };

    React.useEffect(() => {
        getLocationData();
    }, []);

    return (
        <View style={[styles.container, { borderColor: colors.border, borderRadius: borderRadius.input }]}>
            <View style={[styles.locationWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text fontSize={13} lineHeight={15}>
                    {address}
                </Text>
            </View>
            <MapView
                showsPointsOfInterest={false}
                region={mapRegion}
                style={[style, styles.mapView]}
                ref={(c) => (mapView = c)}
                showsUserLocation
                // scrollEnabled={false}
                // zoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
            >
                <Marker coordinate={coords} />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 27,
        resizeMode: 'contain',
    },
    icon2: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 4,
    },
    container: {
        height: 100,
        width: '100%',
        borderWidth: 1,
    },
    locationWrapper: {
        position: 'absolute',
        zIndex: 88,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5,
        paddingHorizontal: 5,
        width: '50%',
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SmallMap;
