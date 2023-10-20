import { StyleSheet, View } from 'react-native';
import React from 'react';
import FormHeader from '../../components/headers/formHeader';
import { Text } from '../../style/typography';
import PublicToggle from '../../components/layout/publicToggle';
import AddUserButton from '../../components/buttons/addUserButton';
import OvalButton from '../../components/buttons/ovalButton';
import { useNavigation } from '@react-navigation/native';
import GuestAvatar from '../../components/layout/guestAvatar';
import GuestList from '../../components/layout/guestList';
import { useCreateEventContext } from '../../context/createEvent.context';
import { createEventform3Validation } from '../../functions/validation';

const pageTitle = 'Is this event public or invite only?';

const CreateEventForm3 = () => {
    const navigation: any = useNavigation();
    const { isPrivate, setIsPrivate, invitees, removeState } = useCreateEventContext();
    const [inviteesError, setInviteesError] = React.useState(false);

    const onContinuePress = () => {
        setInviteesError(false);
        const body = {
            isPrivate,
            invitees,
        };
        const validation: any = createEventform3Validation(body);

        if (!isPrivate) {
            navigation.navigate('CreateEventForm4');
        } else {
            if (validation.valid) {
                navigation.navigate('CreateEventForm4');
            } else {
                validation.errors.map((item: any) => {
                    console.log(item);
                    setInviteesError(true);
                });
            }
        }
    };

    const checkError = () => {
        if (!isPrivate) setInviteesError(false);
        if (invitees.length) setInviteesError(false);
    };

    const handleCancelPress = () => {
        removeState()
        navigation.pop(3);
    }

    React.useEffect(() => {
        checkError();
    }, [isPrivate, invitees]);

    return (
        <View style={styles.container}>
            <FormHeader pageNumber={3} onCancelPress={() => {}} />
            <Text fontSize={20} bold>
                {pageTitle}
            </Text>
            <PublicToggle setIsPrivate={setIsPrivate} />
            {invitees.length ? <GuestList /> : null}
            <AddUserButton onPress={() => navigation.navigate('FriendList')} error={inviteesError} />
            <View style={styles.buttonWrapper}>
                <OvalButton title="Continue" onPress={() => onContinuePress()} />
                <OvalButton secondary title="Cancel" onPress={() => handleCancelPress()} />
            </View>
        </View>
    );
};

export default CreateEventForm3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    guestWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignSelf: 'center',
    },
});
