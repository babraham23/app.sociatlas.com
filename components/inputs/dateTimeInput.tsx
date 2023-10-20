import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ConvertDate, ConvertDateadTime, ConvertTime } from '../../functions/helpers';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const DateTimeInput = ({ setDate, error }: any) => {
    const { colors, borderRadius } = useTheme();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setSelectedDate(date);
        let unix = new Date(date).valueOf();
        setDate(unix);
        hideDatePicker();
    };

    return (
        <>
            <View style={styles.inputWrapper}>
                <View style={styles.itemWrapper}>
                    <View style={styles.dateWrapper}>
                        <Text bold style={styles.header}>
                            Date
                        </Text>
                        {error && <Text bold color='red' style={styles.header}> {error}</Text>}
                    </View>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        activeOpacity={0.9}
                        style={[styles.input, { borderColor: colors.border, borderRadius: borderRadius.input, backgroundColor: colors.card }]}
                    >
                        {selectedDate ? <Text>{ConvertDate(selectedDate)}</Text> : <Text color={colors.dark_grey}>Date</Text>}
                    </TouchableOpacity>
                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleConfirm} onCancel={hideDatePicker} />
                </View>
                <View style={styles.itemWrapper}>
                    <Text bold style={styles.header}>
                        Time
                    </Text>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        activeOpacity={0.9}
                        style={[styles.input, { borderColor: colors.border, borderRadius: borderRadius.input, backgroundColor: colors.card }]}
                    >
                        {selectedDate ? <Text>{ConvertTime(selectedDate)}</Text> : <Text color={colors.dark_grey}>Time</Text>}
                    </TouchableOpacity>
                    {/* <DateTimePickerModal isVisible={isDatePickerVisible} mode="time" onConfirm={handleConfirm} onCancel={hideDatePicker} /> */}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemWrapper: {
        width: '45%',
    },
    header: {
        marginTop: 15,
        marginBottom: 3,
    },
    input: {
        borderWidth: 0.5,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
        // width: '45%',
    },
    dateWrapper: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
});

export default DateTimeInput;
