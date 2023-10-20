import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import FormInput from '../inputs/formInput';
import OvalButton from '../buttons/ovalButton';
import InterestsAccordion from '../accordions/interestsAccordion';
import SmallMap from '../map/smallMap';
import FormHeader from '../headers/formHeader';
import FormTitle from '../layout/formTitle';

/* 
Form 1
* id
* title✅ 
* interests✅ 
    * Array - max 3
* location ✅
    * address
    * latitude
    * longitude
*/

interface Props {
    handleDismiss?: () => void;
    onContinuePress?: () => void;
    longitude?: number;
    latitude?: number;
    onFindAddressPress?: () => void;
    setInterests?: any;
    interests?: string[];
    setTitle?: any;
    setDescription?: (description: string) => void;
    setLocation?: (location: string) => void;
    setCoordinates?: (coordinates: { latitude: number; longitude: number }) => void;
    TitleError?: string;
    InterestError?: string;
}

const pageTitle = 'Create an event and meet people with the same interests';

const CreateEventForm = ({
    handleDismiss,
    onContinuePress,
    onFindAddressPress,
    setTitle,
    setDescription,
    setLocation,
    setCoordinates,
    setInterests,
    interests,
    TitleError,
    InterestError,
}: Props) => {
    return (
        <View style={styles.container}>
            <FormHeader pageNumber={1} onCancelPress={handleDismiss} hideClose />
            <Text fontSize={20} bold>
                {pageTitle}
            </Text>
            <FormTitle title="Title" error={TitleError} />
            <FormInput onChangeText={(value: string) => setTitle(value)} placeholder="Give the event a name" />
            <InterestsAccordion InterestError={InterestError} interests={interests} setInterests={setInterests} placeholder="What are you interested" />
            <View style={styles.locationHeader}>
                <Text bold style={styles.header}>
                    Location
                </Text>
                <TouchableOpacity onPress={onFindAddressPress}>
                    <Text style={styles.header} textDecorationLine={'underline'}>
                        Find address
                    </Text>
                </TouchableOpacity>
            </View>
            <SmallMap />
            <View style={styles.buttonWrapper}>
                <OvalButton title="Continue" onPress={onContinuePress} />
                <OvalButton secondary title="Cancel" onPress={handleDismiss} />
            </View>
        </View>
    );
};

export default CreateEventForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
    },
    buttonWrapper: {
        paddingTop: 30,
    },
    locationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
