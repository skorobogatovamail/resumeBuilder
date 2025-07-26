import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';

export default function GoogleAuth() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    provider.addScope('profile');
    provider.addScope('email');

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      await signInWithPopup(auth, provider);
      toast.success('Вход через Google выполнен успешно');
    } catch (error: any) {
      toast.error('Ошибка авторизации через Google');
      console.error('Google auth error:', error.message);
    }
  };

  return <Button onClick={handleGoogleLogin}>Войти через Google</Button>;
}
