import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchInput from '../inputs/searchInput';
import { useTheme } from '../../hooks/useTheme';
import { useEventsContext } from '../../context/events.context';
import SearchMapLayout from '../layout/searchMapLayout';

type Props = {
    handleDismiss?: any;
};

const SearchMapForm = ({ handleDismiss }: Props) => {
    const [search, setSearch] = React.useState('');
    const { colors } = useTheme();
    const { scrollBarData } = useEventsContext();

    const filteredInterests = React.useMemo(() => {
        if (search === '') {
            return scrollBarData;
        } else {
            return scrollBarData.filter((interest: any) => interest.title.toLowerCase().includes(search.toLowerCase()));
        }
    }, [search, scrollBarData]);

    return (
        <View style={[{ flex: 1, backgroundColor: colors.card }]}>
            <View style={[styles.container]}>
                <SearchInput onChangeText={(value: string) => setSearch(value)} placeholder="Search..." />
                <SearchMapLayout title={search !== '' ? 'Results' : 'Recommended'} scrollBarData={filteredInterests}  />
            </View>
        </View>
    );
};

export default SearchMapForm;

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
