import { StyleSheet, View } from 'react-native';
import React from 'react';
import GuestAvatar from '../../components/layout/guestAvatar';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useCreateEventContext } from '../../context/createEvent.context';

const pageTitle = 'Is this event public or invite only?';

const GuestList = () => {
    const { colors } = useTheme();
    const { invitees, setInvitees } = useCreateEventContext();

    const removeInvitee = (invitee: any) => {
        setInvitees(invitees.filter((user: any) => user._id !== invitee._id));
    }

    return (
        <>
            <Text bold style={styles.header}>
                Invitees
            </Text>
            <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {invitees.map((invitee: any) => (
                    <GuestAvatar key={invitee._id} name={invitee.name} username={invitee.username} profilePic={invitee.profilePic} onEditPress={() => removeInvitee(invitee)} />
                ))}
            </View>
        </>
    );
};

export default GuestList;

const styles = StyleSheet.create({
    container: {
        // marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 0.5,
        paddingLeft: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
    },
});
