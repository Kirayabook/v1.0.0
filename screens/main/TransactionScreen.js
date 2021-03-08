import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const TransactionScreen = props => {
    const buildings = useSelector(state => state.building.availableBuilding);
    const units = useSelector(state => state.unit.availableUnit);

    let transaction = [];

    for (const unit in units) {
        let selectedBuilding = buildings.filter(build => build.id === units[unit].buildingId);  
        for (const detail in units[unit].details) {
            if (units[unit].details[detail].status !== 'Upcoming' && units[unit].details[detail].status !== 'Unpaid') {
                transaction = [...transaction, {status: units[unit].details[detail].status, date: units[unit].details[detail].date, building: selectedBuilding[0].buildingName !== undefined ? selectedBuilding[0].buildingName : '', name: units[unit].name, price: units[unit].price}]
            }
        }
    }

    if (transaction.length === 0) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>No Transaction Is Done Yet</Text>
            </View>
        );
    }

    const renderTransaction = (itemData) => {
        return(
            <View style={{flex: 1}}>
                <View style={styles.root}>
                    <View style={styles.leftContainer}>
                        <Text style={{fontSize: 20, paddingBottom: 18}}>{new Date(itemData.item.date).toString().slice(4, 15)}</Text>
                        <Text style={{fontSize: 17}}>{itemData.item.building}</Text>
                        <Text style={{fontSize: 15, color: '#aaa'}}>{itemData.item.name}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={{fontSize: 17, paddingBottom: 40, color: 'red', fontWeight: 'bold'}}>Rs.{itemData.item.price}</Text>
                        <Text style={{fontSize: 15, color: Colors.appGreen}}>{itemData.item.status}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={transaction}
            renderItem={renderTransaction}
            style={{backgroundColor: '#ddd'}}
            keyExtractor={(item, index) => index.toString()}
        />
    )
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
    }
});

export default TransactionScreen;