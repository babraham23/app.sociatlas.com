import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useBottomSheetContext } from '../../context/bottomSheet.context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/user.context';
type Props = {
    style?: any;
    onSearchFormPress?: any;
};

const { width, height } = Dimensions.get('window');

const MapScreenTabBar = ({ style, onSearchFormPress }: Props) => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    const { userLoggedIn } = useUserContext()
    return (
        <View style={[styles.container, style, { backgroundColor: 'black', width: userLoggedIn ? width - 100 : '50%' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('ListViewScreen')} style={styles.iconWrapper}>
                <Feather name="list" size={34} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSearchFormPress()} style={styles.iconWrapper}>
                <Feather name="search" size={34} color="white" />
            </TouchableOpacity>
            {userLoggedIn && <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')} style={styles.iconWrapper}>
                <Feather name="mail" size={34} color="white" />
            </TouchableOpacity>}
        </View>
    );
};

export default MapScreenTabBar;

const styles = StyleSheet.create({
    container: {
        height: 70,
        borderRadius: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
