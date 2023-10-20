import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchInput from '../inputs/searchInput';
import SearchLayout from '../layout/searchLayout';
import { useTheme } from '../../hooks/useTheme';
import { useEventsContext } from '../../context/events.context';

type Props = {
    handleDismiss?: any;
};

const SearchForm = ({ handleDismiss }: Props) => {
    const [search, setSearch] = React.useState('');
    const { colors } = useTheme();
    const { interests, setSelectedInterest, getEventsByLocation, interestRadius } = useEventsContext();

    const filteredInterests = React.useMemo(() => {
        if (search === '') {
            return interests;
        } else {
            return interests.filter((interest: any) => interest.title.toLowerCase().includes(search.toLowerCase()));
        }
    }, [search, interests]);

    const setInterest = (item: any) => {
        setSelectedInterest(item);
        getEventsByLocation(item.title, interestRadius);
        handleDismiss();
    };

    return (
        <View style={[{ flex: 1, backgroundColor: colors.card }]}>
            <View style={[styles.container]}>
                <SearchInput onChangeText={(value: string) => setSearch(value)} placeholder="Search..." />
                <SearchLayout title={search !== '' ? 'Results' : 'Recommended'} items={filteredInterests} onPress={setInterest} />
            </View>
        </View>
    );
};

export default SearchForm;

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
