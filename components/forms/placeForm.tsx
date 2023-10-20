import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from '../../style/typography';
import { useUpdateGeometryInPlaceMutation, useCreatePlaceMutation } from '../../graphql/generated/output';
import FormTemplate from './formTemplate';
import Input from '../inputs/textInput';
import { PlaceModel } from '../../_models/place.model';
import TextArea from '../inputs/textArea';

let pageDisc = 'Please add details about your establishment.';

const PlaceForm = () => {
    const [{ placeName, description, address1, address2, city, country, postcode, lat, lng, keywords }, setState] = React.useState(new PlaceModel());
    const [addGeometryToPlaceMutation] = useUpdateGeometryInPlaceMutation();
    const [createPlaceMutation] = useCreatePlaceMutation({});

    async function updateGeometryData() {
        let variables = {
            id: '62f045cbfe2b2fc3aef8dee7', //'id'
            lng: -1.6184184206980181, //'lng'
            lat: 54.9707219822929, //'lat'
        };
        let res = await addGeometryToPlaceMutation({ variables });
        console.log(res);
    }

    async function createPlace() {
        const variables = {
            ...new PlaceModel(),
            placeName, //'placeName'
            description, //'description'
            address1, //'address1'
            address2, //'address2'
            city, //'city'
            postcode, //'postcode'
            country, //'country'
            // lat: 54.96952124011178, //'lat'
            // lng: -1.619495778338448, //'lng'
            lat,
            lng,
            keywords: ['hamburgers', 'pizza', 'beer'], //'keywords'
        };
        console.log('variables -->', variables);
        // let res = await createPlaceMutation({ variables });
    }

    return (
        <FormTemplate description={pageDisc} canContinue onPress={() => createPlace()}>
            <Text style={styles.heading}>Name of Establishment</Text>
            <Input onChangeText={(value: string) => setState((prevState) => ({ ...prevState, placeName: value }))} style={styles.input} />
            <Text style={styles.heading}>Description </Text>
            <TextArea onChangeText={(value: string) => setState((prevState) => ({ ...prevState, description: value }))} style={styles.input} />
            <Text style={styles.heading}>Address Line 1</Text>
            <Input onChangeText={(value: string) => setState((prevState) => ({ ...prevState, address1: value }))} style={styles.input} />
            <Text style={styles.heading}>Address Line 2 </Text>
            <Input onChangeText={(value: string) => setState((prevState) => ({ ...prevState, address2: value }))} style={styles.input} />
            <View style={{ width: '50%' }}>
                <Text style={styles.heading}>Postcode</Text>
                <Input onChangeText={(value: string) => setState((prevState) => ({ ...prevState, postcode: value }))} style={styles.input} />
            </View>
            <Text style={styles.heading}>Longitude</Text>
            <Input onChangeText={(value: number) => setState((prevState) => ({ ...prevState, lng: value }))} style={styles.input} />
            <Text style={styles.heading}>Latitude</Text>
            <Input onChangeText={(value: number) => setState((prevState) => ({ ...prevState, lat: value }))} style={styles.input} />
        </FormTemplate>
    );
};

export default PlaceForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        // paddingBottom: 10,
    },
    input: {
        paddingTop: 10,
        paddingBottom: 25,
    },
});
