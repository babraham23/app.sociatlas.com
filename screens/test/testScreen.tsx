import { StyleSheet, View } from 'react-native';
import React from 'react';
import ImagePickerComponent from '../../components/picker/imagePicker';

const TestScreen = () => {
    return (
        <View style={styles.container}>
            <ImagePickerComponent />
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: 100,
    },
});
