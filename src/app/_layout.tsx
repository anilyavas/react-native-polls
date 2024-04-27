import { Stack } from 'expo-router';
import AuthProvider from '../providers/AuthProvider';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default RootLayout;
