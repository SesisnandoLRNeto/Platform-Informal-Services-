import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Favorites from '../pages/Favorites';
import WorkList from '../pages/WorkList';

const { Navigator, Screen } = createBottomTabNavigator();

function Tabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#9ddbad',
        activeTintColor: '#20a4f3',
      }}
    >
      <Screen
        name='WorkList'
        component={WorkList}
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name='ios-easel'
                size={size}
                color={focused ? '#20a4f3' : color}
              />
            );
          },
        }}
      />

      <Screen
        name='Favorites'
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name='ios-heart'
                size={size}
                color={focused ? '#20a4f3' : color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
}

export default Tabs;
