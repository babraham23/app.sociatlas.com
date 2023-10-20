import React, { createContext, FC, useContext, useState } from 'react';

type Context = {
    longitude?: any;
    latitude?: any;
    setLongitude?: any;
    setLatitude?: any;
    eventLongitude?: any;
    eventLatitude?: any;
    setEventLongitude?: any;
    setEventLatitude?: any;
    mapRegion?: any;
    setMapRegion?: any;
    userLatitude?: any;
    userLongitude?: any;
    setUserLatitude?: any;
    setUserLongitude?: any;
};

const MapContext = createContext<Context>({
    longitude: '',
    latitude: '',
    setLongitude: () => {},
    setLatitude: () => {},
    eventLongitude: '',
    eventLatitude: '',
    setEventLongitude: () => {},
    setEventLatitude: () => {},
    mapRegion: '',
    setMapRegion: () => {},
    userLatitude: '',
    userLongitude: '',
    setUserLatitude: () => {},
    setUserLongitude: () => {},
});

export const MapProvider = ({ children }: any) => {
    const [longitude, setLongitude]: any = useState(0);
    const [latitude, setLatitude]: any = useState(0);
    const [eventLongitude, setEventLongitude]: any = useState(0);
    const [eventLatitude, setEventLatitude]: any = useState(0);
    const [userLatitude, setUserLatitude]: any = useState(54.96958048441685);
    const [userLongitude, setUserLongitude]: any = useState(-1.6190185635742933);
    const [mapRegion, setMapRegion]: any = useState({
        latitude: 54.96958048441685,
        longitude: -1.6190185635742933,
        latitudeDelta: 0.005647463573936307,
        longitudeDelta: 0.005028943213119419,
    });

    return (
        <MapContext.Provider
            value={{
                longitude,
                latitude,
                setLongitude,
                setLatitude,
                eventLongitude,
                eventLatitude,
                setEventLongitude,
                setEventLatitude,
                mapRegion,
                setMapRegion,
                userLatitude,
                userLongitude,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = (): Context => useContext<Context>(MapContext);
