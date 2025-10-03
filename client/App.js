import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

import WelcomeScreen from './screens/Welcome';
import CreateAccountPage from './screens/CreateAccountPage';
import LogInPage from './screens/LogInPage';
import Navbar from './components/Navbar';
import ForgotPasswordPage from './screens/ForgotPasswordPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      frontendApi={process.env.EXPO_PUBLIC_CLERK_FRONTEND_API} // <--- Add this
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} // optional, if you want
    >
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CreateAccountPage" component={CreateAccountPage} />
          <Stack.Screen name="LogInPage" component={LogInPage} />
          <Stack.Screen name="Main" component={Navbar} />
          <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}
