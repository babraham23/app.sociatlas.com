import React, { createContext, FC, useContext, useState } from 'react';
import { createEvent, getEventsNearby } from '../api/events/events.requests';
import { getAllInterests, getInterestsByCreator, getMostUsedInterests } from '../api/interests/interests.requests';
import { useUserContext } from './user.context';

type Context = {
    events?: any;
    setEvents?: any;
    scrollData?: any;
    setScrollData?: any;
    selectedInterest?: any;
    setSelectedInterest?: any;
    scrollview_ref?: any;
    createUserEvent?: any;
    getEventsByLocation?: any;
    interests?: any;
    setInterests?: any;
    interestRadius?: any;
    setInterestRadius?: any;
    userInterests?: any;
    setUserInterests?: any;
    getUserInterests?: any;
    getInterests?: any;
};

const EventsContext = createContext<Context>({
    events: '',
    setEvents: () => [],
    scrollData: '',
    setScrollData: () => [],
    selectedInterest: '',
    setSelectedInterest: () => [],
    scrollview_ref: {},
    createUserEvent: () => [],
    interests: [],
    setInterests: () => [],
    getEventsByLocation: () => [],
    interestRadius: 1000,
    setInterestRadius: () => [],
    userInterests: [],
    setUserInterests: () => [],
    getUserInterests: () => [],
    getInterests: () => []
});

export const EventsProvider = ({ children }: any) => {
    const { user } = useUserContext();
    const [appLoaded, setAppLoaded]: any = useState(false);
    const [events, setEvents]: any = useState([]);
    const [scrollData, setScrollData]: any = useState([]);
    const [selectedInterest, setSelectedInterest]: any = useState([]);
    const scrollview_ref: any = React.useRef({});
    const [interests, setInterests]: any = useState([]);
    const [interestRadius, setInterestRadius]: any = useState(1000);
    const [userInterests, setUserInterests] = useState([]);

    const handleAppLoad = async () => {
        console.log('------ APP LOAD ------');
        /**
         * 1. Get user location
         * 2. Get all interests
         * 3. Get events by interest, location, date, and distance
         */
        try {
            getInterests();
        } catch (error) {
            console.log(error);
        } finally {
            setAppLoaded(true);
        }
    };

    const getInterests = async () => {
        try {
            let response = await getMostUsedInterests();
            // console.log('get interests response -->', JSON.stringify(response.data));
            setInterests(response.data);
            setSelectedInterest(response.data[0]);
            getEventsByLocation(response.data[0].title, interestRadius);
        } catch (error) {
            console.log(error);
        }
    };

    const getEventsByLocation = async (interestTitle?: string, interestRadius?: number) => {
        let data = {
            latitude: 54.969450152452, // lat
            longitude: -1.6194726722736448, //lng
            interestTitle,
            // maxDistance: 16093.4, //distance
            maxDistance: interestRadius, //distance
        };
        try {
            let response = await getEventsNearby(data);
            // console.log('events response -->', response.data);
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createUserEvent = async (body: any) => {
        try {
            let response = await createEvent(body);
            if (response.status === 200) {
                getInterests();
                getEventsByLocation(selectedInterest.title, interestRadius);
                return response.status;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserInterests = async () => {
        console.log('GETTING USER INTERESTS')
        try {
            let response = await getInterestsByCreator(user._id);
            console.log('user interests response -->', response.data);
            if (response.status === 200) {
                setUserInterests(response.data);
            }
        } catch (error) {
            console.log('error -->', error);
        }
    };

    React.useEffect(() => {
        !appLoaded && handleAppLoad();
    }, []);

    return (
        <EventsContext.Provider
            value={{
                events,
                setEvents,
                scrollData,
                setScrollData,
                selectedInterest,
                setSelectedInterest,
                scrollview_ref,
                interests,
                createUserEvent,
                getEventsByLocation,
                interestRadius,
                setInterestRadius,
                userInterests,
                setUserInterests,
                getUserInterests,
                getInterests
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export const useEventsContext = (): Context => useContext<Context>(EventsContext);
