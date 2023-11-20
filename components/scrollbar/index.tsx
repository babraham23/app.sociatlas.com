import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useEventsContext } from '../../context/events.context';

const ScrollBar = ({ style }: any) => {
    const { interests, setSelectedInterest, selectedInterest, interestRadius, getEventsByLocation } = useEventsContext();
    const { colors, borderRadius }: any = useTheme();
    const [{ dynamicIndex }, setState] = React.useState({ dynamicIndex: 0 });
    let [posArr]: any = React.useState([]);
    const scrollview_ref: any = React.useRef({});


    const handleChange = (item: any, key: any) => {
        setSelectedInterest(item);
        getEventsByLocation(item.title, interestRadius);
        setState({ dynamicIndex: key }), () => doScroll(null);
    };

    const autoScroll = () => {
        const selectedIndex = interests.findIndex((item: any) => item._id === selectedInterest?._id);
        if (selectedIndex !== -1) {
            doScroll(selectedIndex);
        }
    };

    const doScroll = (index: any) => {
        scrollview_ref.current?.scrollTo({
            x: posArr[index || dynamicIndex] - 50,
            animated: true,
        });
    };

    React.useEffect(() => {
        autoScroll();
    }, [dynamicIndex]);

    return (
        <View style={[styles.container, style]}>
            <ScrollView ref={scrollview_ref} horizontal showsHorizontalScrollIndicator={false} style={[styles.scroll]}>
                {interests.map((item: any, key: any) => {
                    return (
                        <TouchableOpacity
                            key={item._id}
                            activeOpacity={0.7}
                            onPress={() => handleChange(item, key)}
                            style={[
                                selectedInterest._id == item._id ? styles.selectedButtonWrapper : styles.buttonWrapper,
                                { borderRadius: borderRadius.button, backgroundColor: colors.card, borderColor: colors.border },
                            ]}
                            onLayout={(event: any) => {
                                const layout = event.nativeEvent.layout;
                                posArr[key] = layout.x;
                            }}
                        >
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.image} />
                            ) : (
                                <Text fontSize={18} style={styles.icon}>
                                    {item.icon}
                                </Text>
                            )}
                            <Text
                                bold
                                fontSize={14}
                                color={selectedInterest._id == item._id ? colors.primary : colors.text}
                                style={[{ color: selectedInterest._id == item._id ? colors.primary : colors.background }]}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        zIndex: 99,
        height: 50,
    },
    scroll: {
        paddingLeft: 10,
    },
    icon: {
        paddingRight: 5,
        paddingBottom: 5,
    },
    buttonWrapper: {
        marginLeft: 5,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderWidth: 0.5,
    },
    selectedButtonWrapper: {
        marginLeft: 5,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderWidth: 0.5,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 5,
        borderRadius: 13,
        resizeMode: 'cover',
    },
});
export default ScrollBar;
