import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Bibliography from '../components/bibliography/Bibliography';
import FormBibliography from '../components/bibliography/FormBibliography';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailBibliography from '../components/bibliography/DetailBibliography';

const Stack = createStackNavigator();

function BibliographyScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="Bibliography"
        component={Bibliography}
      // options={
      //   ({ navigation }) => ({
      //     headerLeft: (props) => (
      //       <TouchableOpacity>
      //         <Icon
      //           name="bars"
      //           size={20}
      //           onPress={() => navigation.toggleDrawer()}
      //         />
      //       </TouchableOpacity>
      //     ),
      //     headerLeftContainerStyle: {
      //       left: 16
      //     },
      //     // headerTitle: props => <LogoTitle {...props} />
      //   })
      // }
      />
      <Stack.Screen
        name="FormBibliography"
        component={FormBibliography}
      />
      <Stack.Screen
        name="DetailBibliography"
        component={DetailBibliography}
      />
    </Stack.Navigator>
  );
}

export default BibliographyScreen;