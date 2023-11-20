import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type Props = {
    style?: any;
    error?: any;
    placeholder?: string;
    onChangeText?: any;
    keyboardType?: any;
    value?: any;
    maxLength?: number;
};

const SmallTextInput = ({ style, error, placeholder, onChangeText, maxLength, value }: Props) => {
    const { colors, borderRadius } = useTheme();
    const [bottomBorderColor, setBottomBorderColor] = React.useState(colors.border);
    return (
        <View style={style}>
            <View style={[styles.inputWrapper, { borderRadius: borderRadius.input, borderColor: colors.border, backgroundColor: colors.card }]}>
                <TextInput
                    placeholderTextColor={colors.dark_grey}
                    placeholder={placeholder}
                    style={[styles.textInput, { color: colors.text }]}
                    underlineColorAndroid="transparent"
                    autoCapitalize={'none'}
                    multiline={false}
                    secureTextEntry={false}
                    onChangeText={onChangeText}
                    keyboardType={'numeric'}
                    maxLength={maxLength ? maxLength : 3}
                    // onFocus={() => setBottomBorderColor(colors.text)}
                    // onBlur={() => setBottomBorderColor(colors.border)}
                    value={value}
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
        height: 50,
        width: 55,
        justifyContent: 'center',
        // paddingHorizontal: 10,
        borderRadius: 50,
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
        fontSize: 17,
        height: 50,
        width: 50,
        borderRadius: 50,
        textAlign: 'center',
    },
    errorPlaceholder: {
        height: 20,
        width: '100%',
    },
});

export default SmallTextInput;
