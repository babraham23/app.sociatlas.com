import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const Filters = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text>Expand date range</Text>
        </View>
    );
};

export default Filters;

const styles = StyleSheet.create({
    container: {

    },
});
