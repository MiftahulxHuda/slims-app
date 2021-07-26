import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Label from '../components/label/Label';
import FormLabel from '../components/label/FormLabel';

const Stack = createStackNavigator();

function LabelScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Label"
                component={Label}
            />
            <Stack.Screen
                name="FormLabel"
                component={FormLabel}
            />
        </Stack.Navigator>
    );
}

export default LabelScreen;