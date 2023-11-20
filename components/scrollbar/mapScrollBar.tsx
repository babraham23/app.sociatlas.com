import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';
import { useEventsContext } from '../../context/events.context';

const MapScrollBar = ({ style }: any) => {
    const { scrollBarData } = useEventsContext();
    const { colors, borderRadius }: any = useTheme();
    const { getMapEventsByLocation, interestRadius, selecteMapInterests, setSelectedMapInterests } = useEventsContext();

    const setItem = (item: any) => {
        getMapEventsByLocation(item.title, interestRadius);
        if (selecteMapInterests.includes(item._id)) {
            setSelectedMapInterests(selecteMapInterests.filter((_id: any) => _id !== item._id));
        } else {
            setSelectedMapInterests([...selecteMapInterests, item._id]);
        }
    };

    const isItemSelected = (item_Id: any) => {
        return selecteMapInterests.includes(item_Id);
    };

    React.useEffect(() => {
        setSelectedMapInterests([scrollBarData[0]?._id]);
    }, []);

    return (
        <View style={[styles.container, style]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                {scrollBarData.map((item: any) => {
                    const isSelected = isItemSelected(item._id);
                    return (
                        <TouchableOpacity
                            key={item._id}
                            activeOpacity={1}
                            onPress={() => setItem(item)}
                            style={[
                                styles.buttonWrapper,
                                {
                                    borderRadius: borderRadius.button,
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                },
                            ]}
                        >
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.image} />
                            ) : (
                                <Text fontSize={18} style={styles.icon}>
                                    {item.icon}
                                </Text>
                            )}
                            <Text bold fontSize={14} color={isSelected ? colors.primary : colors.text} style={[{ color: colors.background }]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

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
export default MapScrollBar;
