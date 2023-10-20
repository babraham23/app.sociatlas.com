import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from '../../style/typography';
import { Images } from '../../style/images';
import { useTheme } from '../../hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    text?: string;
    onPress?: () => void;
    style?: ViewStyle;
};

const GoogleButton = ({ text, style, onPress }: Props) => {
    const { colors, borderRadius } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, style, { backgroundColor: colors.card, borderColor: colors.text }]}
            onPress={onPress}
        >
            <View style={styles.logoWrapper}>
                <Image style={styles.logo} source={Images.GOOGLE_LOGO} />
            </View>
            <Text bold center>
                Continue with Google
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1.5,
        // marginTop: 20,
        alignSelf: 'center',
        borderRadius: 25,
    },
    logoWrapper: {
        position: 'absolute',
        left: 20,
    },
    logo: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
    },
});

export default GoogleButton;
