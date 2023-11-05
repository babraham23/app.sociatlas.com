import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    style?: any;
    onCreateEventPress?: any;
};

const FAB = ({ style, onCreateEventPress }: Props) => {
    const { colors, dark } = useTheme();
    const mode: any = React.useRef(new Animated.Value(0)).current;
    const [zIndex, setZindex] = useState(0);
    const navigation: any = useNavigation();

    const handlePress = () => {
        setZindex(mode == 1 ? 1 : 0);
        Animated.sequence([
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const eventY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -180],
    });

    const directionsY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -120],
    });

    const friendsY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -60],
    });

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
        },
        buttonWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        fabButtonWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: colors.primary,
        },
        secondaryButton: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 55,
            height: 55,
            borderRadius: 27,
            backgroundColor: colors.primary,
        },
    });

    return (
        <View style={[style, styles.container]}>
            <View style={styles.fabButtonWrapper}>
                <Animated.View style={{ position: 'absolute', top: eventY }}>
                    <TouchableOpacity onPress={onCreateEventPress} activeOpacity={0.8}>
                        <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.secondaryButton}>
                            <FontAwesome name="pencil" size={24} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ position: 'absolute', top: directionsY }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyEventsScreen')} activeOpacity={0.8}>
                        <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.secondaryButton}>
                            <MaterialIcons name="event" size={24} color={'white'} />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ position: 'absolute', top: friendsY }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyFriendList')} activeOpacity={0.8}>
                        <LinearGradient colors={[`#ff4500`, `#ff703b`]} style={styles.secondaryButton}>
                            <FontAwesome5 name="user-friends" size={24} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handlePress} activeOpacity={10}>
                    <LinearGradient colors={[`${colors.primary}`, `${colors.secondary}`]} style={styles.button}>
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome5 name="plus" size={25} color={'white'} />
                        </Animated.View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FAB;
