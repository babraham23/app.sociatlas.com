import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../style/typography';

type Props = {
    title: string;
    filter?: boolean;
    onFilterPress?: () => void;
};

const StandardHeader = ({ title, filter, onFilterPress }: Props) => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-sharp" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text center bold>
                {title}
            </Text>
            {filter && (
                <TouchableOpacity activeOpacity={0.9} style={styles.filter} onPress={onFilterPress}>
                    <Ionicons name="filter" size={24} color={colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default StandardHeader;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        // flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 45,
        borderBottomWidth: 1,
    },
    back: {
        position: 'absolute',
        left: 20,
        top: 45,
        zIndex: 99,
    },
    filter: {
        position: 'absolute',
        right: 20,
        top: 45,
        zIndex: 99,
        width: 50,
        height: 50,
        alignItems: 'center',
    },
});
