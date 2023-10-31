import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from '../../style/typography';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import FAB from '../../components/buttons/FAB';
import PlacesScroll from '../../components/scrolls/placesScroll';
import { GET_PACES_DETAILS } from '../../api/google-endpoints';

const PlacesScreen = ({ route, navigation }: any) => {
    let { photos, name, rating, formatted_address, place_id } = route.params.item;
    const { colors } = useTheme();
    const [images, setImages] = useState(photos);

    const getInformationAboutBusiness = async () => {
        try {
            const response = await fetch(GET_PACES_DETAILS(place_id));
            const json = await response.json();
            setImages(json.result.photos ? json.result.photos : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getInformationAboutBusiness();
    }, []);

    const onCreateEventPress = () => {
        navigation.navigate('CreateEventScreen', { name, formatted_address });
    };

    return (
        <>
            <PlacesScroll hideClose images={images} title={name} style={styles.container}>
                <Text bold fontSize={20}>
                    {name}
                </Text>
                <View style={[styles.section1, { borderBottomColor: colors.seperator }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.ratingWrapper}>
                            <FontAwesome name="star" size={18} color="gold" />
                            <Text>{rating}</Text>
                        </View>
                    </View>
                    <Text>{formatted_address}</Text>
                </View>
                <View style={[{ borderBottomColor: colors.seperator, marginBottom: 20 }]}>
                    <Text style={{ paddingTop: 20 }} bold fontSize={15}>
                        Reviews
                    </Text>
                </View>
            </PlacesScroll>
            <FAB style={styles.fab} onCreateEventPress={onCreateEventPress} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    ratingWrapper: {
        flexDirection: 'row',
        width: '13%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
    },
    section1: {
        paddingVertical: 20,
        borderBottomWidth: 0.5,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 40,
    },
});

export default PlacesScreen;
