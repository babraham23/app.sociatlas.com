import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GuestAvatar from './guestAvatar';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useCreateEventContext } from '../../context/createEvent.context';

const FriendBanner = ({ onPress, onRemovePress, name, username, _id, profilePic }: any) => {
    const { colors } = useTheme();
    const [selected, setSelected] = React.useState(false);
    const { invitees } = useCreateEventContext();

    const handlePress = () => {
        setSelected(true);
        onPress();
    };

    const handleRemove = () => {
        setSelected(false);
        onRemovePress();
    };

    const checkIfUserIsSelected = () => {
        invitees.map((invitee: any) => {
            if (invitee._id === _id) {
                setSelected(true);
            }
        });
    };

    React.useEffect(() => {
        checkIfUserIsSelected();
    }, []);

    return (
        <View style={[styles.container, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <GuestAvatar profilePic={profilePic} noEdit marginTop={1} name={name} username={username} />
            <View style={styles.nameWrapper}>
                <Text fontSize={18}>{name}</Text>
                <Text fontSize={18} lineHeight={18}>
                    @{username}
                </Text>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={selected ? handleRemove : handlePress}
                // onPress={() => onPress()}
                style={[styles.selected, { backgroundColor: selected ? 'lightgreen' : 'transparent', borderColor: colors.dark_grey }]}
            />
        </View>
    );
};

export default FriendBanner;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    nameWrapper: {
        width: '70%',
    },
    selected: {
        width: 25,
        height: 25,
        borderRadius: 13,
        zIndex: 1,
        borderWidth: 1.5,
    },
});
