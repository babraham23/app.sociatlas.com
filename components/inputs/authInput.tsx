import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

type Props = {
    style?: any;
    error?: any;
    placeholder?: string;
    onChangeText: any;
    keyboardType?: any;
    password?: boolean;
    value?: string;
};

const AuthInput = ({ style, error, placeholder, onChangeText, keyboardType, password, value }: Props) => {
    const { colors, borderRadius } = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
        if (password) {
            setShowPassword(true);
        }
    }, []);

    return (
        <View style={style}>
            <View style={[styles.inputWrapper, { borderRadius: borderRadius.input, borderColor: error ? 'red' : colors.border, backgroundColor: colors.card }]}>
                <TextInput
                    placeholderTextColor={colors.dark_grey}
                    placeholder={placeholder}
                    style={[styles.textInput, { color: colors.text }]}
                    underlineColorAndroid="transparent"
                    autoCapitalize={'none'}
                    multiline={false}
                    secureTextEntry={showPassword}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    value={value}
                />
            </View>
            {password ? (
                setShowPassword ? (
                    <TouchableOpacity style={styles.typeToggle} onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={colors.text} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.typeToggle} onPress={() => {}}>
                        <Ionicons name="eye-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                )
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    typeToggle: {
        position: 'absolute',
        right: 15,
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

export default AuthInput;
