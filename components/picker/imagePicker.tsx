import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { BASE_URL } from '../../api/endpoints';
import { deleteEventImageFromBlob, uploadEventImageToBlob } from '../../api/events/events.requests';
import { generateID } from '../../functions/helpers';

const ImagePickerComponent = ({ setBlobImage }: any) => {
    const { colors, borderRadius } = useTheme();
    const [image, setImage] = React.useState(null);
    const [imageBlob, setImageBlob]: any = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const pickImage = async () => {
        // Use the ImagePicker to select an image
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setLoading(true);
        setImage(result.assets[0].uri);
        let imageName = generateID();
        setImageBlob(imageName);

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
            setBlobImage(saveImageUrl);
            setLoading(false);
        }
    };

    const deleteImage = async () => {
        setImage(null);
        try {
            await deleteEventImageFromBlob(imageBlob);
            setBlobImage('');
        } catch (error) {
            console.log('error -->', error);
        }
    };

    return (
        <>
            {image ? (
                <View style={[styles.imageWrapper, { borderRadius: borderRadius.input, borderColor: colors.border }]}>
                    {loading && <ActivityIndicator style={styles.activity} color={'red'} />}
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
                        <Entypo name="cross" size={20} color="white" />
                    </TouchableOpacity>
                    <Image source={{ uri: image }} style={[styles.image, { borderRadius: borderRadius.input, borderColor: colors.border }]} />
                </View>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.container, { borderRadius: borderRadius.input, borderColor: colors.border, backgroundColor: colors.card }]}
                    onPress={() => pickImage()}
                >
                    <Feather name="image" size={50} color={colors.dark_grey} />
                </TouchableOpacity>
            )}
        </>
    );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        zIndex: 99,
        alignSelf: 'center',
        top: 70,
    },
    container: {
        borderWidth: 1,
        height: 170,
        width: 150,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    imageWrapper: {
        height: 170,
        width: 150,
        borderWidth: 1,
    },
    deleteButton: {
        position: 'absolute',
        width: 25,
        height: 25,
        backgroundColor: 'red',
        zIndex: 100,
        right: 5,
        top: 5,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 170,
        width: 150,
    },
});
