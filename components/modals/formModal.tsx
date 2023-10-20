import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { height, width } = Dimensions.get('window');

const MODAL_HEIGHT = height / 0.8;

const FormModal = ({ modalVisible, setModalVisible, form }: any) => {
    const { colors } = useTheme();
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={[styles.container]}>
                <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                    <View style={styles.formWrapper}>{form}</View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    close: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    formWrapper: {},
});

export default FormModal;
