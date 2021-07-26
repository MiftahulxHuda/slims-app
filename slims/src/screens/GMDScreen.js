import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GMD from '../components/gmd/GMD';
import FormGMD from '../components/gmd/FormGMD';

const Stack = createStackNavigator();

function GMDScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="GMD"
        component={GMD}
      />
      <Stack.Screen
        name="FormGMD"
        component={FormGMD}
      />
    </Stack.Navigator>
  );
}

export default GMDScreen;