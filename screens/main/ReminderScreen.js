import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ReminderScreen = props => {

    
    const buildings = useSelector(state => state.building.availableBuilding);

    const units = useSelector(state => state.unit.availableUnit);

    const sendMessageHandler = async (detail) => {
        let message = null;
        if (detail.status === 'Upcoming') {
            message = 
            `Dear Sir/Madam,Your payment of ₹ ${detail.price} is upcoming at my property dated ${new Date(detail.date).toString().slice(4,15)}.Kindly pay on or before the appropriate date,Thanks
             Powered by Kirayabook`
        } else if (detail.status === 'Unpaid') {
            message = 
            `Dear Sir/Madam,Your payment of ₹ ${detail.price} is dues at my property dated ${new Date(detail.date).toString().slice(4,15)}.Kindly pay on or before the appropriate date,  Thanks
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

    let reminderUpcoming = [];
    let reminderUnpaid = [];

    for(const unit in units) {
        let selectedBuilding = buildings.filter(build => build.id === units[unit].buildingId); 
        for(const detail in units[unit].details) {
            if (units[unit].details[detail].status === 'Upcoming') {
                reminderUpcoming = [...reminderUpcoming, {status: units[unit].details[detail].status, date: units[unit].details[detail].date, building: selectedBuilding[0].buildingName, name: units[unit].name, price: units[unit].price}]
            }else if (units[unit].details[detail].status === 'Unpaid') {
                reminderUnpaid = [...reminderUnpaid, {status: units[unit].details[detail].status, date: units[unit].details[detail].date, building: selectedBuilding[0].buildingName ? selectedBuilding[0].buildingName : '', name: units[unit].name, price: units[unit].price}]
            }
        }
    }

    let reminderArray = reminderUnpaid.concat(reminderUpcoming);

    const sortReminderArray = reminderArray.sort((a, b) => Date.parse(new Date(b.date)) - Date.parse(new Date(a.date)));

    if (sortReminderArray.length === 0) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>No Reminder to Show</Text>
            </View>
        );
    }

    const renderReminder = (itemData) => {

        return(
            <View style={{flex:1}}>
                <View style={styles.root}>
                    <View style={styles.leftContainer}>
                        <Text style={{fontSize: 20, paddingBottom: 18}}>{new Date(itemData.item.date).toString().slice(4,15)}</Text>
                        <Text style={{fontSize: 15}}>{itemData.item.building}</Text>
                        <Text style={{fontSize: 13, color: '#aaa'}}>{itemData.item.name}</Text>
                        <Text style={{fontSize: 16, color: itemData.item.status === 'Unpaid' ? 'red' : Colors.appGreen, paddingTop: 2}}>{itemData.item.status}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={{fontSize: 17, paddingBottom: 40, color: 'red', fontWeight: 'bold'}}>Rs.{itemData.item.price}</Text>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {sendMessageHandler(itemData.item)}}>
                        <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>Send Reminder</Text></View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            style={{paddingBottom: 5}}
            data={sortReminderArray}
            renderItem={renderReminder}
            style={{backgroundColor: '#ddd'}}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginVertical: 3,
        marginHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 20

    },
    leftContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    rightContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        paddingVertical: 10,
        paddingTop: 5
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
        paddingHorizontal: 10,
        marginRight: 5
    },
});

export default ReminderScreen;