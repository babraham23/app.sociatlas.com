import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../style/typography';

const MessagesHeader = () => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-sharp" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text bold>Messages</Text>
            <Ionicons name="person-circle-sharp" size={24} color={colors.text} />
        </View>
    );
};

export default MessagesHeader;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
});
