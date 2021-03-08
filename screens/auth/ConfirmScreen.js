import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';

import Colors from '../../constants/Colors';

const ConfirmScreen = props => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const username = props.navigation.getParam('username');
    const email = props.navigation.getParam('email');

    const confirmSignup = async() => {
        setLoading(true);
        try {
            await Auth.confirmSignUp('+91' + username, code)
                console.log(' Code confirmed');
                props.navigation.navigate('signin');
        } catch (error) {
            console.log(
                ' Verification code does not match. Please enter a valid verification code.',
                error.code
            );
            setError(error.message);
        }
        setLoading(false);
    };

    const resendSignupHandler = async() => {
        try {
            await Auth.resendSignUp('+91' + username)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{flex: 1}}>
            <View>
                <Ionicons name='arrow-back' size={30} style={{paddingLeft: 15, marginTop: 15}} onPress={() => {props.navigation.navigate('signup')}}/>
                <Text style={styles.text}>Confirm Registeration</Text>
                <Text style={{paddingBottom: 2, textAlign: 'center', fontSize: 17}}>We've sent a code to</Text>
                <Text style={{paddingBottom: 25, textAlign: 'center', fontSize: 17, marginBottom: 14}}>{email}</Text>
                <Input
                    placeholder='Verification code'
                    leftIcon={
                        <MaterialCommunityIcons
                        name='numeric'
                        size={20}
                        color='black'
                        style={{paddingRight: 10}}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    value={code}
                    onChangeText={text => setCode(text)}
                    keyboardType='number-pad'
                    returnKeyType='done'
                    autoFocus
                />
                <View style={styles.buttonContainer}>
                    {/* <Text style={{paddingBottom: 16, textAlign: 'center', color: 'red', fontSize: 15}}>*Verification code is sent to your Email</Text> */}
                    {error && <Text style={{paddingBottom: 15, fontWeight: 'bold', color: 'red'}}>{error}</Text>}
                    {!loading ? <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={confirmSignup} >
                        <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>Confirm signup</Text></View>
                    </TouchableOpacity> : <ActivityIndicator size='large' color={Colors.primary} />}
                </View>
                {!loading && <TouchableOpacity style={{alignItems:'center', paddingTop: 25}} onPress={resendSignupHandler}>
                        <Text style={{color: 'blue', fontSize: 16, alignItems: 'center'}}>Resend Code</Text>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

ConfirmScreen.navigationOptions = {
    headerShown: false
}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 28,
        paddingVertical: 5,
        marginTop: 20,
        fontWeight: 'bold', 
        marginBottom: 20
        
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
        paddingTop: 20
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
        borderRadius: 12,
        backgroundColor: Colors.primary,
        paddingHorizontal: 80
    },
});

export default ConfirmScreen;