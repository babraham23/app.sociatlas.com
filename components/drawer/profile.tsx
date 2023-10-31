import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/user.context';
import OvalButton from '../buttons/ovalButton';
import OrDivider from '../layout/orDivider';
import GoogleButton from '../buttons/googleButton';
import Avatar from '../layout/avatar';

const Profile = () => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    const { user, userLoggedIn } = useUserContext();

    return (
        <View style={[styles.container, { borderBottomColor: colors.border }]}>
            {userLoggedIn && user ? (
                <>
                    <View>
                        <Avatar width={100} height={100}  onPress={() => navigation.navigate('ProfileScreen')} />
                    </View>
                    <View style={styles.nameWrapper}>
                        <Text bold fontSize={18}>
                            {user.name}
                        </Text>
                        <Text bold fontSize={18}>
                            @{user.username}
                        </Text>
                    </View>
                </>
            ) : (
                <View style={styles.registerWrapper}>
                    <Text bold fontSize={23}>
                        Join Now
                    </Text>
                    <OvalButton onPress={() => navigation.navigate('RegisterScreen')} title="Register" />
                    <OvalButton onPress={() => navigation.navigate('LoginScreen')} title={'Sign In'} secondary />
                    {/* <OrDivider />
                    <GoogleButton /> */}
                </View>
            )}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingBottom: 20,
    },
    profilepic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'blue',
        marginRight: 10,
    },
    nameWrapper: {},
    registerWrapper: {
        paddingTop: 30,
        width: '100%',
        // padding: 10,
    },
    input: {
        marginTop: 10,
    },
});
