import { StyleSheet, Switch, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const PublicToggle = ({ setIsPrivate }: any) => {
    const { colors } = useTheme();
    const [switchValue, setSwitchValue] = React.useState(false);
    const toggleSwitch = (value: boolean) => {
        setSwitchValue(value);
        setIsPrivate(value);
    };
    return (
        <View style={styles.container}>
            <Text bold>Public</Text>
            <Switch thumbColor={colors.primary} trackColor={{ false: colors.card, true: colors.card }} style={[styles.switch]} onValueChange={toggleSwitch} value={switchValue} />
            <Text bold>Private</Text>
        </View>
    );
};

export default PublicToggle;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    switch: {
        marginHorizontal: 16,
    },
});
