import { Image, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import SmallCloseButton from '../accordions/smallCloseButton';
import { Text } from '../../style/typography';

type Props = {
    title?: string;
    onPress?: any;
    items?: any;
    disabled?: boolean;
    icon?: any;
};

const BigIterestIcon = ({ title, onPress, disabled, icon }: Props) => {
    const { colors } = useTheme();
    const [selected, setSelected] = React.useState(false);
    console.log('passed icon', icon);

    React.useEffect(() => {}, [icon]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[styles.wrapper, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border }]}
                activeOpacity={0.8}
            >
                {icon ? <Image source={{ uri: icon }} style={[styles.image, { borderColor: colors.border }]} /> : <View style={[styles.image, { borderColor: colors.border }]} />}
                <Text fontSize={28}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    close: {
        position: 'absolute',
        top: 2,
        right: 5,
        zIndex: 99,
    },
    wrapper: {
        padding: 13,
        borderWidth: 1,
        borderRadius: 50,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 50,
        resizeMode: 'cover',
    },
});

export default BigIterestIcon;
