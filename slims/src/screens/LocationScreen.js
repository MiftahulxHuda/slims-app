import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Location from '../components/location/Location';
import FormLocation from '../components/location/FormLocation';

const Stack = createStackNavigator();

function LocationScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Location"
                component={Location}
            />
            <Stack.Screen
                name="FormLocation"
                component={FormLocation}
            />
        </Stack.Navigator>
    );
}

export default LocationScreen;