import React from 'react';
import { EventsProvider } from './events.context';
import { MapProvider } from './map.context';
import { UserProvider } from './user.context';
import { CreateEventProvider } from './createEvent.context';

const ContextWrapper = ({ children }: any) => {
    return (
        <MapProvider>
            <UserProvider>
                <EventsProvider>
                    <CreateEventProvider>{children}</CreateEventProvider>
                </EventsProvider>
            </UserProvider>
        </MapProvider>
    );
};

export default ContextWrapper;
