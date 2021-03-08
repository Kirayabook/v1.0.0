import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Share, Alert, Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/action/auth';
import { Auth } from 'aws-amplify';
import * as MailComposer from 'expo-mail-composer';

import ProfileComponent from '../../components/ProfileComponent';
import Colors from '../../constants/Colors';

const ProfileScreen = props => {
    const dispatch = useDispatch();
    const name = props.navigation.getParam('name');
    const phone = props.navigation.getParam('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const email = useSelector(state => state.auth.email);
    const phone_number = useSelector(state => state.auth.phone_number);

    const signoutHandler = async() => {
        Alert.alert('Logout confirmation', 'Are you sure want to logout', 
            [
                {text:"Cancel", onPress:() => {console.log('cancelled logout')} },
                {text:"Ok", onPress:async() => {
                    setLoading(true);
                    try {
                        await Auth.signOut()
                            .then(resp => {
                                dispatch(authActions.authFlow('loggedOut'));
                                dispatch(authActions.signOut());
                                props.navigation.navigate('Auth');
                            });
                    } catch (error) {
                        console.log('Error signing out: ', error);
                        setError(error.message);
                    }
                    setLoading(false);
                }}
            ]
        );
    };

    const shareHandler = async() => {
        try {
            const result = await Share.share({
                message: 'share this lovely App',
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const sendMailHandler = async() => {
        MailComposer.composeAsync({
            recipients: ['Contact@kirayabook.com']
        })
    }

    return (
        <ScrollView style={{backgroundColor: '#ddd'}}>
            <View style={{padding: 15, backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginTop: 10}}>
                <Text style={{textAlign: 'center', fontSize: 18, paddingBottom: 8}}>{email}</Text>
                <Text style={{textAlign: 'center', fontSize: 15}}>{phone_number}</Text>
            </View>
            <ProfileComponent title='Share' onPress={shareHandler} icon='share-social' color='black' description='Let your friends know about this App'/>
            <ProfileComponent title='Rate Us' icon='star' color='black' description='Share your Love with us' />
            <ProfileComponent title='Feedback'icon='document-text' color='black' description='Please give your valuable suggestion' onPress={ ()=> Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSdKLVeWVOnw7k-hgDtqQRL3nr6N2TJwxDgS3e_GUxs7AF0BWA/viewform') } />
            <ProfileComponent title='Help & Support' icon='headset' color='black' description='We are always here to help you' onPress={sendMailHandler}/>
            <ProfileComponent title='Change Password' icon='sync' onPress={() => {props.navigation.navigate('changePassword')}} color='black' description='change your credentials' />
            <ProfileComponent title= 'Logout' icon='power' onPress={signoutHandler} color='red' description='Logged yourself out' />
        </ScrollView>
    );
};

ProfileScreen.navigationOptions = {
    headerTitle: 'My Account',
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
    },
    editButton: {
        flexDirection: 'row',
        position: 'absolute',
        right: Dimensions.get('window').width*0.2,
        top: Dimensions.get('window').width*0.3,

    },
    editText: {
        fontSize: 14,
        color: '#aaa'
    },
    name: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 5,
        paddingRight: 5
    },
    phone: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 15
    }
});

export default ProfileScreen;