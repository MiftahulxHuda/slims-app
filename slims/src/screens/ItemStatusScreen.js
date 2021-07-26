import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ItemStatus from '../components/item_status/ItemStatus';
import FormItemStatus from '../components/item_status/FormItemStatus';

const Stack = createStackNavigator();

function ItemStatusScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="ItemStatus"
                component={ItemStatus}
            />
            <Stack.Screen
                name="FormItemStatus"
                component={FormItemStatus}
            />
        </Stack.Navigator>
    );
}

export default ItemStatusScreen;