import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Supplier from '../components/supplier/Supplier';
import FormSupplier from '../components/supplier/FormSupplier';

const Stack = createStackNavigator();

function SupplierScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Subject"
                component={Supplier}
            />
            <Stack.Screen
                name="FormSupplier"
                component={FormSupplier}
            />
        </Stack.Navigator>
    );
}

export default SupplierScreen;