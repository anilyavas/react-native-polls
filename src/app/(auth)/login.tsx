import React, { useState } from 'react';
import { Alert, StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Stack } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <Text style={styles.title}>Sign in or Create an account</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title='Sign in'
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title='Sign up'
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: '500',
  },
});
