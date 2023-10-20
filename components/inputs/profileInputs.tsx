import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import Input from './textInput';

type Props = {
    bottomBorder?: boolean;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    error?: any;
};

const ProfileInputs = ({ bottomBorder, placeholder, value, onChangeText, error }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { borderColor: colors.border, borderBottomWidth: bottomBorder ? 1 : 0, backgroundColor: colors.card }]}>
            <Input placeholder={placeholder} onChangeText={onChangeText} value={value} error={error} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
});

export default ProfileInputs;
