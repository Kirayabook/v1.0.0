import React, {useEffect, useCallback} from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'

import Colors from '../../constants/Colors';
import * as unitActions from '../../store/action/unit';

const UnitScreen = props => {
    const unit = useSelector(state => state.unit.availableUnit);
    const buildingId = props.navigation.getParam('buildingId');
    const buildingUnit = unit.filter(uni => uni.buildingId === buildingId);
    const dispatch = useDispatch();

    const timeHandler = useCallback(async() => {

        buildingUnit.forEach(async (element) => {

            while (new Date(new Date(new Date(Date.parse(element.nextPayment)).setHours(0)).setMinutes(0)).setSeconds(1) < (new Date().getTime())) { 

                const nextDate = new Date(new Date(Date.parse(element.nextPayment)).setMonth(new Date(Date.parse(element.nextPayment)).getMonth() + 1));

                let status = 'Unpaid';
                if (nextDate.getTime() > new Date().getTime()) {
                    status = 'Upcoming';
                }
                let dues = 0;
                if (status === 'Unpaid') {
                    dues = element.price;
                } else {
                    dues = 0;
                }
                await dispatch(unitActions.updatingUnit(
                    element.id, 
                    element.userId,
                    element.buildingId,
                    element.name,
                    element.phone,
                    element.gender,
                    element.date,
                    element.price,
                    element.email,
                    element.advanceBalance, 
                    element.nextPayment= nextDate, 
                    element.dues = +(element.dues) + +(dues),
                    element.details=[...element.details, {date:nextDate , paid: false, status: status}])
                )    
            }
        })

    },[]);

    useEffect(() => {
        timeHandler();
    }, [buildingUnit]);

    if(buildingUnit.length === 0) {
        return (
            <View style={styles.root}>
                <View style={styles.centered}>
                    <Text>No Unit found start adding some</Text>
                </View>
                <View>
                    <Button
                        icon={
                            <Ionicons
                                name="grid"
                                size={20}
                                color="white"
                                style={{marginHorizontal: 6, marginRight: 10}}
                            />
                        }
                        title= 'Add Unit'
                        titleStyle={styles.buttonTitle}
                        containerStyle={styles.addUnitButtonContainer}
                        buttonStyle={styles.addUnitButton}
                        onPress={() => {
                            props.navigation.navigate('newUnit', {
                                buildingId: buildingId
                            })
                        }}
                    />
                </View>
            </View>
        );
    }
    
    const renderUnit = (itemData) => {
        return (
            <TouchableOpacity style={{paddingBottom: 8}} onPress={() => {props.navigation.navigate('unitDetail', {unitId: itemData.item.id, unitDetails: itemData.item, name: itemData.item.name, buildingId: itemData.item.buildingId})}}>
                <View style={styles.renderRoot}>
                    <View style={styles.unitPrice}>
                        <Text style={styles.unitName}>{itemData.item.name}</Text>
                        <Text style={styles.priceStyle}>Rs. {itemData.item.price}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.paymentText}>Next Payment:</Text> 
                        <Text style={styles.paymentDate}>{new Date(Date.parse(itemData.item.nextPayment)).toString().slice(4,15)}</Text>
                    </View>
                    <Text style={{textAlign:'right', color: 'black', fontSize: 20, fontWeight: 'bold', marginRight: 12, paddingVertical: 8}}>Dues: <Text style={{color: 'red'}}>Rs.{itemData.item.dues}</Text></Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.root}>
            <FlatList
                data={buildingUnit}
                renderItem={renderUnit}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
            <Button
                icon={
                    <Ionicons
                        name="grid"
                        size={20}
                        color="white"
                        style={{marginHorizontal: 6, marginRight: 15}}
                    />
                }
                title= 'Add Unit'
                titleStyle={styles.buttonTitle}
                containerStyle={styles.addUnitButtonContainer}
                buttonStyle={styles.addUnitButton}
                onPress={() => {
                    props.navigation.navigate('newUnit', {
                        buildingId: buildingId
                    })
                }}
            />
        </View>
    );
};

UnitScreen.navigationOptions = navData => {
    const name =  navData.navigation.getParam('buildingTitle');
    return {
        headerTitle: name.length <= 18 ? name : name.slice(0,18) + '...',
    };
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    addUnitButtonContainer: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        borderRadius: 50,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 20},
        shadowRadius: 50,
        shadowOpacity: 1,
        elevation: 5,
    },
    addUnitButton: {
        borderRadius: 40,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20
    },
    list: {
        marginVertical: 1,
        marginTop: 20
    },
    renderRoot: {
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    unitName: {
        fontSize: 22,
        marginLeft: 15,
        fontWeight: '900'
    },
    priceStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#33cc33',
        marginRight: 15
    },
    unitPrice: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    paymentText: {
        paddingTop: 11,
        marginLeft: 18,
        fontSize: 17,
        color: '#aaa'
    },
    paymentDate: {
        paddingVertical: 10,
        marginLeft: 18,
        fontSize: 18,
        color: 'orange'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default UnitScreen;