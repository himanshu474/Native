import { User } from '../types';

// Mock users — one per role so we can test all 3 dashboards
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Sarah Johnson',
    email: 'parent@mentora.com',
    role: 'parent',
  },
  {
    id: 'u2',
    name: 'Alex Thompson',
    email: 'student@mentora.com',
    role: 'student',
  },
  {
    id: 'u3',
    name: 'Dr. Maya Patel',
    email: 'mentor@mentora.com',
    role: 'mentor',
  },
];

// Quick lookup by email — used by auth service
export const getUserByEmail = (email: string): User | undefined =>
  mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());