import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';

import * as authActions from '../store/action/auth';

const AuthCheckScreen = props => {
    const dispatch = useDispatch();
  
    const checkAuthState = async() => {
        try {
            await Auth.currentAuthenticatedUser()
                .then(resp => {
                    console.log(' User is signed in');
                    dispatch(authActions.authFlow('loggedIn', resp.username, resp.attributes.email, resp.attributes.phone_number));
                });    
        } catch (err) {
            console.log(' User is not signed in');
            dispatch(authActions.authFlow('loggedOut'));
            props.navigation.navigate('Auth');
        }
    };
  
    useEffect(() => {
      checkAuthState();
    }, []);

    return null;
};

export default AuthCheckScreen;
