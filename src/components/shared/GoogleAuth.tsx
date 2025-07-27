import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';
import { Button } from '../ui/button';

export default function GoogleAuth() {
  const navigate = useNavigate();
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
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Ошибка авторизации через Google');
      console.error('Google auth error:', error.message);
    }
  };

  return (
    <Button className="hover:scale-105 hover:shadow-md" onClick={handleGoogleLogin}>
      Войти через Google
    </Button>
  );
}
