import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import BuildingCategoryScreen from '../screens/main/BuildingCategoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import ReminderScreen from '../screens/main/ReminderScreen';
import TransactionScreen from '../screens/main/TransactionScreen';
import UnitScreen from '../screens/user/UnitScreen';
import UnitDetailsScreen from '../screens/user/UnitDetailsScreen';
import Colors from '../constants/Colors';
import AddBuildingScreen from '../screens/user/AddBuildingScreen';
import AddUnitScreen from '../screens/user/AddUnitScreen';
import ContactsPicker from '../components/ContactsPicker';
import AdvanceBalanceScreen from '../screens/user/AdvanceBalanceScreen';
import SigninScreen from '../screens/auth/SigninScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ConfirmScreen from '../screens/auth/ConfirmScreen';
import AuthCheckScreen from '../screens/AuthCheckScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/user/ChangePasswordScreen';

const defaultStackNavOption = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25 
    },
    headerTintColor: 'white',
    cardStyleInterpolator : ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                {
                    translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                    }),
                },
                ],
            },
        };
    },
}

const BuildingNavigator = createStackNavigator({
    homeScreen: BuildingCategoryScreen,
    unit: UnitScreen,
    unitDetail: UnitDetailsScreen,
    addBuilding: AddBuildingScreen,
    newUnit: AddUnitScreen,
    contacts: ContactsPicker,
    advanceBalance: AdvanceBalanceScreen
}, {
    defaultNavigationOptions: defaultStackNavOption,
})


BuildingNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
};

const ProfileNavigator = createStackNavigator({
    profile: ProfileScreen,
    changePassword: ChangePasswordScreen
},{
    defaultNavigationOptions: defaultStackNavOption
});

ProfileNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
};

const ReminderNavigator = createStackNavigator({
    Reminder: ReminderScreen
},{
    defaultNavigationOptions: defaultStackNavOption
});

const TransactionNavigator = createStackNavigator({
    Transactions: TransactionScreen
},{
    defaultNavigationOptions: defaultStackNavOption
})


const tabScreenConfig = {
    Home: {
        screen: BuildingNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='home' size={25} color={tabInfo.tintColor} style={{paddingVertical: 3}} />;
            },
            tabBarColor : 'white',
            tabBarLabel: 'Home',
        }
    
    },
    Reminder: {
        screen: ReminderNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='send' size={25} color={tabInfo.tintColor} style={{paddingVertical: 3}} />;
            },
            tabBarColor : 'white',
            tabBarLabel: 'Reminder',
        }
    },
    Transaction: {
        screen: TransactionNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='list' size={25} color={tabInfo.tintColor} style={{paddingVertical: 3}} />;
            },
            tabBarColor : 'white',
            tabBarLabel: 'Transaction',
        }
    
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='person-circle-outline' size={25} color={tabInfo.tintColor} style={{paddingVertical: 3}} />;
            },
            tabBarColor : 'white',
            tabBarLabel: 'My Account',
        }
    }
}

const tabNavigator = 
    createMaterialBottomTabNavigator(
        tabScreenConfig, {
            activeColor: Colors.primary,
            inactiveColor: '#808080',
            shifting: true,
                barStyle: {
                    paddingBottom: 7
                }
    }) 

const AuthNavigator = createStackNavigator({
    signin: SigninScreen,
    signup: SignupScreen,
    confirmOtp: ConfirmScreen,
    forgot: ForgotPasswordScreen
}, {
    defaultNavigationOptions: defaultStackNavOption
});

const AppNavigator = createSwitchNavigator ({
    start: AuthCheckScreen,
    Auth: AuthNavigator,
    App: tabNavigator
});

export default createAppContainer(AppNavigator);

    