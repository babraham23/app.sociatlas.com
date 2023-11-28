import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import { useEventsContext } from '../../context/events.context';
import { useTheme } from '../../hooks/useTheme';

type Props = {
    title?: string;
    scrollBarData?: any;
};

const SearchMapLayout = ({ title, scrollBarData }: Props) => {
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


    return (
        <View style={styles.container}>
            <Text bold style={styles.header} fontSize={18}>
                {title}
            </Text>
            <ScrollView contentContainerStyle={styles.wrapper}>
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
                                    backgroundColor: colors.card,
                                    borderColor: isSelected ? colors.primary : colors.border,
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

export default SearchMapLayout;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 120,
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 10,
    },

    scroll: {
        paddingLeft: 10,
    },
    icon: {
        paddingRight: 5,
        paddingBottom: 5,
    },
    buttonWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderWidth: 0.5,
        margin: 5,
        borderRadius: 50,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 5,
        borderRadius: 13,
        resizeMode: 'cover',
    },
});
