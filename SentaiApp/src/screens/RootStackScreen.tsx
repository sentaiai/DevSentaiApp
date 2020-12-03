import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import  SplashScreen  from './SplashScreen';
import  SignIn  from './SignInScreen';
import  SignUp  from './SignUpScreen';
import  Tab  from './MainTabScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator headerMode="none">
        {/* <RootStack.Screen name="SplashScreen" component = {SplashScreen} />
        <RootStack.Screen name="SignInScreen" component = {SignIn} />
        <RootStack.Screen name="SignUpScreen" component = {SignUp} />  */}
        <RootStack.Screen name="MainTabScreen" component = {Tab} />
    </RootStack.Navigator>
);

export default RootStackScreen;