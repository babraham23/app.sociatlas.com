import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from '../../style/typography';
import { useTheme } from '../../hooks/useTheme';

let defectState = {
    index: 0,
    routeName: 'Defects',
    routes: [
        {
            name: 'Defects',
            id: 0,
        },
        {
            name: 'Snagging',
            id: 1,
        },
    ],
};

let snagState = {
    index: 1,
    routeName: 'Snags',
    routes: [
        {
            name: 'Defects',
            id: 0,
        },
        {
            name: 'Snagging',
            id: 1,
        },
    ],
};

type Props = {};

const TopTabBar = ({}: Props) => {
    const { colors } = useTheme();
    const [state, setState] = useState(defectState);
    const [translateValue] = useState(new Animated.Value(0));
    const totalWidth = Dimensions.get('window').width;
    const tabWidth = totalWidth / state.routes.length;

    const animateSlider = (index: number) => {
        Animated.spring(translateValue, {
            toValue: index * tabWidth,
            velocity: 10,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animateSlider(state.index);
    }, [state.index]);

    const setActiveRoute = (route: string) => {
        setState(route === 'Snagging' ? snagState : defectState);
    };

    return (
        <View style={[styles.container, { backgroundColor: 'white', borderBottomWidth: 0.5, borderBottomColor: colors.border, width: totalWidth }]}>
            {state.routes.map((item, index) => {
                const isFocused = state.index === index;
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveRoute(item.name)}
                        key={index}
                        style={[styles.buttonWrapper, { borderColor: colors.border, borderRightWidth: 1 }]}
                    >
                        <Text color={isFocused ? colors.primary : colors.text} center bold style={[styles.text]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
            <Animated.View
                style={[
                    styles.slider,
                    {
                        transform: [{ translateX: translateValue }],
                        width: tabWidth,
                        backgroundColor: colors.primary,
                    },
                ]}
            />
        </View>
    );
};

export default TopTabBar;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        zIndex: 99,
    },
    buttonWrapper: {
        paddingVertical: 10,
        width: '50%',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {},
    slider: {
        height: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
});

{
    /* <View style={[styles.container, { backgroundColor: 'white', borderBottomWidth: 0.5, borderBottomColor: colors.border }]}>
<TouchableOpacity style={[styles.buttonWrapper, { borderColor: colors.border, borderRightWidth: 1 }]}>
    <Text center bold style={styles.text}>
        Defects
    </Text>
</TouchableOpacity>
<TouchableOpacity style={[styles.buttonWrapper, { borderColor: colors.border }]}>
    <Text center bold>
        Snagging
    </Text>
</TouchableOpacity>
</View> */
}
