import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Switch, Share, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

import * as unitActions from '../store/action/unit';
import { ActivityIndicator } from 'react-native';

const Detail = props => {

    const unitId = props.unitId;
    const Units = useSelector(state => state.unit.availableUnit);
    const unit = Units.filter(uni => uni.id === unitId);

    const dispatch = useDispatch();
    const itemData = props.itemdata;
    const [isenabled, setIsenabled] = useState(itemData.item.paid);
    const [loading, setLoading] = useState(false);

    const sendMessageHandler = async (detail) => {
        let message = null;
        if (detail.status === 'Upcoming') {
            message = 
            `Dear Sir/Madam,Your payment of ₹ ${unit[0].price} is upcoming at my property dated ${new Date(detail.date).toString().slice(4,15)}.Kindly pay on or before the appropriate date,  Thanks
             Powered by Kirayabook`
        } else if (detail.status === 'Unpaid') {
            message = 
            `Dear Sir/Madam,Your payment of ₹ ${unit[0].price} is dues at my property dated ${new Date(detail.date).toString().slice(4,15)}.Kindly pay on or before the appropriate date,  Thanks
             Powered by Kirayabook`
        }
        try {
            const result = await Share.share({
                message: message,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleSwitch = async(value) => {
        if(value) {
            setLoading(true);
            let updatedDues = +(unit[0].dues);
            let updatedDetails = unit[0].details
            updatedDetails[itemData.index].paid = true
            if (updatedDetails[itemData.index].paid === true && updatedDetails[itemData.index].status === 'Unpaid') {
                updatedDues = +(updatedDues) - +(unit[0].price);
            }
            updatedDetails[itemData.index].status = `Paid on ${new Date().toString().slice(4,15)}`

            setIsenabled(value);
            try{
                await dispatch(unitActions.updatingUnit(
                    unit[0].id,
                    unit[0].userId,
                    unit[0].buildingId,
                    unit[0].name,
                    unit[0].phone,
                    unit[0].gender,
                    unit[0].date,
                    unit[0].price,
                    unit[0].email,
                    unit[0].advanceBalance,
                    unit[0].nextPayment,
                    unit[0].dues = updatedDues,
                    unit[0].details = updatedDetails,
                ));
            } catch (err) {
                setIsenabled(!value);
            }
            setLoading(false);
        } else {
            setLoading(true);
            let updateDues = +(unit[0].dues);
            let updateDetails = unit[0].details
            updateDetails[itemData.index].paid = false
            updateDetails[itemData.index].status = 'Unpaid'

            if (Date.parse(updateDetails[itemData.index].date) > new Date().getTime()){
                updateDetails[itemData.index].status = 'Upcoming'
            }

            if (updateDetails[itemData.index].paid === false && updateDetails[itemData.index].status === 'Unpaid') {
                updateDues = +(updateDues) + +(unit[0].price);
            }

            setIsenabled(value);
            try {
                await dispatch(unitActions.updatingUnit(
                    unit[0].id,
                    unit[0].userId,
                    unit[0].buildingId,
                    unit[0].name,
                    unit[0].phone,
                    unit[0].gender,
                    unit[0].date,
                    unit[0].price,
                    unit[0].email,
                    unit[0].advanceBalance,
                    unit[0].nextPayment,
                    unit[0].dues = updateDues,
                    unit[0].details = updateDetails,
                ));
            } catch (err) {
                setIsenabled(!value);
                console.log(err);
            }
            setLoading(false);
        }
    }

    return (
        <View style={styles.reminderContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.paymentDate}>{new Date(Date.parse(itemData.item.date)).toString().slice(4, 15)}</Text>
                {!loading ? <Switch
                    trackColor={{ false: "#767577", true: Colors.primary }}
                    thumbColor={itemData.item.paid ? "#f5dd4b" : "#f4f3f4"}
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.2 }], marginRight: 10 }}
                    value={isenabled}
                    onValueChange={toggleSwitch}
                /> : <ActivityIndicator size='large' color={Colors.primary} />}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{paddingLeft: 20, color: itemData.item.status === 'Unpaid' ? 'red' : Colors.appGreen}}>{itemData.item.status}</Text>
                {!itemData.item.paid && <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {sendMessageHandler(itemData.item)}}>
                    <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>Send Reminder</Text></View>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    reminderContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingVertical: 10,
        transform: [{ scaleY: -1 }]
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        paddingVertical: 20
    },
    buttonText: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white',
    },
    button: {
        borderRadius: 18,
        backgroundColor: '#0033cc',
        paddingHorizontal: 12,
        marginRight: 8
    },
    paymentDate: {
        paddingVertical: 5,
        marginLeft: 18,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
})

export default Detail;