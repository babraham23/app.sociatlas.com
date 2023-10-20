import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import CreateEventForm from './createEventForm';
import CreateEventForm2 from '../../components/forms/createEventForm2';
import CreateEventForm3 from '../../components/forms/createEventForm3';
import { useTheme } from '../../hooks/useTheme';
import LocationForm from './locationForm';
import { useMapContext } from '../../context/map.context';
import { validateFormOne } from '../../functions/validation';
import { useUserContext } from '../../context/user.context';
import { useEventsContext } from '../../context/events.context';

type Props = {
    handleDismiss?: any;
};

/*
{
  "title": "Even more racing!",
  "description": "Lets watch more racing!",
  "date": 1720000000,
  "maxCapacity": 50,
  "interests": [
    { "icon": "🏎️", "title": "Motor Sports" }
  ],
  "location": {
    "address": "Newcastle, United Kingdom",
    "coordinates": [-1.6190185635742933, 54.96958048441685] 
  },
  "image": "",
  "video": "",
  "organizer": {
    "name": "Brett",
    "avatar": "https://example.com/avatar_speedster.jpg",
    "_id": "5f8d0f8b83b9f40017f2b3b9",
    "username": "brett"
  },
  "additionalInfo": "Ensure you come with your speed gear!"
}
*/

const EventForms = ({ handleDismiss }: Props) => {
    const pagerRef: any = React.useRef(null);
    const { colors, borderRadius } = useTheme();
    const { mapRegion, eventLatitude, eventLongitude } = useMapContext();
    const {
        user: { _id, username, name },
    } = useUserContext();
    const { createUserEvent } = useEventsContext();
    // form 1 data
    const [title, setTitle] = React.useState('');
    const [interests, setInterests] = React.useState([]);
    // form 2 data
    const [date, setDate] = React.useState('');
    const [maxCapacity, setMaxCapacity] = React.useState(0);
    const [description, setDescription] = React.useState('');
    // form 3 data
    const [image, setImage] = React.useState('');
    const [video, setVideo] = React.useState('');
    const [organizer, setOrganizer]: any = React.useState('');
    const [additionalInfo, setAdditionalInfo] = React.useState('');
    // error data
    const [titleError, setTitleError] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState('');
    const [dateError, setDateError] = React.useState('');
    const [maxCapacityError, setMaxCapacityError] = React.useState('');
    const [interestsError, setInterestsError] = React.useState('');
    const [imageError, setImageError] = React.useState('');
    const [videoError, setVideoError] = React.useState('');
    const [organizerError, setOrganizerError] = React.useState('');
    const [additionalInfoError, setAdditionalInfoError] = React.useState('');

    const validateFormOne = () => {
        if (!title.trim()) setTitleError('Required');
        if (interests.length === 0) setInterestsError('At least one interest is required');

        return title.trim() && interests.length > 0;
    };

    const validateFormTwo = () => {
        if (!date) setDateError('Required!');
        if (maxCapacity <= 0) setMaxCapacityError('Required');
        if (!description.trim()) setDescriptionError('Required');

        return date && maxCapacity > 0 && description.trim();
    };

    const validateFormThree = () => {
        if (!additionalInfo.trim()) setAdditionalInfoError('Required!');

        return additionalInfo.trim();
    };

    const handlNavigation = (pageNumber: number) => {
        pagerRef.current.setPage(pageNumber);
    };

    const handleFormOne = () => {
        if (!validateFormOne()) return;
        let body = {
            title,
            interests,
            location: {
                coordinates: [eventLongitude, eventLatitude],
            },
        };
        handlNavigation(2);
    };

    const handleFormTwo = () => {
        if (!validateFormTwo()) return;
        let body = {
            date,
            maxCapacity,
            description,
        };
        console.log('form 2 --> ', body);
        handlNavigation(3);
    };

    const handleFormThree = () => {
        if (!validateFormThree()) return;
        let body = {
            additionalInfo,
        };
        createEvent();
    };

    const createEvent = async () => {
        let body = {
            title,
            description,
            date,
            maxCapacity,
            interests,
            location: {
                coordinates: [eventLongitude, eventLatitude],
            },
            organizer: {
                name,
                _id,
                username,
            },
            additionalInfo,
            image,
            video,
        };
        let response = await createUserEvent(body);
        if (response === 200) {
            handleDismiss();
        }
    };

    return (
        <View style={styles.container}>
            <PagerView scrollEnabled={false} style={styles.viewPager} initialPage={1} ref={pagerRef}>
                <View style={[styles.page, { backgroundColor: colors.card }]} key="1">
                    <LocationForm onBackPress={() => handlNavigation(1)} onSavePress={() => handlNavigation(1)} />
                </View>
                <View style={[styles.page, { backgroundColor: colors.card }]} key="2">
                    <CreateEventForm
                        setTitle={setTitle}
                        setDescription={setDescription}
                        handleDismiss={handleDismiss}
                        setInterests={setInterests}
                        interests={interests}
                        onContinuePress={() => handleFormOne()}
                        onFindAddressPress={() => handlNavigation(0)}
                        TitleError={titleError}
                        InterestError={interestsError}
                    />
                </View>
                <View style={[styles.page, { backgroundColor: colors.card }]} key="3">
                    <CreateEventForm2
                        handleDismiss={() => handlNavigation(1)}
                        onContinuePress={() => handleFormTwo()}
                        setDate={setDate}
                        setMaxCapacity={setMaxCapacity}
                        setDescription={setDescription}
                        DateError={dateError}
                        MaxCapacityError={maxCapacityError}
                        DescriptionError={descriptionError}
                    />
                </View>
                <View style={[styles.page, { backgroundColor: colors.card }]} key="4">
                    <CreateEventForm3
                        handleDismiss={() => handlNavigation(2)}
                        onContinuePress={() => handleFormThree()}
                        AdditionalInfoError={additionalInfoError}
                        setAdditionalInfo={setAdditionalInfo}
                        setImage={setImage}
                    />
                </View>
            </PagerView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewPager: {
        flex: 1,
    },
    page: {},
});

export default EventForms;
