import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignUp, useUser } from '@clerk/clerk-expo'; // useUser added to check existing session
import { SignOutButton } from '../components/SignOutButton';

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useUser(); // check if user is already signed in

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Redirect signed-in users automatically
  React.useEffect(() => {
    if (isSignedIn) {
      navigation.replace('Main');
    }
  }, [isSignedIn]);

  const validateInputs = () => {
    if (!emailAddress.includes('@')) {
      setErrorMessage('Please enter a valid email');
      return false;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const onSignUpPress = async () => {
    if (!isLoaded || loading) return;
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      setErrorMessage(err.errors?.[0]?.longMessage || 'Sign-up failed');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || loading) return;
    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.replace('Main');
      } else {
        setErrorMessage('Verification incomplete. Check your code.');
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      setErrorMessage(err.errors?.[0]?.longMessage || 'Verification failed');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Verify your email</Text>
          {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={onVerifyPress} disabled={loading}>
            {loading ? <ActivityIndicator /> : <Text>Verify</Text>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Sign up</Text>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignUpPress} disabled={loading}>
          {loading ? <ActivityIndicator /> : <Text>Continue</Text>}
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('LogInPage')}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <SignOutButton />
        </View>
      </View>
    </SafeAreaView>
  );
}
