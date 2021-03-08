import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import DateTimePicker from '@react-native-community/datetimepicker';

import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import * as unitActions from '../../store/action/unit';
import { Dimensions } from 'react-native';
 
const AddUnitScreen = props => {
    const buildingId = props.navigation.getParam('buildingId');
    const unitId = props.navigation.getParam('unitId');
    const editedUnit = useSelector(state => state.unit.availableUnit).find(unit => unit.id === unitId);

    const userId = useSelector(state => state.auth.userId);
    const selectedName = props.navigation.getParam('selectedName');
    const selectedPhone = props.navigation.getParam('selectedPhone');
    const [renterName, setRenterName] = useState(editedUnit ? editedUnit.name : '');
    const [renterPhone, setRenterPhone] = useState(editedUnit ? editedUnit.phone : '');
    const [gender, setGender] = useState(editedUnit ? editedUnit.gender : 'M');
    const [price, setPrice] = useState(editedUnit ? editedUnit.price : '');
    const [email, setEmail] = useState(editedUnit ? editedUnit.email : '');
    const [date, setDate] = useState(editedUnit ? editedUnit.date: new Date());
    const [pressed, setPressed] = useState(false);
    const [priceIsValid, setPriceIsValid] =useState(editedUnit ? true : false);
    const [loading, setLoading] = useState(false);
  
    const onChange = (event, selectedDate) => {
        setPressed(false);
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };
    
    const units = useSelector(state => state.unit.availableUnit).filter(uni => uni.buildingId === buildingId);
    const ref_input2 = useRef();
    const dispatch = useDispatch();

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CONTACTS);
        if (result.status != 'granted') {
            Alert.alert(
                'Insufficient Permissions!', 
                'To grant permission press okay otherwise decline' 
                [{text: 'okay'}]
            );
            return false;
        }
        return true;
    };

    const contactsTakenHandller = async () => {
        const hasPermissions =  await verifyPermission();
        if (!hasPermissions) {
            return;
        }
        const contact = await Contacts.getContactsAsync()
            .then(contact => props.navigation.navigate('contacts', {contactData: contact.data}))
    }

    const unitDate = new Date(new Date(new Date(new Date(Date.parse(date)).setHours(0)).setMinutes(0)).setSeconds(0));

    const saveUnitHandler = async() => {
        setLoading(true);
        if(!editedUnit) {
            let status = 'Upcoming';
            if (new Date().getTime() > new Date(new Date(new Date(Date.parse(date)).setHours(0)).setMinutes(0)).setSeconds(0)) {
                status = 'Unpaid'
            }
            let dues = 0;
            if(status === 'Unpaid') {
                dues = +price;
            } else {
                dues = 0;
            }
            await dispatch(unitActions.addUnit(userId, buildingId, selectedName ? selectedName : renterName, selectedPhone ? selectedPhone : renterPhone, gender, unitDate, price, email, 0, unitDate, dues, [{date: unitDate, paid: false, status: status}]));
            props.navigation.navigate('homeScreen');
        }
        else {
            dispatch(unitActions.updatingUnit(unitId, userId, buildingId, selectedName ? selectedName : renterName, selectedPhone ? selectedPhone : renterPhone, gender, date, price, email, editedUnit.advanceBalance, editedUnit.nextPayment, editedUnit.dues, editedUnit.details));
            props.navigation.navigate('unit');
        }
        setLoading(false);
    };

    const deleteUnitHandler = useCallback(() => {
        Alert.alert(
            'Delete Unit',
            'Are you sure want to delete this Unit',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        dispatch(unitActions.deletingUnit(unitId)),
                        props.navigation.navigate('unit');
                    }
                }
            ]
        );
    }, []);

    useEffect(() => {
        props.navigation.setParams({ delete: deleteUnitHandler, editedUnit: editedUnit})
    }, [deleteUnitHandler]);

    const priceInputHandler = text => {
        if (price.trim().length === 0) {
            setPriceIsValid(false)
        } else {
            setPriceIsValid(true)
        }
        setPrice(text);
    };

    return (
        <ScrollView>
            <View style={styles.root}>
                    <Input
                        placeholder='John'
                        leftIcon={
                            <Ionicons
                            name='person'
                            size={24}
                            color='black'
                            style={styles.icon}
                            />
                        }
                        rightIcon={
                            <Ionicons
                            name='add-circle'
                            size={24}
                            color='black'
                            style={styles.rightIcon}
                            onPress={contactsTakenHandller}
                            />
                        }
                        inputContainerStyle={styles.inputContainer}
                        value={selectedName ? selectedName : renterName}
                        editable={!selectedName ? true : false}
                        onChangeText={(text) => setRenterName(text)}
                    />
                <Input
                    placeholder='999 999 9999'
                    keyboardType='number-pad'
                    leftIcon={
                        <Ionicons
                        name='call'
                        size={24}
                        color='black'
                        style={styles.icon}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    value={selectedPhone ? selectedPhone : renterPhone}
                    editable={!selectedPhone ? true : false}
                    onChangeText={(text) => setRenterPhone(text)}
                />
                <View style={{...styles.inputContainer, flexDirection: 'row', marginBottom: 25}}>
                    <MaterialIcons name='face' size={23} style={{paddingHorizontal: 5, marginTop: 12, marginRight: 10}} />
                    <Picker
                        selectedValue={gender}
                        style={{ height: 50, width: '80%' }}
                        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            
                    >
                        <Picker.Item label="Male" value="M" />
                        <Picker.Item label="Female" value="F" />
                        <Picker.Item label="Others" value="Others" />
                    </Picker>
                </View>
                {!editedUnit && <TouchableOpacity style={{width: '100%'}} activeOpacity={0.7} onPress={() => {setPressed(true)}}>
                    <Input
                        placeholder='Date'
                        rightIcon={
                            <Ionicons
                            name="calendar-outline"
                            size={24}
                            color='black'
                            style={styles.rightIcon}
                            // onPress={()}
                            />
                        }
                        inputContainerStyle={styles.inputContainer}
                        editable={false}
                        value={date !== undefined ? date.toString().slice(4,15) : ''}
                    />
                    {pressed ? (
                        <View>
                            <DateTimePicker 
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                minimumDate={new Date().setFullYear(new Date().getFullYear(), 0, 1)}
                            />
                        </View>) : null}
                </TouchableOpacity>}
                {!editedUnit && <Input
                    placeholder='Price'
                    keyboardType='number-pad'
                    leftIcon={
                        <MaterialIcons 
                            name="monetization-on" 
                            size={24} 
                            color="black" 
                            style={styles.icon}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    value={price}
                    onChangeText={priceInputHandler}
                    returnKeyType='next'
                    onSubmitEditing={() => ref_input2.current.focus()}
                />}
                <Input
                    placeholder='Email Address'
                    leftIcon={
                        <Ionicons
                        name='md-card'
                        size={24}
                        color='black'
                        style={styles.icon}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={emailId => setEmail(emailId)}
                    value={email}
                    returnKeyType='done'
                    ref={ref_input2}
                />
                {priceIsValid && (selectedName || renterName) && (selectedPhone || renterPhone) ?  <View style={styles.buttonContainer}>
                    {!loading ?<TouchableOpacity style={styles.button} onPress={saveUnitHandler} >
                        <View style={styles.buttonTextContainer}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </View>
                    </TouchableOpacity> : <ActivityIndicator size='large' color={Colors.primary} /> }
                </View> : <View style={{...styles.buttonContainer, opacity: 0.2}}>
                    <TouchableOpacity style={styles.button} >
                        <View style={styles.buttonTextContainer}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </View>
                    </TouchableOpacity> 
                </View>}
            </View>
        </ScrollView>
    );
};

AddUnitScreen.navigationOptions = navData => {
    const deleteFn = navData.navigation.getParam('delete');
    const editedUnit = navData.navigation.getParam('editedUnit');
    return {
        headerTitle: navData.navigation.getParam('unitId') ? 'Edit Unit' : 'Add Unit',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                {editedUnit ? <Item 
                    title='Delete' 
                    iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    onPress={deleteFn}
                />: null}
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30,
        marginTop: 23
    },
    inputContainer: {
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#ccc',
        borderColor: '#ccc'
    },
    icon: {
        paddingRight: 10,
        paddingVertical: 5,
    },
    rightIcon: {
        paddingRight: 2,
        color: Colors.primary
    },
    buttonContainer: {
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 50,
        paddingLeft: 10,  
    },
    buttonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    button: {
        borderRadius: 12,
        backgroundColor: '#33cc33',
        paddingHorizontal: 107
    },
    pickerStyle: {
        height: Dimensions.get('window').height*0.2,
        width: Dimensions.get('window').height*0.8,
        borderRadius: 10
    }
});

export default AddUnitScreen;