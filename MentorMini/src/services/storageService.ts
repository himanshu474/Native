import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const KEYS = {
  USER: '@mentora:user',
  TOKEN: '@mentora:token',
} as const;

export const storageService = {
  async saveAuth(user: User, token: string): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem(KEYS.USER, JSON.stringify(user)),
      AsyncStorage.setItem(KEYS.TOKEN, token),
    ]);
  },

  async loadAuth(): Promise<{ user: User; token: string } | null> {
    const [userJson, token] = await Promise.all([
      AsyncStorage.getItem(KEYS.USER),
      AsyncStorage.getItem(KEYS.TOKEN),
    ]);

    if (!userJson || !token) return null;

    try {
      const user = JSON.parse(userJson) as User;
      return { user, token };
    } catch {
      // Corrupted storage — treat as logged out
      await storageService.clearAuth();
      return null;
    }
  },

  async clearAuth(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(KEYS.USER),
      AsyncStorage.removeItem(KEYS.TOKEN),
    ]);
  },
};