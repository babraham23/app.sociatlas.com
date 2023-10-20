import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AuthHeader from '../../components/headers/authHeader';
import { Text } from '../../style/typography';
import AuthInput from '../../components/inputs/authInput';
import OvalButton from '../../components/buttons/ovalButton';
import { useUserContext } from '../../context/user.context';
import { useNavigation } from '@react-navigation/native';
import { validateLogin } from '../../functions/validation';
import OrDivider from '../../components/layout/orDivider';
import GoogleButton from '../../components/buttons/googleButton';

let registerText = `Ready to Explore? Log in and Let's Go!`;

const LoginScreen = () => {
    const { logUserInWithEmailAndPassword } = useUserContext();
    // let [email, setEmail] = useState('');
    // let [password, setPassword] = useState('');
    const navigation: any = useNavigation();
    // let [email, setEmail] = useState('');
    // let [password, setPassword] = useState('');
    let [email, setEmail] = useState('test1@test.com');
    let [password, setPassword] = useState('Test1234!');
    let [emailError, setEmailError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);

    const handleValidation = () => {
        setEmailError(false);
        setPasswordError(false);
        let body = { email, password };

        const validationResult = validateLogin(body);
        if (!validationResult.isValid) {
            switch (validationResult.errorField) {
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
            handleLogin();
        }
    };

    const handleLogin = async () => {
        let body = { email, password };
        let response = await logUserInWithEmailAndPassword(body);
        if (response == 200) {
            navigation.navigate('MapScreen');
        } else {
            alert(response);
        }
    };

    return (
        <>
            <AuthHeader />
            <View style={styles.container}>
                <Text style={styles.header} bold fontSize={23}>
                    {registerText}
                </Text>
                <AuthInput error={emailError} value={email} onChangeText={(value: string) => setEmail(value)} placeholder="Email" />
                <AuthInput error={passwordError} value={password} password style={styles.input} onChangeText={(value: string) => setPassword(value)} placeholder="Password" />
                <OvalButton style={styles.button} title={'Log In'} onPress={handleValidation} />
            </View>
        </>
    );
};

export default LoginScreen;

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
    button: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
    },
});
