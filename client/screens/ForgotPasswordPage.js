import React from 'react';
import { View, Button, Linking, StyleSheet } from 'react-native';

export default function ForgotPasswordPage() {
  const handleReset = () => {
    // This is the correct hosted reset password URL
    Linking.openURL('https://funny-camel-38.clerk.accounts.dev/sign-in/forgot-password');
  };

  return (
    <View style={styles.container}>
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
