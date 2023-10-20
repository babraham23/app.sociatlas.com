import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import SearchInput from '../inputs/searchInput';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

type Props = {
    style?: any;
};

const MapHeader = ({ style }: Props) => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    return (
        <View style={style}>
            <View style={styles.header}>
                <SearchInput />
                <TouchableOpacity activeOpacity={9} onPress={() => navigation.toggleDrawer()} style={[styles.burgerWrapper, { backgroundColor: colors.card }]}>
                    <Feather name="menu" size={34} color={colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    burgerWrapper: {
        width: '20%',
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

export default MapHeader;
