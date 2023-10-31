import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ScrollBar from '../../components/scrollbar';
import BigMap from '../../components/map/bigMap';
import FAB from '../../components/buttons/FAB';
import MapScreenTabBar from '../../components/tabBar/mapScreenTabBar';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GooglePlacesInput from '../../components/inputs/googleAreaInput';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import EventForms from '../../components/forms/eventForms';
import SearchForm from '../../components/forms/searchForm';
import { useUserContext } from '../../context/user.context';
import { useCreateEventContext } from '../../context/createEvent.context';

type Props = {};

const ExploreScreen = ({}: Props) => {
    const { colors, borderRadius } = useTheme();
    const navigation: any = useNavigation();
    const [snapPoint, setSnapPoint] = useState('80%');
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const { setEventLatitude, setEventLongitude } = useCreateEventContext();
    const { userLoggedIn } = useUserContext();
    const [form, setForm] = useState('eventsForm');

    const handleOpen = (type: string) => {
        if (type === 'search') {
            setForm('search');
            setSnapPoint('80%');
            bottomSheetRef.current?.present();
        } else {
            setForm('eventsForm');
            setSnapPoint('90%');
            bottomSheetRef.current?.present();
        }
    };

    const handleDismiss = () => {
        console.log('dismiss');
        bottomSheetRef.current?.dismiss();
    };

    const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.75} />, []);

    const onMapPress = (item: any) => {
        setEventLatitude(item.latitude);
        setEventLongitude(item.longitude);
        navigation.navigate('CreateEventForm1');
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <GooglePlacesInput />
                    <TouchableOpacity activeOpacity={9} onPress={() => navigation.toggleDrawer()} style={[styles.burgerWrapper, { backgroundColor: colors.card }]}>
                        <Feather name="menu" size={34} color={colors.text} />
                    </TouchableOpacity>
                </View>
                <ScrollBar style={styles.scrollbar} />
                <BigMap onMapPress={onMapPress} />
                {userLoggedIn && <FAB onCreateEventPress={onMapPress} style={styles.fab} />}
                <MapScreenTabBar style={styles.tabBar} onSearchFormPress={() => handleOpen('search')} />
            </View>

            <BottomSheetModal
                handleIndicatorStyle={{ backgroundColor: colors.text }}
                handleStyle={{ backgroundColor: colors.card, borderTopLeftRadius: borderRadius.card, borderTopRightRadius: borderRadius.card }}
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onDismiss={() => handleDismiss()}
            >
                {form === 'eventsForm' ? <EventForms handleDismiss={handleDismiss} /> : <SearchForm handleDismiss={handleDismiss} />}
            </BottomSheetModal>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 20,
        width: '100%',
        zIndex: 99,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollbar: {
        width: '100%',
        position: 'absolute',
        top: 120,
        zIndex: 80,
    },
    burgerWrapper: {
        width: '15%',
        height: 60,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    container: {
        flex: 1,
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
    mapButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    handleStyle: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        height: 36,
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
});

export default ExploreScreen;

/*
"latitude": 54.96910861470028, 
"longitude": -1.617974761369099
*/
