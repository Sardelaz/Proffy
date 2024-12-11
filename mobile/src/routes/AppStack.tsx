import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import BeAProffy from '../pages/BeAProffy';
import StudyTabs from './StudyTabs';

import { RootStackParamList } from '../@types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Landing" 
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="GiveClasses" component={GiveClasses} />
        <Stack.Screen name="BeAProffy" component={BeAProffy} />
        <Stack.Screen name="Study" component={StudyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
