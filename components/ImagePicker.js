import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Alert, Button, ProgressBarAndroidComponent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status != 'granted') {
            Alert.alert(
                'Insufficient Permissions!', 
                'To grant permission press okay otherwise decline' 
                [{text: 'okay'}]
            );
            return false;
        }
        return true;
    }

    const takeImageHandller = async () => {
        const hasPermissions =  await verifyPermission();
        if (!hasPermissions) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    const galleryImagePickerHandler = async () => {
        const hasPermissions =  await verifyPermission();
        if (!hasPermissions) {
            return;
        }
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {pickedImage && 
                <Image style={styles.image} source={{uri: pickedImage}} /> }
            </View>
            <View style={styles.iconContainer}>
                <TouchableWithoutFeedback onPress={takeImageHandller}>
                    <Ionicons name='image' size={30} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={galleryImagePickerHandler}>
                    <Ionicons name='attach' size={30} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        height: '70%'
    },
    imagePreview: {
        width: '100%',
        height: '80%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aaa',
        borderColor: '#ccc',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    iconContainer: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    }
});

export default ImgPicker;