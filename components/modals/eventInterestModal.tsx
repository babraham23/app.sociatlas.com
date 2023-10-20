import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SearchInput from '../inputs/searchInput';
import { useTheme } from '../../hooks/useTheme';
import { useEventsContext } from '../../context/events.context';
import InterestLayout from '../layout/interestLayout';

type Props = {
    handleDismiss?: any;
};

const EventInterestModal = ({ handleDismiss }: Props) => {
    const [search, setSearch] = React.useState('');
    const { colors } = useTheme();
    const { interests } = useEventsContext();
    const { userInterests } = useEventsContext();

    const filteredInterests = React.useMemo(() => {
        let allInterests = [...userInterests, ...interests];
        const uniqueInterests = allInterests.reduce((acc, current) => {
            const foundInterest = acc.find((interest: any) => interest.title === current.title);
            if (!foundInterest) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        if (search === '') {
            return uniqueInterests;
        } else {
            return uniqueInterests.filter((interest: any) => interest.title.toLowerCase().includes(search.toLowerCase()));
        }
    }, [search, interests]);

    return (
        <View style={[{ flex: 1, backgroundColor: colors.card }]}>
            <View style={[styles.container]}>
                <SearchInput onChangeText={(value: string) => setSearch(value)} placeholder="Search..." />
                <InterestLayout title={search !== '' ? 'Results' : 'Recommended'} items={filteredInterests} handleDismiss={handleDismiss} />
            </View>
        </View>
    );
};

export default EventInterestModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        zIndex: 99,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: 'black',
    },
});
