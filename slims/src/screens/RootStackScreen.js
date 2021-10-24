import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../components/SignIn';
import DrawerScreen from './DrawerScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => {
    return (
        <RootStack.Navigator headerMode='none'>
            {userToken !== null ?
                <RootStack.Screen
                    name="DrawerScreen"
                    component={DrawerScreen}
                    options={{
                        animationEnabled: false
                    }} />
                :
                <RootStack.Screen name="SignIn" component={SignIn} />
            }
        </RootStack.Navigator>
    )
};

export default RootStackScreen;