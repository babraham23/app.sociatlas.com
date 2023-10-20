import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../style/typography';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

type Props = {
    onClosePress?: any;
    onBackPress?: any;
    title?: string;
    hideBack?: boolean;
    hideClose?: boolean;
};

const ThinHeader = ({ onClosePress, onBackPress, title, hideBack, hideClose }: Props) => {
    const { colors, borderRadius } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            {!hideBack ? null : (
                <TouchableOpacity onPress={onBackPress ? onBackPress : () => navigation.goBack()} style={styles.arrowWrapper}>
                    <Ionicons name="arrow-back-sharp" size={24} color={colors.text} />
                </TouchableOpacity>
            )}
            <View style={styles.titleWrapper}>
                <Text center bold numberOfLines={1}>
                    {title}
                </Text>
            </View>
            {hideClose ? null : (
                <TouchableOpacity onPress={onClosePress ? onClosePress : () => navigation.goBack()} style={styles.closeWrapperWrapper}>
                    <MaterialCommunityIcons name="window-close" size={20} color={colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // shadowOffset: {
        //     width: 0,
        //     height: 0.2,
        // },
        // shadowOpacity: 0.28,
        // shadowRadius: 0.5,
        zIndex: 1,
        borderBottomWidth: 0.5,
    },
    arrowWrapper: {
        position: 'absolute',
        left: 20,
        zIndex: 1,
    },
    closeWrapperWrapper: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
        top: 0,
    },
    titleWrapper: {
        width: '70%',
    },
});

export default ThinHeader;
