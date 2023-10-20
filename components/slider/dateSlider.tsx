import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';

const DateSlider = () => {
    const { colors } = useTheme();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 10); // 10 days in the future

    const onSliderChange = (values: any) => {
        const selectedDay = new Date();
        selectedDay.setDate(selectedDay.getDate() + values[0]);
        setSelectedDate(selectedDay);
    };

    return (
        <View style={styles.container} >
            <Text bold >Date</Text>
            <Text>{selectedDate.toDateString()}</Text>
            <View style={styles.marker} >
            <MultiSlider
                values={[0]} // Initial value (0 represents the start)
                sliderLength={250} // Adjust the slider's length as needed
                onValuesChange={onSliderChange}
                min={0}
                max={15} // 10 days in the future
                step={1} // Increment by 1 day
                allowOverlap={false}
                snapped
                selectedStyle={{ backgroundColor: colors.primary }}
                unselectedStyle={{ backgroundColor: colors.border }}
                markerStyle={{ backgroundColor: colors.primary }}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // paddingTop: 20,
        // alignSelf: 'center',
    },
    marker: {
        alignSelf: 'center',
    }
});

export default DateSlider;
