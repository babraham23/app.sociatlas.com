import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import InterestIcon from '../buttons/interestIcon';
import { useCreateEventContext } from '../../context/createEvent.context';

type Props = {
    title?: string;
    items?: any;
    onPress?: any;
    selectedInterests?: any;
    handleDismiss?: any;
};

const InterestLayout = ({ title, onPress, items, handleDismiss }: Props) => {
    const { addInterest, removeInterest, interests } = useCreateEventContext();

    const handleInterest = (item: any) => {
        if (interests.length < 3) {
            if (interests.some((si: any) => si._id === item._id)) {
                removeInterest(item._id);
            } else {
                addInterest(item);
            }
        } else {
            if (interests.some((si: any) => si._id === item._id)) {
                removeInterest(item._id);
            }
        }
    };

    React.useEffect(() => {
        if (interests.length >= 3) {
            handleDismiss();
        }
    }, [interests]);

    return (
        <View style={styles.container}>
            <Text bold style={styles.header} fontSize={18}>
                {title}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.wrapper}>
                {items.map((item: any, i: any) => {
                    return (
                        <InterestIcon
                            disabled={interests.some((si: any) => si._id === item._id)}
                            key={i}
                            title={item.title}
                            icon={item.icon}
                            onPress={() => handleInterest(item)}
                            image={item.image}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default InterestLayout;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    wrapper: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 120,
    },
    header: {
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 10,
    },
});
