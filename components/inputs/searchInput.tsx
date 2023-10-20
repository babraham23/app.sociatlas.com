import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

type Props = {
    style?: any;
    error?: any;
    placeholder?: string;
    onChangeText: any;
    keyboardType?: any;
};

const SearchInput = ({ style, error, placeholder, onChangeText, keyboardType }: Props) => {
    const { colors, borderRadius } = useTheme();
    return (
        <View style={style}>
            <View style={[styles.inputWrapper, { borderRadius: borderRadius.input, borderColor: colors.border, backgroundColor: colors.card }]}>
                <EvilIcons name="search" size={24} color={colors.text}/>
                <TextInput
                    placeholderTextColor={colors.dark_grey}
                    placeholder={placeholder}
                    style={[styles.textInput, { color: colors.text }]}
                    underlineColorAndroid="transparent"
                    autoCapitalize={'none'}
                    multiline={false}
                    secureTextEntry={false}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                />
            </View>
            {/* {error ? <MessageError error={error} /> : <View style={styles.errorPlaceholder} />} */}
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    typeToggle: {
        position: 'absolute',
        right: 5,
        top: 12,
    },
    textInput: {
        flex: 1,
        fontFamily: 'regular',
        paddingHorizontal: 5,
        fontSize: 16,
    },
    errorPlaceholder: {
        height: 20,
        width: '100%',
    },
});

export default SearchInput;
