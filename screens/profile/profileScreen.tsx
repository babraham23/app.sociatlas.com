import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import StandardHeader from '../../components/headers/standardHeader';
import { Text } from '../../style/typography';
import ProfileInputs from '../../components/inputs/profileInputs';
import { useUserContext } from '../../context/user.context';
import ProfileDOBInput from '../../components/inputs/profileDOBInput';
import PopUpButton from '../../components/buttons/popUpButton';
import { checkUsernameAvailability, editUser } from '../../api/user/user.requests';
import Avatar from '../../components/layout/avatar';
import EditableAvatar from '../../components/layout/editableAvatar';

const ProfileScreen = () => {
    const { user, getUser } = useUserContext();
    const debounceTimerRef: any = useRef(null);
    const [profilePic, setProfilePic] = useState(user.profilePic);
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [location, setLocation] = useState(user.location);
    const [email, setEmail] = useState(user.email);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

    const [nameError, setNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);

    const [showSaveButton, setShowSaveButton] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup timer on component unmount
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const hasChanges = [
            name !== user.name,
            username !== user.username,
            location !== user.location,
            email !== user.email,
            dateOfBirth !== user.dateOfBirth,
            profilePic !== user.profilePic,
        ].includes(true); // If any condition is true, hasChanges will be true

        setShowSaveButton(hasChanges);
    }, [name, username, location, email, dateOfBirth, user]);

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername);

        // Clear the previous timer if there is one
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
            checkIfUserNameAlreadyExists(newUsername);
        }, 500); // 500 ms delay
    };

    const checkIfUserNameAlreadyExists = async (usernameToCheck: string) => {
        // Check if the username hasn't changed
        if (usernameToCheck === user.username) {
            setUsernameError(false);
            return;
        }

        let body = { username: usernameToCheck };
        try {
            await checkUsernameAvailability(body);
            setUsernameError(false);
        } catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 400) {
                setUsernameError(true);
            }
        }
    };

    const handleUserDetailsChange = async () => {
        console.log('handleUserDetailsChange');
        const body = {
            name,
            username,
            location,
            email,
            dateOfBirth,
            profilePic,
        };
        try {
            const response = await editUser(user._id, body);
            if (response.status === 200) {
                getUser();
            }
        } catch (error: any) {
            console.log(error.response.status);
        }
    };

    return (
        <>
            <StandardHeader title="Edit Profile" />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                <ScrollView style={styles.container}>
                    <View style={styles.imageWrapper}>
                        <EditableAvatar profilePic={profilePic} setProfilePic={setProfilePic} />
                    </View>
                    <Text bold style={styles.text}>
                        Public
                    </Text>
                    <ProfileInputs placeholder="Name" value={name} onChangeText={setName} />
                    <ProfileInputs placeholder="Username" value={'@' + username} onChangeText={(text) => handleUsernameChange(text.replace('@', ''))} error={usernameError} />
                    <ProfileInputs placeholder="City (Optional)" value={location} onChangeText={setLocation} bottomBorder />
                    <Text bold style={styles.text}>
                        Private
                    </Text>
                    <ProfileInputs placeholder="Email" value={email} onChangeText={setEmail} />
                    <ProfileDOBInput value={dateOfBirth} setDob={setDateOfBirth} />
                </ScrollView>
            </KeyboardAvoidingView>
            {showSaveButton && <PopUpButton title="Save" onPress={handleUserDetailsChange} />}
        </>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        alignItems: 'center',
        paddingTop: 25,
    },
    text: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 10,
    },
});
