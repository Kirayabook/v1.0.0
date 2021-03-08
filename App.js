import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import BuildingReducer from './store/reducer/building';
import UnitReducer from './store/reducer/unit';
import AuthReducer from './store/reducer/auth';
import NavigationContainer from './navigation/NavigationContainer';
import USER_LOGOUT from './store/action/auth';

import Amplify from 'aws-amplify';
import awsmobile from './src/aws-exports';
import { StatusBar } from 'react-native';

Amplify.configure(awsmobile);

const appReducer = combineReducers({
  building: BuildingReducer,
  unit: UnitReducer,
  auth: AuthReducer
})

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
}

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}> 
      <StatusBar animated={true} hidden={false} backgroundColor='#0040ff' />
      <NavigationContainer /> 
    </Provider>
  );
};