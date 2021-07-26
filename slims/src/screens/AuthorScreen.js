import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Author from '../components/author/Author';
import FormAuthor from '../components/author/FormAuthor';

const Stack = createStackNavigator();

function AuthorScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Author"
                component={Author}
            />
            <Stack.Screen
                name="FormAuthor"
                component={FormAuthor}
            />
        </Stack.Navigator>
    );
}

export default AuthorScreen;