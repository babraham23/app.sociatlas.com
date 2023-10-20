import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';

type Props = {
    pageNumber?: number;
    onCancelPress?: () => void;
    hideClose?: boolean;
    title?: string;
};

const max_page_number = 4;

const FormHeader = ({ pageNumber, onCancelPress, hideClose, title }: Props) => {
    const navigation: any = useNavigation();
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            {hideClose ? <View /> : (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeWrapperWrapper}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
            )}
            <View>
                {title ? (
                    <Text bold>{title}</Text>
                ) : (
                    (pageNumber && <Text bold>
                        {pageNumber}/{max_page_number}
                    </Text>)
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        alignItems: 'center',
        paddingTop: 50,
    },
    closeWrapperWrapper: {},
});

export default FormHeader;
