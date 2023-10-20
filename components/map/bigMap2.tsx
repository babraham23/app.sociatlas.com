import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { useMapContext } from '../../context/map.context';
import { useEventsContext } from '../../context/events.context';
import BigMapMarker from './bigMapMarker';
import EventMapCard from '../layout/eventMapCard';
import { useTheme } from '../../hooks/useTheme';
import EventMapCardContent from '../layout/eventMapCardContent';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 70;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

type Props = {
    onMapPress?: any;
};

const ExploreScreen = ({ onMapPress }: Props) => {
    const { colors, borderRadius } = useTheme();
    const [animateBorder, setAnimateBorder] = React.useState(borderRadius.card);
    const _map: any = React.useRef(null);
    const _scrollView: any = React.useRef(null);
    const { mapRegion, setMapRegion } = useMapContext();
    const { events } = useEventsContext();

    const [open, setOpen] = React.useState(false);
    const animatedController = React.useRef(new Animated.Value(0)).current;
    const [bodySectionHeight, setBodySectionHeight] = React.useState(0);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= events.length) {
                index = events.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = events[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: mapRegion.latitudeDelta,
                            longitudeDelta: mapRegion.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = events.map((marker: any, index: any) => {
        const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData: any) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = markerID * CARD_WIDTH + markerID * 20;
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    };

    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
    });

    const toggleListItem = () => {
        if (open) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                useNativeDriver: false,
            }).start();
            setAnimateBorder(borderRadius.card);
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                useNativeDriver: false,
            }).start();
            setAnimateBorder(0);
        }
        setOpen(!open);
    };

    /* 
    onRegionChangeComplete
    when active it does not select the markers!!!   
    */

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={mapRegion}
                style={styles.container}
                showsCompass={false}
                showsPointsOfInterest={false}
                onLongPress={(e) => onMapPress(e.nativeEvent.coordinate)}
                // onRegionChangeComplete={(region) => setMapRegion(region)}
            >
                {events.map((marker: any, index: any) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <BigMapMarker scaleStyle={scaleStyle} />
                        </Marker>
                    );
                })}
            </MapView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
                decelerationRate={'fast'}
            >
                {events.map((item: any, index: any) => (
                    <View key={index}>
                        <EventMapCard
                            onPress={() => toggleListItem()}
                            key={index}
                            icon={item.icon}
                            numberOfPeopleConfirmed={item.numberOfPeopleConfirmed}
                            title={item.title}
                            maxOfPeople={item.maxOfPeople}
                            animateBorder={animateBorder}
                        />
                        <Animated.View
                            style={[
                                styles.bodyBackground,
                                {
                                    height: bodyHeight,
                                    borderTopLeftRadius: animateBorder,
                                    borderTopRightRadius: animateBorder,
                                    borderBottomLeftRadius: borderRadius.card,
                                    borderBottomRightRadius: borderRadius.card,
                                    backgroundColor: colors.card,
                                },
                            ]}
                        >
                            <View style={[styles.bodyContainer]} onLayout={(event) => setBodySectionHeight(event.nativeEvent.layout.height)}>
                                <EventMapCardContent description={item.description} />
                            </View>
                        </Animated.View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: 'absolute',
        bottom: 100,
    },
    bodyBackground: {
        overflow: 'hidden',
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    bodyContainer: {
        position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        width: CARD_WIDTH,
    },
});
