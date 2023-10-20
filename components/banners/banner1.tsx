import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import Card from './card';
import { Text } from '../../style/typography';

type Props = {
    id?: number;
    title?: string;
    description?: string;
    location?: string;
    date?: string;
    time?: string;
    geometry?: {
        lat?: number;
        lng?: number;
    };
    image?: string;
    attendees?: any;
    address?: string;
    icon?: any;
};

const Banner1 = ({ id, title, description, location, date, time, geometry, image, attendees, address, icon }: Props) => {
    const { colors } = useTheme();
    return (
        <Card style={[styles.container]}>
            <View style={styles.top}>
                <View style={styles.header}>
                    <Text lineHeight={24} fontSize={20} bold>
                        {title}
                    </Text>
                    <Text bold style={styles.description} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
               {image && <View style={styles.image} />}
            </View>
            <View style={styles.location}>
                <Text>{address}</Text>
            </View>
            <View style={styles.bottom}>
                <Text>{attendees} going</Text>
                <Text>{icon}</Text>
                <View style={styles.dateWrapper}>
                    <Text bold>date</Text>
                    <Text bold>time</Text>
                </View>
            </View>
        </Card>
    );
};

export default Banner1;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 20,
        height: 250,
    },
    top: {
        flexDirection: 'row',
        height: 100,
    },
    header: {
        width: '65%',
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'darkred',
        borderRadius: 10,
    },
    description: {
        marginTop: 10,
        marginBottom: 10,
    },
    location: {
        marginTop: 20,
        paddingTop: 5,
        height: 80,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateWrapper: {
        flexDirection: 'row',
    },
});
