import { Stack } from 'expo-router';
import AuthProvider from '../providers/AuthProvider';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='(auth)' options={{ title: 'Login' }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
