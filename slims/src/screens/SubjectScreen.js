import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Subject from '../components/subject/Subject';
import FormSubject from '../components/subject/FormSubject';

const Stack = createStackNavigator();

function SubjectScreen() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Subject"
                component={Subject}
            />
            <Stack.Screen
                name="FormSubject"
                component={FormSubject}
            />
        </Stack.Navigator>
    );
}

export default SubjectScreen;