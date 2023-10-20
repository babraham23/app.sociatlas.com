import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useBottomSheetContext } from '../../context/bottomSheet.context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserContext } from '../../context/user.context';
import { useNavigation } from '@react-navigation/native';

type Props = {
    style?: any;
    navigation?: any;
    onMapPress?: any;
    onMessagesPress?: any;
    onSearchFormPress?: any;
};

const { width, height } = Dimensions.get('window');

const ListViewTabBar = ({ style, onMapPress, onMessagesPress, onSearchFormPress }: Props) => {
    const { colors } = useTheme();
    const { userLoggedIn } = useUserContext()
    const navigation: any = useNavigation();
    return (
        <View style={[styles.container, style, { backgroundColor: 'black', width: userLoggedIn ? width - 100 : '50%' }]}>
            <TouchableOpacity onPress={() => onMapPress()} style={styles.iconWrapper}>
                <Feather name="map" size={24} color="white" />
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

export default ListViewTabBar;

const styles = StyleSheet.create({
    container: {
        width: width - 100,
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
