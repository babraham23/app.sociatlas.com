import { StyleSheet, View } from 'react-native';
import React from 'react';
import AddressInput from '../inputs/addressInput';
import { Text } from '../../style/typography';
import AddressMap from '../map/addressMap';
import FormHeader from '../headers/formHeader';
import OvalButton from '../buttons/ovalButton';

type Props = {
    // writtenAddress?: string;
    onBackPress?: () => void;
    onSavePress?: () => void;
};

const LocationForm = ({ onBackPress, onSavePress }: Props) => {
    const [addressDetails, setAddressDetails] = React.useState<any>(null);
    const [addressData, setAddressData] = React.useState<any>(null);

    // console.log('addressDetails -->', addressDetails);
    // console.log('addressData -->', addressData);

    return (
        <View style={styles.container}>
            <FormHeader title={'Address'} onCancelPress={onBackPress} />
            <View style={styles.inputWrapper}>
                <AddressInput setAddressDetails={setAddressDetails} setAddressData={setAddressData} />
            </View>
            <View style={styles.addressWrapper}>
                <Text bold fontSize={26} numberOfLines={3} >
                    {addressData?.description}
                </Text>
            </View>
            {addressData && <View style={styles.mapWrapper} >
                <AddressMap />
            </View>}
            <View style={styles.buttonWrapper}>
                <OvalButton title="Save Address" onPress={onSavePress} />
            </View>
        </View>
    );
};

export default LocationForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 90,
        paddingHorizontal: 20,
    },
    inputWrapper: {
        position: 'absolute',
        top: 40,
        width: '100%',
        zIndex: 99,
        alignSelf: 'center',
    },
    addressWrapper: {
        paddingTop: 70,
    },
    mapWrapper: {
        position: 'absolute',
        top: 250,
        width: '100%',
        alignSelf: 'center',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignSelf: 'center',
    }
});
