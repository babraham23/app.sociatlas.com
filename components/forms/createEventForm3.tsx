import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import OvalButton from '../buttons/ovalButton';
import NumberOfPeople from '../inputs/numberOfPeople';
import DateTimeAccordion from '../inputs/dateTimeInput';
import TextArea from '../inputs/textArea';
import FormHeader from '../headers/formHeader';
import ImagePicker from '../picker/imagePicker';
import FormTitle from '../layout/formTitle';

interface Props {
    onContinuePress?: () => void;
    handleDismiss?: () => void;
    AdditionalInfoError?: string;
    setAdditionalInfo?: (additionalInfo: string) => void;
    setImage?: (image: string) => void;
}

const title = 'Last few things 😅';

const CreateEventForm = ({ onContinuePress, handleDismiss, AdditionalInfoError, setAdditionalInfo, setImage }: Props) => {
    return (
        <View style={styles.container}>
            <FormHeader pageNumber={3} onCancelPress={handleDismiss} />
            <Text fontSize={20} bold>
                {title}
            </Text>
            <View style={styles.content}>
                <Text bold style={styles.header}>
                    Add media
                </Text>

                <ImagePicker setBlobImage={setImage} />

                <FormTitle title="Additional Information" error={AdditionalInfoError} />
                <TextArea placeholder="What will you be wearing? What table number?" onChangeText={setAdditionalInfo} />
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
    row2: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: '100%',
    },
    row2Wrapper: {
        width: '50%',
    },
});
