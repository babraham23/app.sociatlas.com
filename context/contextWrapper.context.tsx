import React from 'react';
import { EventsProvider } from './events.context';
import { MapProvider } from './map.context';
import { UserProvider } from './user.context';
import { CreateEventProvider } from './createEvent.context';
import { FriendsProvider } from './friends.context';
import { ChatProvider } from './chat.context';

const ContextWrapper = ({ children }: any) => {
    return (
        <MapProvider>
            <UserProvider>
                <EventsProvider>
                    <CreateEventProvider>
                        <FriendsProvider>
                            <ChatProvider>{children}</ChatProvider>
                        </FriendsProvider>
                    </CreateEventProvider>
                </EventsProvider>
            </UserProvider>
        </MapProvider>
    );
};

export default ContextWrapper;
