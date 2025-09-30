import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

import WelcomeScreen from './screens/Welcome';
import CreateAccountPage from './screens/CreateAccountPage';
import LogInPage from './screens/LogInPage';
import Navbar from './components/Navbar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CreateAccountPage" component={CreateAccountPage} />
          <Stack.Screen name="LogInPage" component={LogInPage} />
          <Stack.Screen name="Main" component={Navbar} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}