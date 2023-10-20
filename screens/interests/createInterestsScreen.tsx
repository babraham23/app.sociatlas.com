import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FormTitle from '../../components/layout/formTitle';
import FormInput from '../../components/inputs/formInput';
import { Text } from '../../style/typography';
import ImagePicker from '../../components/picker/imagePicker';
import OvalButton from '../../components/buttons/ovalButton';
import BigIterestIcon from '../../components/buttons/bigInterestIcon';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/user.context';
import { createInterest } from '../../api/interests/interests.requests';
import { checkInterestAvailibility } from '../../api/interests/interests.requests';
import { createInterestValidation } from '../../functions/validation';
import { set } from 'mongoose';
import { useEventsContext } from '../../context/events.context';
/* 
Interest name (check if already exists)
Icon (emoji or image)
*/

const pageTitle = 'Create an Interest';

const CreateInterestsScreen = () => {
    const { colors } = useTheme();
    const debounceTimerRef: any = React.useRef(null);
    const { user } = useUserContext();
    const { getUserInterests } = useEventsContext()
    const navigation: any = useNavigation();
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [imageError, setImageError] = React.useState('');
    const [interestError, setInterestError] = React.useState('');
    const [interestExistsError, setInterestExistsError] = React.useState(false);

    const handleDismiss = () => {
        console.log('dismiss');
        navigation.goBack();
    };

    const onContinuePress = async () => {
        setImageError('');
        setInterestError('');
        setInterestExistsError(false);
        let body = {
            title,
            icon: '',
            createdBy: user._id,
            selected: 1,
            image,
            hidden: false,
        };
        const validation = createInterestValidation(body);
        console.log('validation -->', validation);
        if (validation.valid) {
            try {
                let response = await createInterest(body);
                if (response.status === 201) {
                    getUserInterests();
                    navigation.pop(1);
                }
            } catch (error) {
                console.log('error -->', error);
            }
        } else {
            validation.errors.map((item: any) => {
                console.log('item -->', item);
                if (item.name === 'titleError') {
                    setInterestError(item.error);
                }
                if (item.name === 'imageError') {
                    setImageError(item.error);
                }
            });
        }
    };

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);

        // Check if the new title is an empty string
        if (newTitle === '') {
            // Reset the error states
            setInterestExistsError(false);
            setInterestError('');
            // Clear any previous debounce timers
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            // Exit early so we don't check for existing interests with an empty string
            return;
        }

        // Clear the previous timer if there is one
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
            checkIfinterestAlreadyExists(newTitle);
        }, 500);
    };

    const checkIfinterestAlreadyExists = async (interestToCheck: string) => {
        // Check if the username hasn't changed
        if (interestToCheck === title) {
            setInterestExistsError(false);
            return;
        }

        let body = { title: interestToCheck };
        console.log('body -->', body);
        try {
            const res = await checkInterestAvailibility(body);
            console.log('res -->', res);
            setInterestExistsError(false);
        } catch (error: any) {
            console.log('error', error.message);
            if (error.response.status === 400) {
                setInterestExistsError(true);
            }
        }
    };

    React.useEffect(() => {
        return () => {
            // Cleanup timer on component unmount
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text fontSize={20} bold>
                {pageTitle}
            </Text>
            <FormTitle title="Interest" error={interestExistsError ? 'Interest already exists' : interestError} />
            <FormInput onChangeText={(text: any) => handleTitleChange(text.replace('@', ''))} error={interestExistsError} placeholder="What is your interest?" />
            <FormTitle title="Icon" error={imageError} />
            <ImagePicker setBlobImage={setImage} />
            {title && (
                <View style={styles.interestWrapper}>
                    <BigIterestIcon title={title} icon={image} />
                </View>
            )}
            <View style={styles.buttonWrapper}>
                <OvalButton title="Create Interest" onPress={onContinuePress} />
                <OvalButton secondary title="Cancel" onPress={handleDismiss} />
            </View>
        </View>
    );
};

export default CreateInterestsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 50,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignSelf: 'center',
    },
    interestWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    closeWrapperWrapper: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 99,
    },
});
