import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../../api/google-endpoints';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Feather } from '@expo/vector-icons';
import { Text } from '../../style/typography';
import { useMapContext } from '../../context/map.context';

const GooglePlacesInput = ({ style }: any) => {
    const { colors, borderRadius }: any = useTheme();
    const { setMapRegion } = useMapContext();

    const handleLocation = (location: any) => {
        console.log('location -->', location);
        setMapRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005,
            // latitudeDelta: mapRegion.latitudeDelta,
            // longitudeDelta: mapRegion.latitudeDelta,
        });
    };

    return (
        <View style={[styles.container, style, { borderRadius: borderRadius.input, borderColor: colors.border }]}>
            <Feather name="map-pin" size={18} color={colors.primary} style={styles.icon} />
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{ fields: 'geometry' }}
                fetchDetails={true} // you need this to fetch the details object onPress
                placeholder="Search"
                onPress={(data, details = null) => {
                    // console.log('details -->', JSON.stringify(details));
                    // console.log('data -->', JSON.stringify(data));
                    handleLocation(details?.geometry?.location);
                    // console.log(JSON.stringify(details?.geometry?.location));
                }}
                query={{
                    key: API_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        width: '100%',
                    },
                    textInput: {
                        color: colors.text,
                        width: '100%',
                        fontSize: 16,
                        height: 60,
                        // shadowColor: '#000',
                        // shadowOffset: {
                        //     width: 0,
                        //     height: 4,
                        // },
                        // shadowOpacity: 0.3,
                        // shadowRadius: 4.65,
                        // borderRadius: borderRadius.input,
                        borderColor: colors.border,
                        paddingLeft: 40,
                        backgroundColor: colors.card,
                        borderWidth: 0.5,
                    },
                    predefinedPlacesDescription: {
                        color: colors.grey,
                    },
                    row: {
                        flex: 1,
                        backgroundColor: colors.card,
                        flexWrap: 'wrap',
                    },
                }}
                renderRow={(rowData) => {
                    const title = rowData.structured_formatting.main_text;
                    const address = rowData.structured_formatting.secondary_text;
                    return (
                        <View style={{ backgroundColor: colors.card }}>
                            <Text>{title}</Text>
                            <Text>{address}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '75%',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    icon: {
        position: 'absolute',
        zIndex: 99,
        top: 20,
        left: 10,
    },
});

export default GooglePlacesInput;
