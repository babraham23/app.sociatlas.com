import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FormButton from '../buttons/formButton';
import { Text } from '../../style/typography';

type Props = {
    onPress?: any;
    description?: string;
    onBackPress?: any;
    canContinue?: boolean;
    noBack?: boolean;
    style?: any;
    buttonTitlle?: string;
};

const FormTemplate: React.FC<Props> = ({ children, canContinue, onBackPress, onPress, description, noBack, style, buttonTitlle }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <>
            {!noBack ? (
                <TouchableOpacity
                    onPress={onBackPress ? onBackPress : () => navigation.goBack()}
                    style={[styles.arrowWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}
                >
                    <Ionicons name="arrow-back-sharp" size={24} color={colors.text} />
                </TouchableOpacity>
            ) : null}
            <ScrollView style={style} bounces={true}>
                <View style={styles.container}>
                    <View style={styles.descriptionWrapper}>
                        <Text bold fontSize={18}>
                            {description}
                        </Text>
                    </View>
                    {children}
                </View>
            </ScrollView>
            {canContinue ? <FormButton title={buttonTitlle || 'Continue'} onPress={onPress} /> : null}
        </>
    );
};

export default FormTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 100,
        paddingHorizontal: 10,
        paddingBottom: 50,
    },
    arrowWrapper: {
        position: 'absolute',
        left: 15,
        top: 40,
        zIndex: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    descriptionWrapper: {
        paddingBottom: 30,
    },
    buttonContainer: {
        borderTopWidth: 1,
        height: 100,
        width: '100%',
        padding: 10,
        paddingTop: 20,
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
});
