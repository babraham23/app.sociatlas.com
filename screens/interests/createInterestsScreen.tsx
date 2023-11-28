import { StyleSheet, View } from 'react-native';
import React from 'react';
import FormTitle from '../../components/layout/formTitle';
import FormInput from '../../components/inputs/formInput';
import { Text } from '../../style/typography';
import ImagePicker from '../../components/picker/imagePicker';
import OvalButton from '../../components/buttons/ovalButton';
import BigIterestIcon from '../../components/buttons/bigInterestIcon';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/user.context';
import { checkInterestAvailibility, createInterest } from '../../api/interests/interests.requests';
import { createInterestWithEmojiValidation, createInterestWithImageValidation } from '../../functions/validation';
import EmojiOrImageToggle from '../../components/layout/emojiOrImageToggle';
import SmallTextInput from '../../components/inputs/smallTextInput';
import { useEventsContext } from '../../context/events.context';

/* 
Interest name (check if already exists)
Icon (emoji or image)
*/

const pageTitle = 'Create an Interest';

const CreateInterestsScreen = () => {
    const debounceTimerRef: any = React.useRef(null);
    const { user } = useUserContext();
    const { getUserInterests } = useEventsContext();
    const navigation: any = useNavigation();
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [imageError, setImageError] = React.useState('');
    const [interestError, setInterestError] = React.useState('');
    const [interestExistsError, setInterestExistsError] = React.useState(false);
    const [emojiOrImage, setEmojiOrImage] = React.useState(false); // true for emoji, false for image
    const [icon, setIcon]: any = React.useState('🏈');
    const [iconError, setIconError]: any = React.useState('');

    console.log('icon length -->', icon.length);

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
            icon,
            createdBy: user._id,
            selected: 1,
            image,
            hidden: false,
        };
        const validation = !emojiOrImage ? createInterestWithEmojiValidation(body) : createInterestWithImageValidation(body);
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
                if (item.name === 'iconError') {
                    setIconError(item.error);
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
        if (interestToCheck === title) {
            setInterestExistsError(false);
            return;
        }

        let body = { title: interestToCheck };

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
            <EmojiOrImageToggle setEmojiOrImage={setEmojiOrImage} />
            {!emojiOrImage ? (
                <>
                    <FormTitle title="Add Emoji" error={iconError} />
                    <SmallTextInput value={icon} placeholder="🎉" onChangeText={(value: any) => setIcon(value)} maxLength={1} />
                </>
            ) : (
                <>
                    <FormTitle title="Add Image" error={imageError} />
                    <ImagePicker setBlobImage={setImage} />
                </>
            )}

            {title && (
                <View style={styles.interestWrapper}>
                    <BigIterestIcon title={title} image={image} icon={icon} />
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
