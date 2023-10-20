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
    onRemovePress?: () => void;
    icon?: any;
    image?: any;
};

const InterestIcon = ({ title, onPress, disabled, onRemovePress, icon, image }: Props) => {
    const { colors } = useTheme();
    const [selected, setSelected] = React.useState(false);
    return (
        <View style={styles.container}>
            {onRemovePress ? <SmallCloseButton onPress={onRemovePress} style={styles.close} /> : null}
            <TouchableOpacity
                disabled={onRemovePress ? true : false}
                onPress={onPress}
                style={[
                    disabled ? styles.selectedWrapper : styles.wrapper,
                    { backgroundColor: colors.card, borderColor: disabled ? colors.primary : colors.border, shadowColor: colors.primary },
                ]}
                activeOpacity={0.8}
            >
                {image ? <Image source={{ uri: image }} style={styles.imageIcon} /> : <Text style={styles.icon}>{icon}</Text>}
                <Text>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default InterestIcon;

const styles = StyleSheet.create({
    container: {},
    close: {
        position: 'absolute',
        top: 2,
        right: 5,
        zIndex: 99,
    },
    wrapper: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedWrapper: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // add shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
    },
    icon: {
        marginRight: 5,
    },
    imageIcon: {
        width: 23,
        height: 23,
        marginRight: 5,
        borderRadius: 12,
    },
});
