// src/services/firebase/auth.service.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { auth } from './index';

export class AuthService {
  /**
   * Регистрация пользователя с email и паролем
   */
  static async registerWithEmail(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Вход пользователя с email и паролем
   */
  static async loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Вход с помощью Google
   */
  static async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  /**
   * Выход пользователя
   */
  static async logout(): Promise<void> {
    return signOut(auth);
  }

  /**
   * Получение текущего пользователя
   */
  static getCurrentUser() {
    return auth.currentUser;
  }
}
