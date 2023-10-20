import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import InterestIcon from '../buttons/interestIcon';
import { interestsdd } from '../forms/interestdd';
import FormTitle from '../layout/formTitle';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../context/user.context';
import { useEventsContext } from '../../context/events.context';


type Props = {
    title?: string;
    style?: any;
    onChange?: any;
    items?: any;
    placeholder?: string;
    interests?: any;
    setInterests?: any;
    InterestError?: string;
};

const Accordion = ({ title, style, onChange, placeholder, interests, setInterests, InterestError }: Props) => {
    const { colors, borderRadius } = useTheme();
    const { user } = useUserContext();
    const navigation: any = useNavigation();
    const [open, setOpen] = useState(false);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [bodySectionHeight, setBodySectionHeight] = useState(0);
    const { userInterests, setUserInterests, getUserInterests } = useEventsContext();

    const addInterest = (item: any) => {
        if (interests.length === 3) {
            return;
        }
        setInterests([...interests, item]);
    };

    const removeInterest = (id: any) => {
        setInterests(interests.filter((item: any) => item._id !== id));
    };

    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
    });

    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0rad', `${Math.PI}rad`],
    });

    const toggleListItem = () => {
        if (open) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                useNativeDriver: false,
            }).start();
        }
        setOpen(!open);
    };

    React.useEffect(() => {
        // if interest length is 3, close accordion
        getUserInterests();
        if (interests.length === 3) {
            setOpen(false);
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                useNativeDriver: false,
            }).start();
        }
    }, [interests]);

    return (
        <>
            <View style={styles.headerWrapper}>
                <FormTitle title={`Interests ${interests.length}/3`} error={InterestError} />
                <TouchableOpacity style={styles.createWrapper} onPress={() => navigation.navigate('CreateInterestsScreen')}>
                    <Text textDecorationLine={'underline'}>Create Interest</Text>
                </TouchableOpacity>
            </View>
            <View style={style}>
                <View style={[styles.container, { borderColor: colors.border, borderRadius: borderRadius.card, backgroundColor: colors.card }]}>
                    <View style={styles.topContainer}>
                        <View style={styles.center}>
                            {interests.length ? (
                                // <InterestsIcon disabled title={selected} />
                                <View style={styles.selectedWrapper}>
                                    {interests.map((item: any, i: any) => {
                                        return (
                                            <InterestIcon icon={item.icon} disabled key={i} title={item.title} onRemovePress={() => removeInterest(item._id)} image={item.image} />
                                        );
                                    })}
                                </View>
                            ) : (
                                <Text color={colors.dark_grey} style={styles.title}>
                                    {placeholder}
                                </Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={1} onPress={() => toggleListItem()} style={styles.iconWrapper}>
                        <Animated.View style={[styles.arrow, { transform: [{ rotateZ: arrowAngle }] }]}>
                            <View style={{ transform: [{ rotate: '0deg' }] }}>
                                <AntDesign name="down" size={23} color={colors.text} />
                            </View>
                        </Animated.View>
                    </TouchableOpacity>

                    <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.wrapper}>
                                <View
                                    style={[styles.bodyContainer, { borderTopColor: colors.seperator }]}
                                    onLayout={(event) => setBodySectionHeight(event.nativeEvent.layout.height)}
                                >
                                    {userInterests.map((item: any, i: any) => {
                                        return <InterestIcon key={i} title={item.title} icon={item.icon} onPress={() => addInterest(item)} image={item.image} />;
                                    })}
                                    {interestsdd.map((item: any, i: any) => {
                                        return <InterestIcon key={i} title={item.title} icon={item.icon} onPress={() => addInterest(item)} />;
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50,
        width: '85%',
    },
    iconWrapper: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingLeft: 20,
    },
    headerWrapper: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    createWrapper: {
        marginTop: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
    },
    center: {
        // width: '75%',
    },
    selectedWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icon: {
        backgroundColor: 'red',
    },
    textWrapper: {},
    title: {
        paddingLeft: 10,
    },
    arrow: {},
    bodyBackground: {
        overflow: 'hidden',
    },
    bodyContainer: {
        // position: 'absolute',
        // bottom: 0,
        // paddingTop: 10,
        // borderTopWidth: 0.5,

        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    wrapper: {
        paddingBottom: 250,
    },
});

export default Accordion;
