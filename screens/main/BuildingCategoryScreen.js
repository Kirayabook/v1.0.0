import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as buildingActions from '../../store/action/building';
import * as unitActions from '../../store/action/unit';
import { Dimensions } from 'react-native';

const BuildingCategoryScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const building = useSelector(state => state.building.availableBuilding);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    const loadBuildingData= useCallback(async () => {
        setRefreshing(true);
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(buildingActions.fetchData(userId));
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
        setIsLoading(false);
        setRefreshing(false);
    }, []);

    const loadUnitData= useCallback(async () => {
        setRefreshing(true);
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(unitActions.fetchUnit(userId));
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
        setIsLoading(false);
        setRefreshing(false);
    }, []);

    useEffect(() => {
        // console.log('build');
        loadBuildingData();
        loadUnitData();
    }, [dispatch, loadBuildingData, loadUnitData]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured</Text>
                <Button 
                    title='  Try Again  ' 
                    containerStyle={{borderRadius: 50, alignItems: 'center', paddingTop: 20}}
                    buttonStyle={styles.addBuildingButton} 
                    onPress={loadBuildingData}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if(!isLoading && building.length === 0) {
        return (
            <View style={styles.root}>
                <View style={styles.centered}>
                    <Text>No Building found start adding some</Text>
                </View>
                <View>
                <Button
                    icon={
                        <Ionicons
                            name="business-outline"
                            size={15}
                            color="white"
                            style={{paddingRight: 6}}
                        />
                    }
                    title= 'Add Building'
                    titleStyle={styles.buttonTitle}
                    containerStyle={styles.addBuildingButtonContainer}
                    buttonStyle={styles.addBuildingButton}
                    onPress={() => {
                        props.navigation.navigate('addBuilding')
                    }}
                />
                </View>
            </View>
        );
    }

    const renderBuildingCategory = itemData => {
        return (  
            <View style={styles.container}>
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={() =>{
                        props.navigation.navigate('unit', {
                            buildingId: itemData.item.id,
                            buildingTitle : itemData.item.buildingName
                        });
                    }}
                >
                    {itemData.item.imageUrl ? <ImageBackground source={{uri: itemData.item.imageUrl}} style={styles.image} >
                        <View style={styles.child}></View>
                        <Text style={styles.title}>{itemData.item.buildingName}</Text>
                        <Button
                            icon={
                                <MaterialCommunityIcons
                                    name="camera-plus"
                                    size={13}
                                    color="white"
                                    style={{paddingHorizontal: 5}}
                                />
                            }
                            title= 'edit'
                            containerStyle={{position: 'absolute',
                                top: 10,
                                right: 10,
                                borderRadius: 50,
                                alignItems: 'center',
                                color: 'black'
                            }}
                            buttonStyle={{borderRadius: 40, backgroundColor: 'black'}}
                            onPress={() => {
                                props.navigation.navigate('addBuilding', {buildingId: itemData.item.id});
                            }}
                        />
                    </ImageBackground> : <ImageBackground source={{uri: 'https://plantationhomes.com.au/cms_uploads/images/15861_six-stages-of-building-a-home.jpg'}} style={styles.image} >
                        <View style={styles.child}></View>
                        <Text style={styles.title}>{itemData.item.buildingName}</Text>
                        <Button
                            icon={
                                <MaterialCommunityIcons
                                    name="camera-plus"
                                    size={13}
                                    color="white"
                                    style={{paddingHorizontal: 5}}
                                />
                            }
                            title= 'edit'
                            containerStyle={{position: 'absolute',
                                top: 10,
                                right: 10,
                                borderRadius: 50,
                                alignItems: 'center',
                                color: 'black',
                                shadowColor: '#ccc',
                                shadowOffset: { width: 2, height: 2},
                                shadowRadius: 10,
                                shadowOpacity: 1,
                                elevation: 5,
                            }}
                            buttonStyle={{borderRadius: 40, backgroundColor: 'black'}}
                            onPress={() => {
                                props.navigation.navigate('addBuilding', {buildingId: itemData.item.id});
                            }}
                        />
                    </ImageBackground> }
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <FlatList  
                refreshing={refreshing}
                onRefresh={loadBuildingData}
                data={building}
                renderItem={renderBuildingCategory}
                keyExtractor={(item) => item.id}
            />
            <View>
                <Button
                    icon={
                        <Ionicons
                            name="business-outline"
                            size={15}
                            color="white"
                            style={{paddingRight: 6}}
                        />
                    }
                    title= 'Add Building'
                    titleStyle={styles.buttonTitle}
                    containerStyle={styles.addBuildingButtonContainer}
                    buttonStyle={styles.addBuildingButton}
                    onPress={() => {
                        props.navigation.navigate('addBuilding')
                    }}
                />
            </View>
        </View>
    );
};

BuildingCategoryScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Kirayabook', 
    }
    
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#bbb'
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
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    container: {
        flexDirection: "column",
        marginHorizontal: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
    image: {
        height: Dimensions.get('window').height * 0.27,
        width: '100%',
        opacity: 5,
        marginVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        marginLeft: 10,
    },
    child: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 17
    }
});

export default BuildingCategoryScreen;