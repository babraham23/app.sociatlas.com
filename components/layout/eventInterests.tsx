import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import InterestIcon from '../buttons/interestIcon';
import { useCreateEventContext } from '../../context/createEvent.context';
import { Text } from '../../style/typography';

const EventInterests = ({ onPress }: any) => {
    const { colors, borderRadius } = useTheme();
    const { interests, removeInterest } = useCreateEventContext();

    return (
        <View style={[styles.container, { borderColor: colors.border, borderRadius: borderRadius.card, backgroundColor: colors.card }]}>
            {interests.length ? (
                <View style={styles.interestWrapper}>
                    {interests.map((item: any, i: any) => {
                        return <InterestIcon icon={item.icon} key={i} title={item.title} onRemovePress={() => removeInterest(item._id)} image={item.image} />;
                    })}
                </View>
            ) : (
                <View style={styles.placeholderWrapper}>
                    <Text color={colors.dark_grey}>Pick up to 3 interests</Text>
                </View>
            )}

            <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.iconWrapper}>
                <View style={{ transform: [{ rotate: '0deg' }] }}>
                    <AntDesign name="down" size={23} color={colors.text} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default EventInterests;

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        paddingVertical: 10,
        justifyContent: 'center',
        borderWidth: 0.5,
    },
    interestWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '85%',
    },
    iconWrapper: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingLeft: 20,
    },
    placeholderWrapper: {
        width: '85%',
        paddingLeft: 10,
        // height: '100%',
    },
});

// {interests.map((item: any, i: any) => {
//     return (
//         <InterestIcon icon={item.icon} disabled key={i} title={item.title} onRemovePress={() => removeInterest(item._id)} image={item.image} />
//     );
// })}
