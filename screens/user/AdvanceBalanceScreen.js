import React, {useState} from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import {Ionicons, FontAwesome } from '@expo/vector-icons';
import {Input, Button} from 'react-native-elements';

import Colors from '../../constants/Colors';
import * as unitActions from '../../store/action/unit';

const AdvanceBalanceScreen = props => {
    const [amount, setAmount] = useState();
    const unitDetails = props.navigation.getParam('unitDetails');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isValid, setISValid] = useState(false);

    const addBalanceHandler = async () => {
        setLoading(true);
        await dispatch(unitActions.updatingUnit(
            unitDetails.id, 
            unitDetails.userId,
            unitDetails.buildingId,
            unitDetails.name,
            unitDetails.phone,
            unitDetails.gender,
            unitDetails.date,
            unitDetails.price,
            unitDetails.email,
            unitDetails.advanceBalance = amount, 
            unitDetails.nextPayment, 
            unitDetails.dues,
            unitDetails.details
        ));
        setLoading(false);
        props.navigation.goBack();
    }

    const moneyInputHandler = text => {
        if (text.trim().length === 0){
            setISValid(false);
        } else {
            setISValid(true);
        }
        setAmount(text);
    };

    return (
        <View style={{flex: 1}}>
            <View style={{height: '20%', backgroundColor:Colors.primary}}>
                <Ionicons 
                    name='arrow-back' size={26} 
                    style={{paddingVertical: 10, 
                    paddingHorizontal: 15, 
                    color:'white'}} 
                    onPress={() => {props.navigation.goBack()}}
                />
                <Text style={{position: 'absolute', bottom: 20, marginHorizontal: 10, fontSize: 30, color: 'white' }}>Add Money</Text>
            </View>
            <View style={{alignItems: 'center', paddingLeft: Dimensions.get('window').width*0.4, paddingTop: 55}}>
                <Input 
                    style={{fontSize: 30}}
                    placeholder='Rs.'
                    keyboardType='number-pad'
                    leftIcon={
                        <FontAwesome
                            name='rupee'
                            size={24}
                            color='black'
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    value={amount}
                    onChangeText={moneyInputHandler}
                    returnKeyType='done'
                    autoFocus
                />
            </View>
            {!loading ? <Button
                icon={
                    <Ionicons
                        name="checkmark"
                        size={18}
                        color="white"
                    />
                }
                title= '  Add Balance   '
                containerStyle={styles.addBuildingButtonContainer}
                buttonStyle={styles.addBuildingButton}
                onPress={addBalanceHandler}
            /> : <ActivityIndicator size='large' color={Colors.primary} />}
        </View>
    );
};

AdvanceBalanceScreen.navigationOptions = {
    headerTitle: 'Advance Balance',
    headerShown: false,
    headerStyle: {
        height: '30%'
    },
    headerTintColor: 'black'
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
        height: '40%',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10},
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 28
    },
    textContainer: { 
        height: Dimensions.get('window').height*0.05, 
        backgroundColor: '#ddd',
        borderRadius: 20,
        width: '55%',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2},
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    button: {
        borderRadius: 12,
        backgroundColor: '#0033cc',
        paddingHorizontal: 20
    },
    inputContainer: {
        width: '65%', 
        alignContent:'center',
        borderBottomWidth: 0
    },
    addBuildingButtonContainer: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        borderRadius: 50,
        alignItems: 'center',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2},
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
    },
    addBuildingButton: {
        borderRadius: 40,
        backgroundColor: Colors.primary,
    },
});

export default AdvanceBalanceScreen;