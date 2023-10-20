import React, { useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Text } from 'react-native';

const MyMapComponent = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);

    const markers = [
        { id: 1, coordinate: { latitude: 37.78825, longitude: -122.4324 }, title: 'Marker 1' },
        // Add more markers as needed
    ];

    const handleMarkerPress = (markerId) => {
        // Check if the marker is already selected, then close the callout
        if (selectedMarker === markerId) {
            setSelectedMarker(null);
        } else {
            setSelectedMarker(markerId);
        }
    };

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {markers.map((marker) => (
                <Marker key={marker.id} coordinate={marker.coordinate} onPress={() => handleMarkerPress(marker.id)}>
                    <Callout tooltip={true} onPress={() => handleMarkerPress(marker.id)}>
                        {selectedMarker === marker.id ? <Text>Callout is open for {marker.title}</Text> : null}
                    </Callout>
                </Marker>
            ))}
        </MapView>
    );
};

export default MyMapComponent;
