import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import OvalButton from '../buttons/ovalButton';
import NumberOfPeople from '../inputs/smallTextInput';
import DateTimeAccordion from '../inputs/dateTimeInput';
import TextArea from '../inputs/textArea';
import FormHeader from '../headers/formHeader';
import FormTitle from '../layout/formTitle';

interface Props {
    onContinuePress?: () => void;
    handleDismiss?: () => void;
    setDate?: (date: string) => void;
    setMaxCapacity?: any;
    setDescription?: (description: string) => void;
    DateError?: any;
    MaxCapacityError?: string;
    DescriptionError?: string;
}

const title = 'A few more details';

const CreateEventForm = ({ onContinuePress, handleDismiss, setDate, setMaxCapacity, setDescription, DateError, MaxCapacityError, DescriptionError }: Props) => {
    return (
        <View style={styles.container}>
            <FormHeader pageNumber={2} onCancelPress={handleDismiss} />
            <Text fontSize={20} bold>
                {title}
            </Text>
            <View style={styles.content}>
                <DateTimeAccordion setDate={setDate} />
                <FormTitle title="Max number of people" error={MaxCapacityError} />
                <NumberOfPeople placeholder="000" onChangeText={(value: any) => setMaxCapacity(value)} />

                <FormTitle title="Tell us about the event" error={DescriptionError} />
                <TextArea placeholder="Description of the event" onChangeText={setDescription} />
            </View>
            <View style={styles.buttonWrapper}>
                <OvalButton title="Create Event" onPress={onContinuePress} />
                <OvalButton secondary title="Cancel" onPress={handleDismiss} />
            </View>
        </View>
    );
};

export default CreateEventForm;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 10,
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
    },
    buttonWrapper: {
        paddingTop: 30,
    },
    content: {},
});
