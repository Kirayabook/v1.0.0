import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import MainNavigator from './MainNavigator';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.userId);

  useEffect(() => {
    if (isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'App' })
      );
    }
  }, [isAuth]);

  return <MainNavigator ref={navRef} />;
};

export default NavigationContainer;