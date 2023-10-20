import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import { getEventByIdRequest, getEventsByInterestsRequest, getEventsRequest, postEventRequest } from '../../api/events/events.requests';

const TestScreen = () => {
    const getEvents = async () => {
        getEventsRequest()
            .then((res: any) => console.log('success -->', JSON.stringify(res.data)))
            .catch((err: any) => console.log('error', err));
    };

    const createEvent = () => {
        const event = {
            coordinate: {
                latitude: 32.123,
                longitude: 32.123,
            },
            title: 'test3',
            description: 'test3',
            interests: ['test3'],
            date: 123123,
            maxOfPeople: 123,
            icon: 'test',
            numberOfPeopleConfirmed: 123,
        };
        postEventRequest(event)
            .then((res: any) => console.log('success -->', JSON.stringify(res.data)))
            .catch((err: any) => console.log('error', err));
    };

    const getEventById = () => {
        const id = '6454b275de3d100251d0e73b';
        getEventByIdRequest(id)
            .then((res: any) => console.log('success -->', JSON.stringify(res.data)))
            .catch((err: any) => console.log('error', err));
    };

    const getEventsByInterest = () => {
        const interest = 'test';
        console.log('interest', interest)
        // getEventsByInterestsRequest(interest)
        //     .then((res: any) => console.log('success -->', JSON.stringify(res.data)))
        //     .catch((err: any) => console.log('error', err));
    }


    return (
        <View style={styles.container}>
            <Button title="get event" onPress={getEvents} />
            <Button title="create event" onPress={createEvent} />
            <Button title="getEventById" onPress={getEventById} />
            <Button title="getEventsByInterest" onPress={getEventsByInterest} />
        </View>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
