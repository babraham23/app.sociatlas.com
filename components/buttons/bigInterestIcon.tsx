import { Image, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../style/typography';

type Props = {
    title?: string;
    onPress?: any;
    items?: any;
    disabled?: boolean;
    icon?: any;
    image?: any;
};

const BigIterestIcon = ({ title, onPress, disabled, icon, image }: Props) => {
    const { colors } = useTheme();
    const [selected, setSelected] = React.useState(false);

    React.useEffect(() => {}, [icon]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[styles.wrapper, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border }]}
                activeOpacity={0.8}
            >
                {image && <Image source={{ uri: icon }} style={[styles.image, { borderColor: colors.border }]} />}
                {icon && <Text fontSize={30} style={styles.icon}>{icon}</Text>}
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
        marginRight: 10,
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
