import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import OvalButton from '../../components/buttons/ovalButton';
import NumberOfPeople from '../../components/inputs/numberOfPeople';
import TextArea from '../../components/inputs/textArea';
import FormHeader from '../../components/headers/formHeader';
import ImagePicker from '../../components/picker/imagePicker';
import FormTitle from '../../components/layout/formTitle';
import { useNavigation } from '@react-navigation/native';
import { useCreateEventContext } from '../../context/createEvent.context';
import { useEventsContext } from '../../context/events.context';

interface Props {
    onContinuePress?: () => void;
    handleDismiss?: () => void;
    AdditionalInfoError?: string;
    setAdditionalInfo?: (additionalInfo: string) => void;
    setImage?: (image: string) => void;
}

const title = 'Last few things 😅';

const CreateEventForm4 = ({}: Props) => {
    const [maxCapacityError, setMaxCapacityError] = React.useState('');
    const navigation: any = useNavigation();
    const { setAdditionalInfo, setMaxCapacity, setPrice, handleCreateEvent, removeState } = useCreateEventContext();
    const { getEventsByLocation, selectedInterest, interestRadius, getInterests } = useEventsContext();

    const onContinuePress = async () => {
        let response = await handleCreateEvent();
        if (response === 200) {
            getEventsByLocation(selectedInterest, interestRadius);
            // get scrollbar
            getInterests();
            navigation.pop(4);
        }
    };

    const handleCancelPress = () => {
        removeState()
        navigation.pop(4);
    }

    return (
        <>
            <View style={styles.container}>
                <FormHeader pageNumber={4} />
                <Text fontSize={20} bold>
                    {title}
                </Text>
                <View style={styles.content}>
                    <FormTitle title="Additional Information" />
                    <TextArea placeholder="What will you be wearing? What table number?" onChangeText={setAdditionalInfo} />
                    <FormTitle title="Max number of people" error={maxCapacityError} />
                    <NumberOfPeople placeholder="000" onChangeText={(value: any) => setMaxCapacity(value)} />
                    <FormTitle title="Entry fee" error={maxCapacityError} />
                    <NumberOfPeople placeholder="000" onChangeText={(value: any) => setPrice(value)} />
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <OvalButton title="Create Event" onPress={onContinuePress} />
                <OvalButton secondary title="Cancel" onPress={() => handleCancelPress()} />
            </View>
        </>
    );
};

export default CreateEventForm4;

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
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 10,
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
