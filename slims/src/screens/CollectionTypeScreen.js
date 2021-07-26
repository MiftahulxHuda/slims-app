import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CollectionType from '../components/collection_type/CollectionType';
import FormCollectionType from '../components/collection_type/FormCollectionType';

const Stack = createStackNavigator();

function CollectionTypeScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="CollectionType"
                component={CollectionType}
            />
            <Stack.Screen
                name="FormCollectionType"
                component={FormCollectionType}
            />
        </Stack.Navigator>
    );
}

export default CollectionTypeScreen;