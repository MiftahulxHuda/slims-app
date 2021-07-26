import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContentType from '../components/content_type/ContentType';
import FormContentType from '../components/content_type/FormContentType';

const Stack = createStackNavigator();

function ContentTypeScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="ContentType"
                component={ContentType}
            />
            <Stack.Screen
                name="FormContentType"
                component={FormContentType}
            />
        </Stack.Navigator>
    );
}

export default ContentTypeScreen;