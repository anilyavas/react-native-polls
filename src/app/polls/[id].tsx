import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>details: {id}</Text>
    </View>
  );
};

export default PollDetails;
const styles = StyleSheet.create({});
