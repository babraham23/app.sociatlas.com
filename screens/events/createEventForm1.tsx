import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import FormInput from '../../components/inputs/formInput';
import OvalButton from '../../components/buttons/ovalButton';
import SmallMap from '../../components/map/smallMap';
import FormHeader from '../../components/headers/formHeader';
import FormTitle from '../../components/layout/formTitle';
import TextArea from '../../components/inputs/textArea';
import DateTimeAccordion from '../../components/inputs/dateTimeInput';
import { useMapContext } from '../../context/map.context';
import { useNavigation } from '@react-navigation/native';
import { createEventform1Validation } from '../../functions/validation';
import { CreateEventForm1Model } from '../../_models/events/createEventForm1.model';
import { useCreateEventContext } from '../../context/createEvent.context';


const pageTitle = 'Create an event and meet people with the same interests';

const CreateEventForm1 = () => {
    const navigation: any = useNavigation();
    const [{ titleError, descriptionError, dateError, locationError }, setErrors] = React.useState(new CreateEventForm1Model());
    const { title, setTitle, description, setDescription, date, setDate, eventLatitude, eventLongitude, removeState } = useCreateEventContext();

    const handleValidation = () => {
        setErrors(new CreateEventForm1Model());
        let body = {
            title,
            description,
            date,
            location: {
                coordinates: [eventLongitude, eventLatitude],
            },
        };
        const validation = createEventform1Validation(body);
        console.log(validation);
        if (validation.valid) {
            // set data/body to create event context
            navigation.navigate('CreateEventForm2');
        } else {
            validation.errors.map((item: any) => {
                setErrors((prevState: any) => ({ ...prevState, [item.name]: item.error }));
            });
        }
    };

    const handleCancelPress = () => {
        removeState();
        navigation.pop(1);
    };

    return (
        <View style={styles.container}>
            <FormHeader pageNumber={1} hideClose />
            <Text fontSize={20} bold>
                {pageTitle}
            </Text>
            <FormTitle title="Title" error={titleError} />
            <FormInput onChangeText={setTitle} placeholder="Give the event a name" />
            <FormTitle title="Tell us about the event" error={descriptionError} />
            <TextArea placeholder="Description of the event" onChangeText={setDescription} />
            <DateTimeAccordion setDate={setDate} error={dateError} />

            <View style={styles.locationHeader}>
                <View style={styles.locationWrapper}>
                    <Text bold style={styles.header}>
                        Location
                    </Text>
                    <Text bold style={styles.header} color={'red'}>
                        {locationError !== undefined && ` ${locationError}`}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('EditAddressScreen')}>
                    <Text style={styles.header} textDecorationLine={'underline'}>
                        {eventLatitude !== undefined ? 'Edit' : 'Find'} Address
                    </Text>
                </TouchableOpacity>
            </View>
            {eventLatitude !== undefined && <SmallMap />}
            <View style={styles.buttonWrapper}>
                <OvalButton title="Continue" onPress={() => handleValidation()} />
                <OvalButton secondary title="Cancel" onPress={() => handleCancelPress()} />
            </View>
        </View>
    );
};

export default CreateEventForm1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignSelf: 'center',
    },
    locationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
