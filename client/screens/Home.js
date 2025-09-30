
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../colors';
// Puedes cambiar el nombre del archivo si quieres otra imagen
import logo from '../assets/Extreme_fit_new_logo-07.png';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { SignOutButton } from '../components/SignOutButton';

export default function HomeScreen() {
  const { user } = useUser();
  return (
    <View style={styles.screen}>
      <Text style={styles.screenTitle}>🏠 Home</Text>
      {/* Imagen centrada en la pantalla */}
      <Image source={logo} style={styles.centerImage} resizeMode="contain" />
      <SignedIn>
        <Text style={styles.screenText}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Text style={styles.screenText}>Welcome to Extreme Fit</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <Link href="/(auth)/sign-in">
            <Text style={{ color: Colors.darkText }}>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text style={{ color: Colors.darkText }}>Sign up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 10,
  },
  centerImage: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  screenText: {
    fontSize: 18,
    color: Colors.mutedText,
    textAlign: 'center',
  },
});