import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux'

import { DRAWER_ITEMS } from './src/commons/DrawerItems';
import DrawerContent from './src/screens/DrawerContent.js';
import BibliographyScreen from './src/screens/BibliographyScreen';
import RootStackScreen from './src/screens/RootStackScreen';
import { COLORS } from './src/constants/theme';
import { AuthContext } from './src/contexts/AuthContext';
import Authentication from './src/service/auth/Authentication.service';
import store from './src/store'
import { images } from './src/constants';

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }

      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }

      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }

      case 'LOADING':
        return {
          ...prevState,
          isLoading: !prevState.isLoading,
        }

      default:
        break;
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {

      let userToken = null;
      try {
        userToken = await Authentication.signIn(userName, password);
        if (userToken) {
          dispatch({ type: 'LOADING' });
          userToken = userToken.access_token
          await AsyncStorage.setItem('userToken', userToken);
          dispatch({ type: 'LOGIN', id: userName, token: userToken });
        }

      } catch (error) {
        console.log(error);
      }

    },
    signOut: async () => {
      dispatch({ type: 'LOADING' });

      await AsyncStorage.removeItem('userToken');

      dispatch({ type: 'LOGOUT' });
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <Image
          resizeMethod="scale"
          resizeMode="center"
          source={images.logo}
        />
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <NavigationContainer>
          <RootStackScreen userToken={loginState.userToken} />
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}