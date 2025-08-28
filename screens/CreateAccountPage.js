import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Colors from '../colors';
// Puedes cambiar el nombre del archivo si quieres otra imagen
import logo from '../assets/Extreme_fit_new_logo-10.png';

export default function CreateAccountPage({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // Aquí iría la lógica de validación y registro
    alert('Account created!');
    navigation && navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View contentContainerStyle={styles.container}>
        <Image source={logo} style={styles.centerImage} resizeMode='contain' />
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
          <Text style={styles.linkText}>Back to Welcome</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.mainColor,
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  input: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: Colors.whiteBackground,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.lightBorder,
    alignSelf: 'center',
    textAlign: 'left',
  },
  button: {
    backgroundColor: Colors.mainColor,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.whiteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: Colors.mainColor,
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    width: '100%',
  },
  centerImage: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    marginTop: 10,
  },
});
