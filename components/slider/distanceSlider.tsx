import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';
import { useEventsContext } from '../../context/events.context';

const DistanceSlider = () => {
    const { colors } = useTheme();
    const [selectedDistance, setSelectedDistance] = useState(2); // Initial distance is 2 kilometers (2000 meters)
    const { selectedInterest, getEventsByLocation, setInterestRadius } = useEventsContext();

    const onSliderChange = (values: any) => {
        const distanceInKilometers = (values[0] + 2) * 0.5; // Convert from steps (500 meters each) to kilometers
        setSelectedDistance(distanceInKilometers);
    };

    const onSliderChangeFinish = (values: any) => {
        const distanceInMeters = (values[0] + 2) * 500; // Convert from steps (500 meters each) to meters
        console.log('DONE', distanceInMeters);
        setInterestRadius(distanceInMeters)
        getEventsByLocation(selectedInterest.title, distanceInMeters);
    };

    return (
        <View style={styles.container}>
            <Text bold>Distance (in kilometers)</Text>
            <Text>{selectedDistance.toFixed(2)} km</Text>
            <View style={styles.marker}>
                <MultiSlider
                    values={[2]} // Initial value (2 represents 1000 meters, which is 1 kilometer)
                    sliderLength={250} // Adjust the slider's length as needed
                    onValuesChange={onSliderChange}
                    min={0}
                    max={100} // 50 kilometers divided by 0.5 kilometers per step
                    step={1} // Increment by 1 step (each step is 0.5 kilometers)
                    allowOverlap={false}
                    snapped
                    selectedStyle={{ backgroundColor: colors.primary }}
                    unselectedStyle={{ backgroundColor: colors.border }}
                    markerStyle={{ backgroundColor: colors.primary }}
                    onValuesChangeFinish={onSliderChangeFinish}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    marker: {
        alignSelf: 'center',
    },
});

export default DistanceSlider;
