import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import ImagePicker from '../../components/ImagePicker';
import * as buildingActions from '../../store/action/building';
import * as unitActions from '../../store/action/unit';
import Colors from '../../constants/Colors';

const AddBuildingScreen = props => {
    const buildingId = props.navigation.getParam('buildingId');
    const userId = useSelector(state => state.auth.userId);
    const editedBuilding = useSelector(state => state.building.availableBuilding.find(build => build.id === buildingId));
    const unit = useSelector(state => state.unit.availableUnit);
    const deleteUnit = unit.filter(unit => unit.buildingId === buildingId);
    const [loading, setLoading] = useState(false);
    const id = [];
    for (const key in deleteUnit) {
        id.push(deleteUnit[key].id)
    }

    const [buildingName, setBuildingName] =useState(editedBuilding ? editedBuilding.buildingName : '');
    const [selectedImage, setSelectedImage] = useState(editedBuilding ? editedBuilding.imageUrl : '');

    const dispatch = useDispatch();

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath);
    };

    const saveBuidingHandler = () => {
        setLoading(true);
        if(!editedBuilding) {
            dispatch(buildingActions.addBuilding(userId, buildingName, selectedImage));
        }
        else {
            dispatch(buildingActions.updatingBuilding(buildingId, userId, buildingName, selectedImage));
        }
        setLoading(false);
        props.navigation.goBack();
    };

    const deleteBuildingHandler = useCallback(async() => {
        Alert.alert(
            'Delete Building',
            'Are you sure want to delete this building',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        id.map(id => dispatch(unitActions.deletingUnit(id)));
                        dispatch(buildingActions.deletingBuilding(buildingId));
                        props.navigation.goBack();
                    }
                
                }
            ]
        )
    }, []);

    useEffect(() => {
        props.navigation.setParams({ delete: deleteBuildingHandler, editedBuilding: editedBuilding})
    }, [deleteBuildingHandler]);

    return (
            <View style={styles.root}>
                <Input
                    placeholder='Building Name'
                    leftIcon={
                        <Ionicons
                            name='md-card'
                            size={24}
                            color='black'
                            style={styles.icon}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    onChangeText={text => setBuildingName(text)}
                    value={buildingName}
                    returnKeyType='done'
                    autoFocus
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                {buildingName ? <View>{!loading ? <TouchableOpacity onPress={saveBuidingHandler}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SAVE</Text>
                    </View>
                </TouchableOpacity> : <ActivityIndicator size='large' color={Colors.primary} />}</View> : <TouchableOpacity>
                    <View style={{...styles.button, opacity: 0.2}}>
                        <Text style={styles.buttonText}>SAVE</Text>
                    </View>
                </TouchableOpacity>}
            </View>
    );
};

AddBuildingScreen.navigationOptions = navData => {
    const editedBuilding = navData.navigation.getParam('editedBuilding');
    const deleteFn = navData.navigation.getParam('delete')
    return {
        headerTitle: navData.navigation.getParam('buildingId') ? 'Edit Building' : 'Add Building',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                {editedBuilding ? <Item 
                    title='Delete' 
                    iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    onPress={deleteFn}
                /> : null}
            </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 10
    },
    inputContainer: {
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#ddd',
        borderColor: '#ccc',
        marginTop: 23,
    },
    icon: {
        paddingRight: 10,
        paddingVertical: 5
    },
    button: {
        borderRadius: 12,
        alignItems: 'center', 
        marginHorizontal: 10,
        backgroundColor: Colors.appGreen,
        opacity: 10
    },
    buttonText: {
        marginVertical: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default AddBuildingScreen;