import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const poll = {
  question: 'React Native vs Flutter?',
  options: ['React Native FTW', 'Flutter', 'SwiftUI'],
};

const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedVariable, setSelectedVariable] = useState('');

  const vote = () => {
    console.warn('voted', selectedVariable);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Poll' }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option) => (
          <Pressable
            onPress={() => setSelectedVariable(option)}
            key={option}
            style={styles.optionContainer}
          >
            <Feather
              name={option === selectedVariable ? 'check-circle' : 'circle'}
              size={18}
              color={option === selectedVariable ? 'green' : 'grey'}
            />
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>
      <Button title='Vote' onPress={vote} />
    </View>
  );
};

export default PollDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
