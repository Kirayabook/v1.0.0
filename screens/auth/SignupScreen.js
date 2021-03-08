import React, {useState, useRef} from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';

import Colors from '../../constants/Colors';

const SignupScreen = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const signupHandler = async() => {
        setLoading(true);
        try {
            await Auth.signUp({ username : '+91' + username, password, attributes: { email, phone_number: '+91' + username } });
            console.log(' Sign-up Confirmed');
            props.navigation.navigate('confirmOtp', {username: username, email: email});
        } catch (error) {
            console.log(' Error signing up...', error);
            setError(error.message);
        }
        setLoading(false);
    }

    const emailHandler = (text) => {
        if (email.trim().length === 0) {
            setEmailIsValid(false)
        } else {
            setEmailIsValid(true)
        }
        setEmail(text);
    };

    return (
        <View style={{flex: 1}}>
            <View>
                <Ionicons name='arrow-back' size={30} style={{paddingLeft: 15, marginTop: 15}} onPress={() => {props.navigation.navigate('signin')}}/>
                <Text style={styles.text}>Create a new account</Text>
                <View style={{flexDirection: 'row', paddingLeft: 10, backgroundColor: '#ddd', height: '11.5%', marginBottom: 15, borderRadius: 40, width: '95%', marginLeft:9}}>
                    <Image style={{width: '6%', height: '30%', marginTop: 16, marginRight: 5, marginLeft: 2}} source={{uri: 'data:image/png;base64,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'}} />
                    <Text style={{paddingTop: 11, fontSize: 18}}>+91</Text>
                    <Input
                        placeholder='Mobile Number'
                        inputContainerStyle={{...styles.inputContainer, width: '85%', paddingTop: 4}}
                        value={username}
                        onChangeText={text => setUsername(text)}
                        keyboardType='phone-pad'
                        returnKeyType='next'
                        autoFocus
                        onSubmitEditing={() => ref_input2.current.focus()}
                        maxLength={10}
                    />
                </View>
                <Input
                    placeholder='Password'
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
                    value={password}
                    onChangeText={text => setPassword(text)}
                    returnKeyType='next'
                    ref={ref_input2}
                    onSubmitEditing={() => ref_input3.current.focus()}
                />
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Ionicons
                        name='md-card'
                        size={20}
                        color='black'
                        style={{paddingRight: 10}}
                        />
                    }
                    inputContainerStyle={styles.inputContainer}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    returnKeyType='done'
                    ref={ref_input3}
                />
                <View style={styles.buttonContainer}>
                    {error && error !== "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6" ? <Text style={{paddingBottom: 15, fontWeight: 'bold', color: 'red', paddingLeft: 10}}>{error}</Text> : <Text style={{paddingBottom: 15, color: 'red', paddingHorizontal: 20, textAlign: 'center'}}>*Password must be of length 6 or more than 6 and must contain uppercase letter</Text>}
                        {email ? <View>
                            {!loading ? <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={signupHandler}>
                            <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>Register</Text></View>
                        </TouchableOpacity> : <ActivityIndicator size='large' color={Colors.primary} />}
                    </View> : <View>
                        <TouchableOpacity style={{...styles.button, backgroundColor: '#aaa'}} activeOpacity={1}>
                            <View style={styles.buttonTextContainer}><Text style={styles.buttonText}>Register</Text></View>
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
        </View>
    );
};

SignupScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 27,
        paddingVertical: 10,
        fontWeight: 'bold', 
        marginBottom: 30
        
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
        borderRadius: 12,
        backgroundColor: Colors.primary,
        paddingHorizontal: 80
    },
});

export default SignupScreen;