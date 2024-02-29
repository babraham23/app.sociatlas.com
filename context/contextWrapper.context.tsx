import React from 'react';
import { EventsProvider } from './events.context';
import { MapProvider } from './map.context';
import { UserProvider } from './user.context';
import { CreateEventProvider } from './createEvent.context';
import { FriendsProvider } from './friends.context';

const ContextWrapper = ({ children }: any) => {
    return (
        <MapProvider>
            <UserProvider>
                <EventsProvider>
                    <CreateEventProvider>
                        <FriendsProvider>{children}</FriendsProvider>
                    </CreateEventProvider>
                </EventsProvider>
            </UserProvider>
        </MapProvider>
    );
};

export default ContextWrapper;
