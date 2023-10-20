import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AuthHeader from '../../components/headers/authHeader';
import { Text } from '../../style/typography';
import AuthInput from '../../components/inputs/authInput';
import OvalButton from '../../components/buttons/ovalButton';
import { useUserContext } from '../../context/user.context';
import DOBInput from '../../components/inputs/dobInput';
import { validateRegistration } from '../../functions/validation';
import { registerUser } from '../../api/user/user.requests';
import { StoreData } from '../../functions/asyncStorage';
import { useNavigation } from '@react-navigation/native';
import OrDivider from '../../components/layout/orDivider';
import GoogleButton from '../../components/buttons/googleButton';

let registerText = 'Your Adventure Begins Here';

const RegisterScreen = () => {
    const { setUser, setUserLoggedIn } = useUserContext();
    const [name, setName] = useState('Brett');
    const [username, setUsername] = useState('brett');
    const [dateOfBirth, setDob] = useState(1695861683605);
    const [email, setEmail] = useState('test1@test.com');
    const [password, setPassword] = useState('Test1234!');
    const [nameError, setNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigation = useNavigation();
    let location = '';
    let profilePic = '';

    const handleValidation = () => {
        setNameError(false);
        setUsernameError(false);
        setDobError(false);
        setEmailError(false);
        setPasswordError(false);
        let body = { name, username, dateOfBirth, email, password };

        const validationResult = validateRegistration(body);
        if (!validationResult.isValid) {
            switch (validationResult.errorField) {
                case 'name':
                    setNameError(true);
                    break;
                case 'username':
                    setUsernameError(true);
                    break;
                case 'dateOfBirth':
                    setDobError(true);
                    break;
                case 'email':
                    setEmailError(true);
                    break;
                case 'password':
                    setPasswordError(true);
                    break;
                default:
                // alert('Unknown error');
            }
        } else {
            // ... proceed with registration
            handleRegister();
        }
    };

    const handleRegister = async () => {
        let body = { name, username, dateOfBirth, email, password, location, profilePic };
        try {
            let response: any = await registerUser(body);
            console.log('response -->', JSON.stringify(response))
            if (response.status == 200 || response.status == 201) {
                let { _id } = response.data.user;
                StoreData('@userId', _id);
                StoreData('@token', response.data.token)
                setUser(response.data.user);
                setUserLoggedIn(true);
                navigation.goBack();
            }
        } catch (error: any) {
            console.log(error.response.data);
            alert(error.response.data.error);
        }
    };

    return (
        <>
            <AuthHeader />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this value if needed
            >
                <ScrollView bounces={false} style={{ flex: 1 }}>
                    <Text center style={styles.header} bold fontSize={23}>
                        {registerText}
                    </Text>
                    <AuthInput value={name} error={nameError} onChangeText={(value: string) => setName(value)} placeholder="Name" />
                    <AuthInput value={username} error={usernameError} style={styles.input} onChangeText={(value: string) => setUsername(value)} placeholder="Username" />
                    <DOBInput setDob={setDob} error={dobError} />
                    <AuthInput value={email} style={styles.input} error={emailError} onChangeText={(value: string) => setEmail(value)} placeholder="Email" />
                    <AuthInput value={password} error={passwordError} style={styles.input} onChangeText={(value: string) => setPassword(value)} placeholder="Password" password />
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.buttonWrapper}>
                <OvalButton style={styles.button} title={'Create Account'} onPress={handleValidation} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
    },
    header: {
        paddingTop: 80,
        paddingBottom: 40,
    },
    input: {
        marginTop: 20,
    },
    buttonWrapper: {
        paddingHorizontal: 18,
    },
    button: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
    },
});

export default RegisterScreen;
