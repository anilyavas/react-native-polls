import { Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const { user } = useAuth();

  const createPoll = () => {};

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
