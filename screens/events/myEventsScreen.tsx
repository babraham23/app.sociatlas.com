import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '../../hooks/useTheme';
import ListViewTabBar from '../../components/tabBar/listViewTabBar';
import FAB from '../../components/buttons/FAB';
import { useNavigation } from '@react-navigation/native';
import AnimatedSearchInput from '../../components/inputs/animatedSearch';
import Banner1 from '../../components/banners/banner1';
import { EventData } from '../../api/data/event.data';
import EventForms from '../../components/forms/eventForms';
import EventCard from '../../components/layout/eventCard';
import SearchForm from '../../components/forms/searchForm';
import SelectedEventScreen from '../events/selectedEvent';
import StandardHeader from '../../components/headers/standardHeader';
import EventFilterPicker from '../../components/modals/eventFilterPicker';

const ListViewScreen = () => {
    const { colors, borderRadius } = useTheme();
    const navigation: any = useNavigation();
    const [scrollYValue] = React.useState(new Animated.Value(0));
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);
    const [snapPoint, setSnapPoint] = React.useState('80%');
    const [form, setForm] = useState('eventsForm');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Upcoming');

    const setEvent = (eventId: any) => {
        const selectedEventDetails: any = EventData.find((event: any) => event.id.toString() === eventId);
        setSelectedEvent(selectedEventDetails);
        setForm('selectedEvent');
        setSnapPoint('90%');
        bottomSheetRef.current?.present();
    };

    const handleDismiss = () => {
        console.log('dismiss');
        bottomSheetRef.current?.dismiss();
    };

    const snapPoints = React.useMemo(() => [snapPoint], [snapPoint]);

    const renderBackdrop = React.useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.75} />, []);

    const handleFilterChange = (filter: any) => {
        setSelectedFilter(filter);
        setPickerVisible(false);
        // You can perform any action here based on the selected filter.
    };

    return (
        <>
            <StandardHeader filter title="My Events" onFilterPress={() => setPickerVisible(true)} />
            <ScrollView
                style={[styles.container, { backgroundColor: colors.background }]}
                decelerationRate="normal"
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], { useNativeDriver: false })}
                // stickyHeaderIndices={[0]}
                contentContainerStyle={styles.contentContainerStyle}
            >
                {EventData.map((event) => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        description={event.description}
                        price={event.price}
                        currentAttendees={event.currentAttendees}
                        maxCapacity={event.maxCapacity}
                        date={event.date}
                        image={event.image}
                        video={event.video}
                        interests={event.interests}
                        onPress={() => setEvent(event.id)}
                    />
                ))}
            </ScrollView>
            <BottomSheetModal
                handleIndicatorStyle={{ backgroundColor: colors.text }}
                handleStyle={{ backgroundColor: colors.card, borderTopLeftRadius: borderRadius.card, borderTopRightRadius: borderRadius.card }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onDismiss={() => handleDismiss()}
            >
                {form === 'selectedEvent' ? <SelectedEventScreen event={selectedEvent} /> : null}
            </BottomSheetModal>
            <EventFilterPicker isVisible={isPickerVisible} onFilterChange={handleFilterChange} onClose={() => setPickerVisible(false)} />
        </>
    );
};

export default ListViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainerStyle: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    scrollbar: {
        width: '100%',
        position: 'absolute',
        top: 120,
        zIndex: 80,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 10,
    },
    tabBar: {
        position: 'absolute',
        bottom: 20,
        left: 10,
    },
});
