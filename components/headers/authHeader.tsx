import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../style/typography';
import { Images } from '../../style/images';

type Props = {
    title?: string;
    onBackPress?: () => void;
};

const AuthHeader = ({ title, onBackPress }: Props) => {
    const { colors } = useTheme();
    const navigation: any = useNavigation();
    return (
        <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-sharp" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.logoWrapper} >
                <Image source={Images.LOGO} style={styles.logo} />   
            </View>
        </View>
    );
};

export default AuthHeader;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    back: {
        position: 'absolute',
        left: 30,
        top: 55,
        zIndex: 99,
        // borderWidth: 1,
        // width: 40,
        // height: 60,
        // borderRadius: 20,
    },
    logoWrapper: {
        alignSelf: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    }
});
