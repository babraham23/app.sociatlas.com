import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import RoundButton from '../buttons/roundButton';
import Accordion from '../accordions/interestsAccordion';

type Props = {
    style?: any;
    title?: string;
    numberOfPeopleConfirmed?: number;
    maxOfPeople?: number;
    icon?: string;
    onPress?: any;
    animateBorder?: any;
};

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 70;
const CARD_WIDTH = width * 0.8;

const EventMapCard = ({ style, numberOfPeopleConfirmed, maxOfPeople, title, icon, onPress, animateBorder }: Props) => {
    const { colors, borderRadius } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderTopLeftRadius: borderRadius.card, borderTopRightRadius: borderRadius.card, borderBottomLeftRadius: animateBorder, borderBottomRightRadius: animateBorder }]}>
            <View style={styles.wrapper}>
                <View style={styles.left}>
                    <View style={[styles.circle, { backgroundColor: colors.background }]}>
                        <Text fontSize={18} lineHeight={21}>
                            {icon}
                        </Text>
                    </View>
                </View>
                <View style={styles.center}>
                    <Text bold>{title}</Text>
                    <Text fontSize={14} color={colors.grey}>
                        {numberOfPeopleConfirmed}/{maxOfPeople} Joined
                    </Text>
                </View>
                <View style={styles.right}>
                    <RoundButton onPress={onPress} />
                </View>
            </View>
        </View>
    );
};

export default EventMapCard;

const styles = StyleSheet.create({
    container: {
        elevation: 2,
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        justifyContent: 'center',
    },
    wrapper: {
        flexDirection: 'row',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        width: '60%',
        justifyContent: 'center',
    },
    right: {
        width: '20%',
        justifyContent: 'center',
    },
    cardTop: {
        height: 10,
    },
});
