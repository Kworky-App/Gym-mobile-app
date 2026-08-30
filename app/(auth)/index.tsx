import AuthLogin from '@/features/auth/AuthLogin';
import { useAuthGuard } from '@/features/auth/useAuthGuard';

const Login = () => {
  const { isReady, isAuthenticated } = useAuthGuard();

  if (!isReady || isAuthenticated) return null;

  return <AuthLogin />;
};

export default Login;
