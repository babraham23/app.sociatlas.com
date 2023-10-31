import React from 'react';
import { EventsProvider } from './events.context';
import { MapProvider } from './map.context';
import { UserProvider } from './user.context';
import { CreateEventProvider } from './createEvent.context';
import { PlacesProvider } from './places.context';

const ContextWrapper = ({ children }: any) => {
    return (
        <MapProvider>
            <UserProvider>
                <PlacesProvider>
                    <EventsProvider>
                        <CreateEventProvider>{children}</CreateEventProvider>
                    </EventsProvider>
                </PlacesProvider>
            </UserProvider>
        </MapProvider>
    );
};

export default ContextWrapper;
