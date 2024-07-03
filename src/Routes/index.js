import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Pages/Home/home';
import Book from '../Pages/Book';
import Chapter from '../Pages/Chapter';
import CompareVerses from '../Pages/CompareVerses';
import About from '../Pages/About';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Book"
          component={Book}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chapter"
          component={Chapter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompareVerses"
          component={CompareVerses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
