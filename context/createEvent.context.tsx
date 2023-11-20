import React, { createContext, useContext, useState } from 'react';
import { createEvent } from '../api/events/events.requests';
import { useUserContext } from './user.context';

/*
FORM 1
title
description
date
coordinates

FORM 2
interests
image

*/

const CreateEvent = createContext<any>({
    // FORM 1
    title: '',
    setTitle: () => {},
    description: '',
    setDescription: () => {},
    date: '',
    setDate: () => {},
    address: '',
    setAddress: () => {},
    eventLatitude: '',
    setEventLatitude: () => {},
    eventLongitude: '',
    setEventLongitude: () => {},
    mapRegion: {},
    setMapRegion: () => {},
    // FORM 2
    interests: [],
    setInterests: () => {},
    image: '',
    setImage: () => {},
    // FORM 3
    isPrivate: false,
    setIsPrivate: () => {},
    invitees: [],
    setInvitees: () => {},
    // FORM 4
    additionalInfo: '',
    setAdditionalInfo: () => {},
    maxCapacity: 0,
    setMaxCapacity: () => {},
    price: 0,
    setPrice: () => {},
    removeState: () => {},
    handleCreateEvent: () => {},
});

export const CreateEventProvider = ({ children }: any) => {
    const { user } = useUserContext();
    // FORM 1
    const [title, setTitle]: any = useState('');
    const [description, setDescription]: any = useState('');
    const [date, setDate]: any = useState('');
    const [address, setAddress]: any = useState('');
    const [eventLatitude, setEventLatitude]: any = useState(0);
    const [eventLongitude, setEventLongitude]: any = useState(0);
    const [mapRegion, setMapRegion]: any = useState({
        latitude: 54.96958048441685,
        longitude: -1.6190185635742933,
        latitudeDelta: 0.005647463573936307,
        longitudeDelta: 0.005028943213119419,
    });
    const [interests, setInterests]: any = useState([]);
    const [image, setImage]: any = useState('');
    const [isPrivate, setIsPrivate]: any = useState(false);
    const [invitees, setInvitees]: any = useState([]);
    const [additionalInfo, setAdditionalInfo]: any = useState('');
    const [maxCapacity, setMaxCapacity]: any = useState(0);
    const [price, setPrice]: any = useState(0);

    const handleCreateEvent = async () => {
        const body = {
            title,
            description,
            date,
            location: {
                address,
                coordinates: [eventLongitude, eventLatitude],
            },
            interests,
            image,
            isPrivate,
            invitees,
            additionalInfo,
            maxCapacity,
            price,
            currentAttendees: [],
            likedBy: [],
            organizer: {
                _id: user._id,
                name: user.name,
                username: user.username,
            },
        };
        // set all fields to empty after success response
        console.log('Create event body', JSON.stringify(body));
        try {
            let response = await createEvent(body);
            if (response.status === 200) {
                removeState();
                return response.status;
            }
        } catch (error: any) {
            console.log('create event error -->', error);
        }
    };

    const removeState = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setAddress('');
        setEventLatitude(0);
        setEventLongitude(0);
        setInterests([]);
        setImage('');
        setIsPrivate(false);
        setInvitees([]);
        setAdditionalInfo('');
        setMaxCapacity(0);
        setPrice(0);
    };

    const addInterest = (item: any) => {
        setInterests([...interests, item]);
    };

    const removeInterest = (id: any) => {
        setInterests(interests.filter((item: any) => item._id !== id));
    };

    return (
        <CreateEvent.Provider
            value={{
                title,
                setTitle,
                description,
                setDescription,
                date,
                setDate,
                address,
                setAddress,
                eventLatitude,
                setEventLatitude,
                eventLongitude,
                setEventLongitude,
                mapRegion,
                setMapRegion,
                interests,
                setInterests,
                image,
                setImage,
                isPrivate,
                setIsPrivate,
                invitees,
                setInvitees,
                additionalInfo,
                setAdditionalInfo,
                maxCapacity,
                setMaxCapacity,
                price,
                setPrice,
                addInterest,
                removeInterest,
                removeState,
                handleCreateEvent,
            }}
        >
            {children}
        </CreateEvent.Provider>
    );
};

export const useCreateEventContext = () => useContext(CreateEvent);
