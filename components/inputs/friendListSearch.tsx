import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FriendListSearchInput = ({ style, placeholder, autoCapitalize, onChangeText, onEndEditing, autoCorrect, keyboardType, spellCheck, onBackPress }: any) => {
    const { colors, borderRadius }: any = useTheme();
    const navigation = useNavigation();

    return (
        <View
            style={[
                style,
                styles.wrapper,
                {
                    backgroundColor: colors.card,
                    borderRadius: borderRadius.input,
                    borderColor: colors.border,
                },
            ]}
        >
            <TouchableOpacity onPress={onBackPress} style={[styles.iconWrapper]}>
                <Ionicons name="arrow-back-sharp" color={colors.text} size={25} style={styles.icon} />
            </TouchableOpacity>

            <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.border}
                style={[styles.textInput, { color: colors.text }]}
                autoCapitalize={autoCapitalize}
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
                autoCorrect={autoCorrect}
                keyboardType={keyboardType}
                spellCheck={spellCheck}
                underlineColorAndroid="transparent"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 60,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    iconWrapper: {
        // borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 5,
    },
    icon: {
        paddingBottom: 5,
        paddingRight: 5,
        // borderRightWidth: 1,
        paddingLeft: 15,
    },
    textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 1,
        fontSize: 18,
        fontFamily: 'regular',
    },
});

export default FriendListSearchInput;
