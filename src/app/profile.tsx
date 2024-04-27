import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const ProfileScreen = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>User id: {user?.id}</Text>

      <Button title='Sign out' onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {},
});
