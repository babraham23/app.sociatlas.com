// make a react native back button
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style }: any) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.container, style]}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 20,
        top: 20,
        zIndex: 1,
        
    },
});

export default BackButton;
