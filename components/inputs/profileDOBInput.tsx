import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ConvertDate } from '../../functions/helpers';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

type Props = {
    setDob?: any;
    error?: any;
    value?: any;
};

const ProfileDOBInput = ({ setDob, error, value }: Props) => {
    const { colors, borderRadius } = useTheme();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        let unix = new Date(date).valueOf();
        setSelectedDate(date);
        setDob(unix);
        hideDatePicker();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
            <TouchableOpacity
                onPress={showDatePicker}
                activeOpacity={0.9}
                style={[styles.inputWrapper, { backgroundColor: colors.card, borderRadius: borderRadius.input, borderColor: error ? 'red' : colors.border }]}
            >
                {selectedDate ? <Text>{ConvertDate(selectedDate)}</Text> : <Text>{ConvertDate(value)}</Text>}
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopWidth: 0.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
});

export default ProfileDOBInput;
