import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Publisher from '../components/publisher/Publisher';
import FormPublisher from '../components/publisher/FormPublisher';

const Stack = createStackNavigator();

function PublisherScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Publisher"
                component={Publisher}
            />
            <Stack.Screen
                name="FormPublisher"
                component={FormPublisher}
            />
        </Stack.Navigator>
    );
}

export default PublisherScreen;