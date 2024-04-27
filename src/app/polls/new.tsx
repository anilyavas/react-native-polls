import { Redirect, Stack, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const { user } = useAuth();

  const createPoll = async () => {
    setError('');
    if (!question) {
      setError('Please provide the question');
    }
    const validOptions = options.filter((o) => !!o);
    if (validOptions.length < 2) {
      setError('Please provide at least 2 valid options');
      return;
    }

    const { data, error } = await supabase
      .from('polls')
      .insert([{ question, options: validOptions }])
      .select();
    if (error) {
      Alert.alert('Failed to create the poll');
      return;
    }
    router.back();
  };

  if (!user) {
    return <Redirect href={'/login'} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Create Poll',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
        placeholder='Type your question here'
      />
      <Text style={styles.label}>Options</Text>
      {options.map((option, index) => (
        <View key={index} style={{ justifyContent: 'center' }}>
          <TextInput
            value={option}
            onChangeText={(text) => {
              const updated = [...options];
              updated[index] = text;
              setOptions(updated);
            }}
            style={styles.input}
            placeholder={`Option ${index + 1}`}
          />
          <Feather
            onPress={() => {
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
            name='x'
            size={18}
            color='grey'
            style={{ position: 'absolute', right: 10 }}
          />
        </View>
      ))}
      <Button title='Add option' onPress={() => setOptions([...options, ''])} />

      <Button title='Create Poll' onPress={createPoll} />
      <Text style={{ color: 'crimson' }}>{error}</Text>
    </View>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  label: {
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
