import { Stack, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Poll, Vote } from '../../types/db';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';

const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedVariable, setSelectedVariable] = useState('');
  const [poll, setPoll] = useState<Poll>(null);
  const { user } = useAuth();
  const [userVote, setUserVote] = useState<Vote>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log('fetching');

      let { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', Number.parseInt(id))
        .single();

      if (error) {
        Alert.alert('Error fetching data');
      }
      setPoll(data);
    };

    const fetchUserVote = async () => {
      let { data, error } = await supabase
        .from('vote')
        .select('*')
        .eq('poll_id', Number.parseInt(id))
        .eq('user_id', user.id)
        .limit(1)
        .single();

      setUserVote(data);
      if (data) {
        setSelectedVariable(data.option);
      }
    };

    fetchPolls();
    fetchUserVote();
  }, []);

  const vote = async () => {
    const newVote = {
      option: selectedVariable,
      poll_id: poll.id,
      user_id: user.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }
    const { data, error } = await supabase
      .from('vote')
      .upsert([newVote])
      .select()
      .single();
    if (error) {
      Alert.alert('Failed to vote');
    } else {
      setUserVote(data);
      Alert.alert('Thank you for your vote');
    }
  };

  if (!poll) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Poll',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
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
