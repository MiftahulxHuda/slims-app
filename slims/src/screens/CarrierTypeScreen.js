import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CarrierType from '../components/carrier_type/CarrierType';
import FormCarrierType from '../components/carrier_type/FormCarrierType';

const Stack = createStackNavigator();

function CarrierTypeScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="CarrierType"
                component={CarrierType}
            />
            <Stack.Screen
                name="FormCarrierType"
                component={FormCarrierType}
            />
        </Stack.Navigator>
    );
}

export default CarrierTypeScreen;