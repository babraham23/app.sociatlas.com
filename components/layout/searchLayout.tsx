import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '../../style/typography';
import InterestIcon from '../buttons/interestIcon';

type Props = {
    title?: string;
    items?: any;
    onPress?: any;
};

const SearchLayout = ({ title, onPress, items }: Props) => {
    return (
        <View style={styles.container}>
            <Text bold style={styles.header} fontSize={18}>
                {title}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.wrapper}>
                {items.map((item: any, i: any) => {
                    return <InterestIcon key={i} title={item.title} icon={item.icon} onPress={() => onPress(item)}  />;
                })}
            </ScrollView>
        </View>
    );
};

export default SearchLayout;

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
