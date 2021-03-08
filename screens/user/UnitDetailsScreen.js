import React, { useEffect, useState, useCallback} from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import * as unitActions from '../../store/action/unit';
import Detail from '../../components/Detail';

const UnitDetailsScreen = props => {
    const unitId = props.navigation.getParam('unitId');
    const Units = useSelector(state => state.unit.availableUnit);
    const unit = Units.filter(uni => uni.id === unitId);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const dispatch = useDispatch();

    const timeHandler = useCallback(() => {
        setIsRefreshing(true);
        while ((Date.parse(unit[0].nextPayment)) < (new Date().getTime())) { 

            const nextDate = new Date(new Date(Date.parse(unit[0].nextPayment)).setMonth(new Date(Date.parse(unit[0].nextPayment)).getMonth() + 1));

            let status = 'Unpaid';
            if (nextDate.getTime() > new Date().getTime()) {
                status = 'Upcoming';
            }
            let dues = 0;
            if (status === 'Unpaid') {
                dues = unit[0].price;
            } else {
                dues = 0;
            }

            dispatch(unitActions.updatingUnit(
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
                unit[0].nextPayment= nextDate, 
                unit[0].dues = +(unit[0].dues) + +(dues),
                unit[0].details=[...unit[0].details, {date:nextDate , paid: false, status: status}])
            );     
        }
        setIsRefreshing(false);
    }, []);

    const updateStatusHandler = () => {
        for (const detail in unit[0].details) {
            if (new Date(unit[0].details[detail].date).getTime() < new Date().getTime() && unit[0].details[detail].status === 'Upcoming') {
                const updateDetails = unit[0].details
                updateDetails[detail].status = 'Unpaid'

                dispatch(unitActions.updatingUnit(
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
                    unit[0].dues = +(unit[0].dues) + +(unit[0].price),
                    unit[0].details = updateDetails
                )); 
            }         
        }
    }

    useEffect(() => {
        timeHandler();
        updateStatusHandler();
    }, [timeHandler]);

    const renderPaymentDetails = (itemData) => <Detail itemdata={itemData} unitId = {unitId} />

    const renderDetails = (itemData) => {
        return (
            <View style={styles.root}>
                <View>
                    <View style={styles.advBalance}>
                        <Text style={styles.balance}>Advance Balance:</Text> 
                        <Text style={{...styles.balance, color: '#33cc33'}}>Rs. {itemData.item.advanceBalance}</Text>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.namePrice}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.name}>{itemData.item.name}</Text>
                                <Text style={{marginTop: 13, color: '#33cc33'}}>({itemData.item.gender})</Text>
                            </View>
                            <Text style={styles.price}>Rs. {itemData.item.price}</Text>
                        </View>
                        <Text style={{marginHorizontal: 1, color: '#aaa', marginTop: 3,fontSize:16, paddingBottom: 15, textAlign:'center', width: '40%'}}>({itemData.item.phone})</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.paymentText}>Next Payment: <Text style={{color: 'orange', fontSize: 18}}>{new Date(Date.parse(itemData.item.nextPayment)).toString().slice(4,15)}</Text></Text>
                        </View>
                        <Text style={styles.dues}>Dues: <Text style={{color: 'red'}}>Rs.{itemData.item.dues}</Text></Text>
                    </View>
                </View>
                <FlatList 
                    data={itemData.item.details}
                    renderItem={renderPaymentDetails}
                    onRefresh={timeHandler}
                    refreshing={isRefreshing}
                    keyExtractor={(item,index) => index.toString()}
                    style={{transform: [{ scaleY: -1 }]}}
                />             
            </View>
        );
    }

    return(
        <View style={{flex: 1}}>
            <FlatList
                onRefresh={timeHandler}
                refreshing={isRefreshing}
                data={unit}
                renderItem={renderDetails} 
                key={item => item.id}
            />
        </View>
    );
};

UnitDetailsScreen.navigationOptions = navData => {
    const unitId = navData.navigation.getParam('unitId');
    const name = navData.navigation.getParam('name');
    const unitDetails = navData.navigation.getParam('unitDetails');
    const buildingId = navData.navigation.getParam('buildingId')
    return {
        headerTitle: name.length <= 9 ? name : name.slice(0,9) + '...',
        headerRight: () => (
            <View style={{flexDirection: 'row'}}>
                <View>
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Edit' 
                            iconName='create'
                            onPress={() => {
                                navData.navigation.navigate('newUnit', {unitId: unitId, buildingId: buildingId})}
                            }
                        />
                    </HeaderButtons>
                    <Text style={{color: 'white', paddingLeft: 13}}>Edit</Text>
                </View>
                <View>
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Update Balance' 
                            iconName='duplicate'
                            onPress={() => {navData.navigation.navigate('advanceBalance', {unitDetails: unitDetails})}}
                        />
                    </HeaderButtons>
                    <Text style={{color: 'white', paddingRight: 5}}>Update Balance</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    advBalance: {
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10},
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balance: {
        paddingVertical: 10,
        marginLeft: 20,
        fontSize: 20,
        paddingHorizontal: 20
    },
    detail: {
        marginVertical: 10,
        marginHorizontal: 17,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10},
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 10,
    },
    namePrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 8,
        textAlign: 'center',
        width: '50%'
    },
    price : {
        marginTop: 10, 
        color:'#33cc33', 
        fontSize: 18, 
        marginRight: 10, 
        fontWeight: 'bold'
    },
    paymentText: {
        paddingVertical: 5,
        marginLeft: 18,
        fontSize: 16
    },
    paymentDate: {
        paddingVertical: 5,
        marginLeft: 18,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    dues: {
        textAlign:'right', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        paddingBottom: 15
    },
    reminderContainer: {
        marginTop: 20,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingVertical: 10
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
        borderRadius: 12,
        backgroundColor: '#0033cc',
        paddingHorizontal: 10,
        marginRight: 5
    }
});

export default UnitDetailsScreen;