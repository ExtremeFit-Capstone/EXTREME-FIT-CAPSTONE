import React from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native'; // useNavigation instead of useRouter

export default function LogInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const navigation = useNavigation(); // get navigation object

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // Redirect if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigation.replace('Main'); // use navigation.replace for signed-in redirect
    }
  }, [isSignedIn]);

  const onSignInPress = async () => {
    if (!isLoaded || loading) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        navigation.replace('Main');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setErrorMessage('Sign-in incomplete. Check your credentials.');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage(err.errors?.[0]?.longMessage || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Sign in</Text>
      {errorMessage ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text> : null}

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        style={{ width: '80%', marginVertical: 5, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={{ width: '80%', marginVertical: 5, borderWidth: 1, padding: 8 }}
      />

      <TouchableOpacity
        onPress={onSignInPress}
        disabled={loading}
        style={{ marginVertical: 10, padding: 10, backgroundColor: 'lightblue', width: '80%', alignItems: 'center' }}
      >
        {loading ? <ActivityIndicator /> : <Text>Continue</Text>}
      </TouchableOpacity>

      {/* Forgot Password link */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('ForgotPasswordPage')} // Navigate to forgot password screen
        style={{ marginTop: 10 }}
      >
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
