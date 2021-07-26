import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MediaType from '../components/media_type/MediaType';
import FormMediaType from '../components/media_type/FormMediaType';

const Stack = createStackNavigator();

function MediaTypeScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="MediaType"
        component={MediaType}
      />
      <Stack.Screen
        name="FormMediaType"
        component={FormMediaType}
      />
    </Stack.Navigator>
  );
}

export default MediaTypeScreen;