import * as React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Bibliography from '../components/Bibliography';

const Stack = createNativeStackNavigator();

export function BibliographyScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bibliography" component={Bibliography} />
    </Stack.Navigator>
  );
}