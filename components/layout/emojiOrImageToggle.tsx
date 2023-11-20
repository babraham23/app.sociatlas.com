import { StyleSheet, Switch, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

const EmojiOrImageToggle = ({ setEmojiOrImage }: any) => {
    const { colors } = useTheme();
    const [switchValue, setSwitchValue] = React.useState(false);
    const toggleSwitch = (value: boolean) => {
        setSwitchValue(value);
        setEmojiOrImage(value);
    };
    return (
        <View style={styles.container}>
            <Text bold>Emoji</Text>
            <Switch thumbColor={colors.primary} trackColor={{ false: colors.card, true: colors.card }} style={[styles.switch]} onValueChange={toggleSwitch} value={switchValue} />
            <Text bold>Image</Text>
        </View>
    );
};

export default EmojiOrImageToggle;

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
