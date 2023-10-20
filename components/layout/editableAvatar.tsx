import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../style/typography';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../hooks/useTheme';
import { useUserContext } from '../../context/user.context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { generateID } from '../../functions/helpers';
import { deleteEventImageFromBlob, uploadEventImageToBlob } from '../../api/events/events.requests';
import { editUser } from '../../api/user/user.requests';

const EditableAvatar = ({ profilePic, setProfilePic }: any) => {
    const { colors } = useTheme();
    const { user, getUser } = useUserContext();
    const [image, setImage] = React.useState(profilePic);

    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImage(result.assets[0].uri);
        let imageName = generateID();

        // use profilePic and setProfilePic from response when uploaded to blob
        if (!result.canceled) {
            const formData: any = new FormData();
            formData.append('image', {
                uri: result.assets[0].uri,
                type: 'image/jpeg', // Change the type as needed (e.g., 'image/png')
                name: imageName, // Change the name as needed
            });

            let data = formData;
            let response = await uploadEventImageToBlob(data);

            let saveImageUrl = response.data.data; // send this as parameter to create event (image or video)
            setProfilePic(saveImageUrl);
            handleUserDetailsChange(saveImageUrl);
        }
    };

    const handleUserDetailsChange = async (profilePic: any) => {
        console.log('handleUserDetailsChange');
        const body = {
            profilePic,
        };
        try {
            const response = await editUser(user._id, body);
            if (response.status === 200) {
                getUser();
            }
        } catch (error: any) {
            console.log(error.response.status);
        }
    };

    const deleteAvatar = async () => {
        const parts = image.split('/');
        console.log(parts[parts.length - 1]);
        try {
            await deleteEventImageFromBlob(parts[parts.length - 1]);
            await editUser(user._id, { profilePic: null });
            setImage(null);
        } catch (error: any) {
            console.log('error -->', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {image && (
                <TouchableOpacity onPress={deleteAvatar} activeOpacity={1} style={[styles.closeWrapper, { backgroundColor: 'red' }]}>
                    <AntDesign name="close" size={16} color={'white'} />
                </TouchableOpacity>
            )}
            {image ? (
                <Image source={{ uri: image }} style={[styles.image]} />
            ) : (
                <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.avatar}>
                    <Text fontSize={38} color={'white'}>
                        {user.name.charAt(0).toUpperCase()}
                    </Text>
                </LinearGradient>
            )}
            <TouchableOpacity onPress={pickImage} style={[styles.editWrapper, { backgroundColor: colors.text }]} activeOpacity={1}>
                <FontAwesome name="pencil" size={17} color={colors.card} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    closeWrapper: {
        position: 'absolute',
        top: 0,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    editWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditableAvatar;
