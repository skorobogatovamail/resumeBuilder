// src/services/firebase/__tests__/auth.service.test.ts
import { AuthService } from '../auth.service';
import { auth } from '../index';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Мокаем модули firebase/auth
jest.mock('../index', () => ({
  auth: {
    currentUser: { uid: 'test-user-id' },
  },
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({
    addScope: jest.fn(),
  })),
  signInWithPopup: jest.fn(),
}));

describe('AuthService', () => {
  const mockUserCredential = { user: { uid: 'test-user-id' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerWithEmail', () => {
    it('should call createUserWithEmailAndPassword with correct parameters', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);

      // Act
      const result = await AuthService.registerWithEmail(email, password);

      // Assert
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
      expect(result).toEqual(mockUserCredential);
    });

    it('should throw an error when registration fails', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      const error = new Error('Registration failed');
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(AuthService.registerWithEmail(email, password)).rejects.toThrow(
        'Registration failed',
      );
    });
  });

  describe('loginWithEmail', () => {
    it('should call signInWithEmailAndPassword with correct parameters', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);

      // Act
      const result = await AuthService.loginWithEmail(email, password);

      // Assert
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
      expect(result).toEqual(mockUserCredential);
    });

    it('should throw an error when login fails', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      const error = new Error('Login failed');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(AuthService.loginWithEmail(email, password)).rejects.toThrow('Login failed');
    });
  });

  describe('loginWithGoogle', () => {
    it('should call signInWithPopup with GoogleAuthProvider', async () => {
      // Arrange
      const mockProvider = {};
      (GoogleAuthProvider as jest.Mock).mockReturnValueOnce(mockProvider);
      (signInWithPopup as jest.Mock).mockResolvedValueOnce(mockUserCredential);

      // Act
      const result = await AuthService.loginWithGoogle();

      // Assert
      expect(GoogleAuthProvider).toHaveBeenCalled();
      expect(signInWithPopup).toHaveBeenCalledWith(auth, mockProvider);
      expect(result).toEqual(mockUserCredential);
    });

    it('should throw an error when Google login fails', async () => {
      // Arrange
      const error = new Error('Google login failed');
      (signInWithPopup as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(AuthService.loginWithGoogle()).rejects.toThrow('Google login failed');
    });
  });

  describe('logout', () => {
    it('should call signOut with auth', async () => {
      // Arrange
      (signOut as jest.Mock).mockResolvedValueOnce(undefined);

      // Act
      await AuthService.logout();

      // Assert
      expect(signOut).toHaveBeenCalledWith(auth);
    });

    it('should throw an error when logout fails', async () => {
      // Arrange
      const error = new Error('Logout failed');
      (signOut as jest.Mock).mockRejectedValueOnce(error);

      // Act & Assert
      await expect(AuthService.logout()).rejects.toThrow('Logout failed');
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user', () => {
      // Act
      const result = AuthService.getCurrentUser();

      // Assert
      expect(result).toEqual({ uid: 'test-user-id' });
    });
  });
});
