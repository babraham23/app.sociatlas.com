import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

// generate some lipsum
const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl';

const UserMessage = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.bubbleWrapper}>
                    <View style={[styles.messageBubble, { backgroundColor: `${colors.primary}45`, borderRadius: 15 }]}>
                        <Text>{lipsum + lipsum}</Text>
                    </View>
                    <View style={styles.bottomWrapper}>
                        <View />
                        <Text>Date</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default UserMessage;

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'flex-end',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        // marginBottom: 20,
    },
    bubbleWrapper: {},
    messageBubble: {
        // width: '80%',
        padding: 10,
        marginBottom: 10,
        marginLeft: 80,
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
