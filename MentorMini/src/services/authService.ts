import { User } from '../types';
import { getUserByEmail } from '../data/users';

interface LoginResponse {
  user: User;
  token: string;
}

// interface LoginError {
//   message: string;
// }

const simulateDelay = (ms = 900): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    await simulateDelay();

    const user = getUserByEmail(email);

    if (!user) {
      throw new Error('No account found with that email address.');
    }

    if (!password || password.length < 3) {
      throw new Error('Invalid password.');
    }

    return {
      user,
      token: `mock-token-${user.id}-${Date.now()}`,
    };
  },
};