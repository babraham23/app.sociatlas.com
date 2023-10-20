import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import QuickJoinButton from '../buttons/quickJoinButton';

type Props = {
    quickJoin?: boolean;
    onPress?: any;
    description?: string;
    dateTime?: string;
};

const EventMapCardContent = ({ quickJoin, onPress, description, dateTime }: Props) => {
    return (
        <View style={styles.container} >
            <View style={styles.textWrapper} >
                <Text numberOfLines={4} >{description}</Text>
            </View>
            <QuickJoinButton />
        </View>
    );
};

export default EventMapCardContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 150,
        paddingHorizontal: 10,
        width: '100%',
    },
    textWrapper: {
        height: 85
    }
});
