import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Frequency from '../components/frequency/Frequency';
import FormFrequency from '../components/frequency/FormFrequency';

const Stack = createStackNavigator();

function FrequencyScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Frequency"
                component={Frequency}
            />
            <Stack.Screen
                name="FormFrequency"
                component={FormFrequency}
            />
        </Stack.Navigator>
    );
}

export default FrequencyScreen;