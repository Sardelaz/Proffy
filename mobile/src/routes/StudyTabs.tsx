import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from "../pages/TeacherList";
import Favorites from "../pages/Favorites";

const Tab = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabBarIconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        tabBarLabelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        tabBarInactiveBackgroundColor: '#fafafc',
        tabBarActiveBackgroundColor: '#ebebf5',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarActiveTintColor: '#32264d',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="TeacherList" 
        component={TeacherList} 
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="easel" size={18} color={focused ? '#8257e5' : color} /> 
          ),
          headerShown: false, 
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="heart" size={18} color={focused ? '#8257e5' : color} /> 
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default StudyTabs;
