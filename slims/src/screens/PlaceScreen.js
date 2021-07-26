import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Place from '../components/place/Place';
import FormPlace from '../components/place/FormPlace';

const Stack = createStackNavigator();

function PlaceScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="Place"
        component={Place}
      />
      <Stack.Screen
        name="FormPlace"
        component={FormPlace}
      />
    </Stack.Navigator>
  );
}

export default PlaceScreen;