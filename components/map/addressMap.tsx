import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useMapContext } from '../../context/map.context';
import { useCreateEventContext } from '../../context/createEvent.context';

type Props = {
    style?: any;
    addressDetails?: any;
    addressData?: any;
};

const AddressMap: React.FC<Props> = ({ style, addressDetails }) => {
    const { colors, borderRadius } = useTheme();
    let mapView: any = useRef();
    const { mapRegion } = useCreateEventContext();

    const coords: any = {
        latitude: addressDetails.geometry.location.lat,
        longitude: addressDetails.geometry.location.lng,
    };

    return (
        <View style={[styles.container, { borderColor: colors.border, borderRadius: borderRadius.input }]}>
            <MapView scrollEnabled={false} showsPointsOfInterest={false} region={mapRegion} style={[style, styles.map, { borderColor: colors.border }, StyleSheet.absoluteFill]} ref={(c) => (mapView = c)} showsUserLocation>
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
    map: {
        borderWidth: 0.5,
        borderRadius: 10,
    },
    icon2: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 4,
    },
    container: {
        height: 400,
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
    },
});

export default AddressMap;