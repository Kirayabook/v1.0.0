import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';

import Colors from '../../constants/Colors';

const ChangePasswordScreen = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const ref_input2 = useRef();
    const dispatch = useDispatch();

    const changePasswordHandler = async() => {
        setLoading(true);
        try{
            Auth.currentAuthenticatedUser()
                .then(async(user) => {
                    setLoading(true);
                    try {
                        await Auth.changePassword(user, oldPassword, newPassword)
                            .then(data => {
                                console.log(data);
                                props.navigation.navigate('profile');
                            });
                    } catch (err) {
                        if( err.code === 'InvalidParameterException' || err.code === 'NotAuthorizedException') {
                            setError('Please provide correct information');
                        } else {
                            setError(err.message);
                        }
                        console.log(err);
                    }
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setError(error);
        }
        setLoading(false);
    }

    return (
        <View style={{flex: 1}}>
            <View>
                <Ionicons name='arrow-back' size={30} style={{paddingLeft: 15, marginTop: 15}} onPress={() => {props.navigation.navigate('profile')}}/>
                <Text style={styles.text}>Change Password</Text>
                <Input
                    placeholder='Old Password'
                    leftIcon={
                        <Ionicons
                            name='lock-closed'
                            size={20}
                            color='black'
                            style={{paddingRight: 10}}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    secureTextEntry
                    value={oldPassword}
                    onChangeText={text => setOldPassword(text)}
                    editable={loading ? false : true}
                    returnKeyType='next'
                    onSubmitEditing={() => ref_input2.current.focus()}
                />
                <Input
                    placeholder='New Password'
                    leftIcon={
                        <Ionicons
                            name='lock-closed'
                            size={20}
                            color='black'
                            style={{paddingRight: 10}}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    secureTextEntry
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    editable={loading ? false : true}
                    returnKeyType='done'
                    ref={ref_input2}
                />
                <View style={styles.buttonContainer}>
                    {error && <Text style={{paddingBottom: 15, fontWeight: 'bold', color: 'red'}}>{error}</Text>}
                    {!loading ?<TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={changePasswordHandler} >
                        <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>Done</Text></View>
                    </TouchableOpacity> : <ActivityIndicator size='large' color={Colors.primary} />}
                </View>
            </View>
        </View>
    );
};

ChangePasswordScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 25,
        paddingVertical: 10,
        fontWeight: 'bold', 
        paddingBottom: 30
        
    },
    inputContainer: {
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#ddd',
        borderColor: '#ddd',
    },
    buttonContainer: {
        borderRadius: 20,
        alignItems: 'center',  
    },
    buttonText: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    button: {
        // borderWidth: 1,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        paddingHorizontal: 95
    },
});

export default ChangePasswordScreen;