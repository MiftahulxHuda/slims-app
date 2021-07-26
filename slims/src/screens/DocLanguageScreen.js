import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DocLanguage from '../components/doc_language/DocLanguage';
import FormDocLanguage from '../components/doc_language/FormDocLanguage';

const Stack = createStackNavigator();

function DocLanguageScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Doclanguage"
                component={DocLanguage}
            />
            <Stack.Screen
                name="FormDocLanguage"
                component={FormDocLanguage}
            />
        </Stack.Navigator>
    );
}

export default DocLanguageScreen;