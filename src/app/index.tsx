import { Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const polls = [1, 2, 3];

const App = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Polls',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={polls}
        renderItem={() => (
          <View style={styles.pollContainer}>
            <Text style={styles.pollTitle}>Example poll question</Text>
          </View>
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
