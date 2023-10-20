import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text } from '../../style/typography';
import OvalButton from '../../components/buttons/ovalButton';
import FormHeader from '../../components/headers/formHeader';
import { useNavigation } from '@react-navigation/native';
import InterestsAccordion from '../../components/accordions/interestsAccordion';
import ImagePicker from '../../components/picker/imagePicker';
import { createEventform2Validation } from '../../functions/validation';
import { useCreateEventContext } from '../../context/createEvent.context';
import EventInterestModal from '../../components/modals/eventInterestModal';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/useTheme';
import EventInterests from '../../components/layout/eventInterests';
import { useEventsContext } from '../../context/events.context';

const title = 'A few more details';

const CreateEventForm2 = () => {
    const { colors, borderRadius } = useTheme();
    const navigation: any = useNavigation();
    const [interestError, setInterestError] = React.useState('');
    const [snapPoint, setSnapPoint] = useState('80%');
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { setImage, interests, removeState } = useCreateEventContext();

    const { getUserInterests } = useEventsContext();

    const onContinuePress = () => {
        setInterestError('');
        const validaation = createEventform2Validation({ interests });
        if (validaation.valid) {
            navigation.navigate('CreateEventForm3');
        } else {
            setInterestError(validaation.errors[0].error);
        }
    };

    const handleDismiss = () => {
        console.log('dismiss');
        bottomSheetRef.current?.dismiss();
    };

    const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.75} />, []);

    const handleOpen = () => {
        setSnapPoint('80%');
        bottomSheetRef.current?.present();
    };

    const handleCancelPress = () => {
        removeState();
        navigation.pop(2);
    };

    React.useEffect(() => {
        getUserInterests();
    }, []);

    console.log('interestError -->', interestError);

    return (
        <>
            <View style={styles.container}>
                <FormHeader pageNumber={2} onCancelPress={() => navigation.goBack()} />
                <Text fontSize={20} bold>
                    {title}
                </Text>
                <View style={styles.content}>
                    <View style={styles.titleWrapper}>
                        <Text bold style={styles.header}>
                            Select an interest
                        </Text>
                        {interestError && (
                            <Text color={'red'} bold style={styles.header}>
                                {` ${interestError}`}
                            </Text>
                        )}
                    </View>
                    <EventInterests onPress={() => handleOpen()} />
                    <TouchableOpacity style={styles.createWrapper} onPress={() => navigation.navigate('CreateInterestsScreen')}>
                        <Text fontSize={18} textDecorationLine={'underline'}>
                            Create New Interest
                        </Text>
                    </TouchableOpacity>
                    <Text bold style={styles.header}>
                        Add media
                    </Text>
                    <ImagePicker setBlobImage={setImage} />
                </View>
                <View style={styles.buttonWrapper}>
                    <OvalButton title="Continue" onPress={() => onContinuePress()} />
                    <OvalButton secondary title="Cancel" onPress={() => handleCancelPress()} />
                </View>
            </View>
            <BottomSheetModal
                handleIndicatorStyle={{ backgroundColor: colors.text }}
                handleStyle={{ backgroundColor: colors.card, borderTopLeftRadius: borderRadius.card, borderTopRightRadius: borderRadius.card }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onDismiss={() => handleDismiss()}
            >
                <EventInterestModal handleDismiss={handleDismiss} />
            </BottomSheetModal>
        </>
    );
};

export default CreateEventForm2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    content: {},
    titleWrapper: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    createWrapper: {
        marginTop: 10,
    },
});
