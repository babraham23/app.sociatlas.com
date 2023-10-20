import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ScrollBar from '../../components/scrollbar';
import BigMap from '../../components/map/bigMap2';
import FormModal from '../../components/modals/formModal';
import CreateEventForm from '../../components/forms/createEventForm';
import CreateEventForm2 from '../../components/forms/createEventForm2';
import { BlurView } from 'expo-blur';
import { useMapContext } from '../../context/map.context';
import FAB from '../../components/buttons/FAB';
import MapScreenTabBar from '../../components/tabBar/mapScreenTabBar';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GooglePlacesInput from '../../components/inputs/googleAreaInput';

type Props = {};

const ExploreScreen = ({}: Props) => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [blur, setBlur] = useState(false);
    const { setEventLatitude, setEventLongitude, eventLatitude, eventLongitude } = useMapContext();

    const handleForm1 = () => {
        setShowForm1(true);
        setBlur(true);
    };

    const handleForm2 = () => {
        setShowForm1(false);
        setShowForm2(true);
    };

    const cancelForms = () => {
        setShowForm1(false);
        setShowForm2(false);
        setBlur(false);
    };

    const onMapPress = (item: any) => {
        setEventLatitude(item.latitude);
        setEventLongitude(item.longitude);
        handleForm1();
    };

    const coords = { latitude: eventLatitude, longitude: eventLongitude };

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
                <FAB onCreateEventPress={onMapPress} style={styles.fab} />
                <MapScreenTabBar style={styles.tabBar} />
            </View>
            {blur ? <BlurView tint="dark" intensity={50} style={styles.blurContainer} /> : null}
            <FormModal
                modalVisible={showForm1}
                setModalVisible={() => handleForm1()}
                form={<CreateEventForm onContinuePress={() => handleForm2()} onCancelPress={() => cancelForms()} />}
            />
            <FormModal modalVisible={showForm2} form={<CreateEventForm2 onContinuePress={() => console.log('CREATE EVENT')} onCancelPress={() => cancelForms()} />} />
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
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
});

export default ExploreScreen;
