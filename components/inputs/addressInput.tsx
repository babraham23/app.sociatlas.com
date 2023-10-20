import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../../api/google-endpoints';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../style/typography';
import { useCreateEventContext } from '../../context/createEvent.context';

const AddressInput = ({ style, setAddressData, setAddressDetails, onBackPress }: any) => {
    const { colors, borderRadius }: any = useTheme();
    const { setMapRegion } = useCreateEventContext();

    const handleLocation = (location: any) => {
        setMapRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.010,
            longitudeDelta: 0.0050,
            // latitudeDelta: mapRegion.latitudeDelta,
            // longitudeDelta: mapRegion.latitudeDelta,
        });
    };

    return (
        <View style={[styles.container, style, { borderRadius: borderRadius.input, borderColor: colors.border }]}>
            <TouchableOpacity onPress={onBackPress} activeOpacity={0.9} style={styles.icon} >
                <Ionicons name="arrow-back-sharp" color={colors.text} size={25}  />
            </TouchableOpacity>
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{ fields: 'geometry' }}
                fetchDetails={true} // you need this to fetch the details object onPress
                placeholder="Find Address..."
                onPress={(data, details) => {
                    // console.log('details -->', JSON.stringify(details));
                    setAddressDetails(details);
                    setAddressData(data);
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
                        borderWidth: 1,
                        borderRadius: borderRadius.input,
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
        // width: '100%',

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
        top: 17,
        left: 10,
    },
});

export default AddressInput;
