import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { BAR_SEARCH, RESTAURANT_SEARCH } from '../api/google-endpoints';

const PlacesContext = createContext({
    restaurants: [],
    bars: [],
});

export const PlacesProvider = ({ children }: any) => {
    const [restaurants, setRestaurants]: any = useState([]);
    const [bars, setBars]: any = useState([]);

    const getRestaurants = async () => {
        let lat = 54.969637;
        let lng = -1.619493;
        try {
            const restaurantResponse = await fetch(RESTAURANT_SEARCH(lat, lng));
            // console.log('restaurant response -->', JSON.stringify(restaurantResponse));
            const restaurant = await restaurantResponse.json();
            if (restaurant.status === 'REQUEST_DENIED') alert('Request denied');
            else {
                setRestaurants(restaurant.results);
                // set places for map
            }
        } catch (error) {
            console.error('error e62 -->', error);
        }
    };

    const getBars = async () => {
        let lat = 54.969637;
        let lng = -1.619493;
        try {
            const barsResponse = await fetch(BAR_SEARCH(lat, lng));
            // console.log('restaurant response -->', JSON.stringify(barsResponse));
            const bars = await barsResponse.json();
            if (bars.status === 'REQUEST_DENIED') alert('Request denied');
            else {
                setBars(bars.results);
                // set places for map
            }
        } catch (error) {
            console.error('error e62 -->', error);
        }
    };

    useEffect(() => {
        getRestaurants();
        getBars();
    }, []);

    return (
        <PlacesContext.Provider
            value={{
                restaurants,
                bars,
            }}
        >
            {children}
        </PlacesContext.Provider>
    );
};

export const usePlacesContext = () => useContext(PlacesContext);
