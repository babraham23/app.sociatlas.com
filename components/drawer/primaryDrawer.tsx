import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import Profile from './profile';
import Filters from './filters';
import DateSlider from '../slider/dateSlider';
import DistanceSlider from '../slider/distanceSlider';
import OvalButton from '../buttons/ovalButton';
import { useUserContext } from '../../context/user.context';
import { useNavigation } from '@react-navigation/native';

const PrimaryDrawer = (props: any) => {
    const { logUserOut, userLoggedIn } = useUserContext();

    const handleLogout = () => {
        logUserOut();
        props.navigation.toggleDrawer();
    };

    return (
        <>
            <View style={styles.container}>
                <Profile />
                <DateSlider />
                <DistanceSlider />
            </View>
            {userLoggedIn && (
                <View style={styles.logOutButtonWraper}>
                    <OvalButton title="Sign Out" secondary onPress={handleLogout} />
                </View>
            )}
        </>
    );
};

export default PrimaryDrawer;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 50,
    },
    logOutButtonWraper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        padding: 20,
    },
});
