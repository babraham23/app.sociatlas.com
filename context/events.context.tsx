import React, { createContext, FC, useContext, useState } from 'react';
import { createEvent, getEventsNearby } from '../api/events/events.requests';
import { getAllInterests, getInterestsByCreator, getMostUsedInterests, getScrollBarData } from '../api/interests/interests.requests';
import { useUserContext } from './user.context';
import { set } from 'react-native-reanimated';
import { getGoogleBars, getGoogleRestaurants } from '../api/google/google.requests';

type Context = {
    events?: any;
    interests?: any;
    setInterests?: any;
    selectedInterest?: any;
    setSelectedInterest?: any;
    scrollBarData?: any;
    setScrollBarData?: any;
    mapScreenEvents?: any;
    setMapScreenEvents?: any;
    interestRadius?: any;
    setInterestRadius?: any;
    createUserEvent?: any;
    getEventsByLocation?: any;
    userInterests?: any;
    setUserInterests?: any;
    getUserInterests?: any;
    getInterests?: any;
    getMapEventsByLocation?: any;
    selecteMapInterests?: any;
    setSelectedMapInterests?: any;
};

const EventsContext = createContext<Context>({
    events: '',
    scrollBarData: '',
    setScrollBarData: () => [],
    selectedInterest: '',
    setSelectedInterest: () => [],
    createUserEvent: () => [],
    interests: [],
    setInterests: () => [],
    getEventsByLocation: () => [],
    interestRadius: 1000,
    setInterestRadius: () => [],
    userInterests: [],
    setUserInterests: () => [],
    getUserInterests: () => [],
    getInterests: () => [],
    getMapEventsByLocation: () => [],
    mapScreenEvents: [],
    setMapScreenEvents: () => [],
    selecteMapInterests: [],
    setSelectedMapInterests: () => [],
});

export const EventsProvider = ({ children }: any) => {
    const { user } = useUserContext();
    const [appLoaded, setAppLoaded]: any = useState(false);
    const [events, setEvents]: any = useState([]);
    const [scrollBarData, setScrollBarData]: any = useState([]);
    const [selectedInterest, setSelectedInterest]: any = useState([]);
    const [interests, setInterests]: any = useState([]);
    const [interestRadius, setInterestRadius]: any = useState(1000);
    const [userInterests, setUserInterests] = useState([]);

    const [mapScreenEvents, setMapScreenEvents]: any = useState([]);
    const [activeCategories, setActiveCategories]: any = useState({});
    const [selecteMapInterests, setSelectedMapInterests] = React.useState<any>([]);

    const [googlePlaces, setGooglePlaces] = useState<any>([]);
    const [activeGooglePlaces, setActiveGooglePlaces] = useState<any>({});
    const [selectedGooglePlaces, setSelectedGooglePlaces] = useState<any>([]);

    const handleAppLoad = async () => {
        console.log('------ APP LOAD ------');
        try {
            getInterests();
            getScrollData();
        } catch (error) {
            console.log(error);
        } finally {
            setAppLoaded(true);
        }
    };

    const getInterests = async () => {
        try {
            let response = await getScrollBarData();
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
            maxDistance: interestRadius, //distance
        };
        try {
            let response = await getEventsNearby(data);
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMapEventsByLocation = async (interestTitle?: any, interestRadius?: number) => {
        if (interestTitle === 'Restaurants' || interestTitle === 'Drinks') {
            getGooglePlaces(interestTitle);
        } else {
            let data = {
                latitude: 54.969450152452,
                longitude: -1.6194726722736448,
                interestTitle,
                maxDistance: interestRadius,
            };
            try {
                let response = await getEventsNearby(data);
                if (activeCategories[interestTitle]) {
                    const filteredEvents = mapScreenEvents.filter((event: any) => !event.interests.some((interest: any) => interest.title === interestTitle));
                    setMapScreenEvents(filteredEvents);
                    setActiveCategories({ ...activeCategories, [interestTitle]: false });
                } else {
                    const newEvents = response.data.filter((newEvent: any) => !mapScreenEvents.some((existingEvent: any) => existingEvent._id === newEvent._id));
                    setMapScreenEvents([...mapScreenEvents, ...newEvents]);
                    setActiveCategories({ ...activeCategories, [interestTitle]: true });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    console.log('map screen events -->', JSON.stringify(mapScreenEvents));

    const getGooglePlaces = async (interestTitle: string) => {
        console.log('interest title -->', interestTitle);
        let data = {
            latitude: 54.969450152452,
            longitude: -1.6194726722736448,
            interestTitle,
            maxDistance: interestRadius,
        };
        if (interestTitle === 'Restaurants') {
            try {
                let response = await getGoogleRestaurants(data.latitude, data.longitude, data.maxDistance);
                console.log('response restaurants -->', JSON.stringify(response));
                // setRestaurants(response.data.results);
            } catch (error) {
                console.log(error);
            }
        } else if (interestTitle === 'Drinks') {
            try {
                let response = await getGoogleBars(data.latitude, data.longitude, data.maxDistance);
                console.log('response bars -->', response);
            } catch (error) {
                console.log(error);
            }
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
        try {
            let response = await getInterestsByCreator(user._id);
            if (response.status === 200) {
                setUserInterests(response.data);
            }
        } catch (error) {
            console.log('error -->', error);
        }
    };

    // getScrollBarData
    const getScrollData = async () => {
        try {
            let response = await getScrollBarData();
            setScrollBarData(response.data);
            getMapEventsByLocation(response.data[0].title, interestRadius);
            setSelectedMapInterests([response.data[0]._id]);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        !appLoaded && handleAppLoad();
    }, []);

    return (
        <EventsContext.Provider
            value={{
                events,
                interests,
                userInterests,
                scrollBarData,
                setScrollBarData,
                selectedInterest,
                setSelectedInterest,
                getEventsByLocation,
                interestRadius,
                setInterestRadius,
                setUserInterests,
                getUserInterests,
                getInterests,
                getMapEventsByLocation,
                createUserEvent,
                mapScreenEvents,
                setMapScreenEvents,
                selecteMapInterests,
                setSelectedMapInterests,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export const useEventsContext = (): Context => useContext<Context>(EventsContext);
