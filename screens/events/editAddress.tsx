import { StyleSheet, View } from 'react-native';
import React from 'react';
import AddressInput from '../../components/inputs/addressInput';
import { Text } from '../../style/typography';
import AddressMap from '../../components/map/addressMap';
import OvalButton from '../../components/buttons/ovalButton';
import { useNavigation } from '@react-navigation/native';
import { useCreateEventContext } from '../../context/createEvent.context';

type Props = {};

const EditAddressScreen = ({}: Props) => {
    const navigation: any = useNavigation();
    const [addressDetails, setAddressDetails] = React.useState<any>(null);
    const [addressData, setAddressData] = React.useState<any>(null);
    const { setAddress, setEventLatitude, setEventLongitude } = useCreateEventContext();

    const onSavePress = () => {
        let address = addressData.description;
        let latitude = addressDetails.geometry.location.lat;
        let longitude = addressDetails.geometry.location.lng;
        setAddress(address);
        setEventLatitude(latitude);
        setEventLongitude(longitude);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <AddressInput onBackPress={() => navigation.goBack()} setAddressDetails={setAddressDetails} setAddressData={setAddressData} />
            </View>
            <View style={styles.addressWrapper}>
                <Text bold fontSize={23} numberOfLines={3}>
                    {addressData?.description}
                </Text>
            </View>
            {addressData && (
                <View style={styles.mapWrapper}>
                    <AddressMap addressDetails={addressDetails} addressData={addressData} />
                </View>
            )}
            <View style={styles.buttonWrapper}>
                <OvalButton title="Save Address" onPress={onSavePress} />
            </View>
        </View>
    );
};

export default EditAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 90,
        paddingHorizontal: 20,
    },
    inputWrapper: {
        position: 'absolute',
        top: 20,
        width: '100%',
        zIndex: 99,
        alignSelf: 'center',
    },
    addressWrapper: {
        paddingTop: 100,
    },
    mapWrapper: {
        // position: 'absolute',
        // top: 240,
        width: '100%',
        alignSelf: 'center',
        paddingTop: 20,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignSelf: 'center',
    },
});
