import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import Public from '../pages/Public';
import Tabs from './Tabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='Landing' component={Landing} />
        <Screen name='Public' component={Public} />
        <Screen name='Tabs' component={Tabs} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
