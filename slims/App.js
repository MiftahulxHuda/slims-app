import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { BibliographyScreen } from './src/screens/BibliographyScreen';
import { DRAWER_ITEMS } from './src/commons/DrawerItems';
import DrawerContent from './src/screens/DrawerContent.js';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent drawerItems={DRAWER_ITEMS} {...props} />}>
        <Drawer.Screen name="Bibliography" component={BibliographyScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}