import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CloseButton from '../buttons/closeButton';
import { useTheme } from '../../hooks/useTheme';

const EventFilterPicker = ({ isVisible, onFilterChange, onClose }: any) => {
    const { colors } = useTheme();
    const [selectedFilter, setSelectedFilter] = useState('Upcoming');

    const handleFilterChange = (itemValue: any) => {
        setSelectedFilter(itemValue);
        onFilterChange(itemValue);
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.container}>
                <CloseButton onPress={onClose} style={styles.close} />
                <View style={[styles.picker, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Picker style={{ color: 'blue' }} selectedValue={selectedFilter} onValueChange={handleFilterChange}>
                        <Picker.Item color={colors.text} label="Upcoming events" value="Upcoming" />
                        <Picker.Item color={colors.text} label="Attended events" value="Attended" />
                        <Picker.Item color={colors.text} label="Favorites" value="Favorites" />
                    </Picker>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 400,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    picker: {
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 99,
    },
});

export default EventFilterPicker;
