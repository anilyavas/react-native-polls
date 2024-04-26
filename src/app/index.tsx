import { Stack } from 'expo-router';
import { Text, StyleSheet, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];

const App = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Polls',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Link href={'/polls/new'} asChild>
              <Entypo name='squared-plus' color='white' size={20} />
            </Link>
          ),
        }}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={polls}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>
              {item.id} Example poll question
            </Text>
          </Link>
        )}
      />
    </>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  pollTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
