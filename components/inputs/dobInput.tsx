import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ConvertDate } from '../../functions/helpers';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

type Props = {
    setDob?: any;
    error?: any;
};

const DOBInput = ({ setDob, error }: Props) => {
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
        <>
            <TouchableOpacity
                onPress={showDatePicker}
                activeOpacity={0.9}
                style={[styles.inputWrapper, { backgroundColor: colors.card, borderRadius: borderRadius.input, borderColor: error ? 'red' : colors.border }]}
            >
                {selectedDate ? <Text>{ConvertDate(selectedDate)}</Text> : <Text color={colors.dark_grey}>Date of Birth</Text>}
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
        </>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20,
    },
});

export default DOBInput;
