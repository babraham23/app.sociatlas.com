import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { color } from 'react-native-reanimated';

const FormTitle = ({ title, error }: any) => {
    return (
        <View style={styles.container}>
            <Text bold>{title}</Text>
            <Text bold style={styles.error} color={'red'}>
                {error}
            </Text>
        </View>
    );
};

export default FormTitle;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 5,
        flexDirection: 'row',
    },
    error: {
        marginLeft: 5,
    },
});
