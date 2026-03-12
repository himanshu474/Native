import { Student } from '../types';

// Using a mutable array so CreateStudent can push to it at runtime
// In a real app this would be a database — here it simulates persistent state
export let mockStudents: Student[] = [
  {
    id: 's1',
    parentId: 'u1',
    name: 'Liam',
    surname: 'Johnson',
    email: 'liam@mentora.com',
    dateOfBirth: '2012-03-15',
  },
  {
    id: 's2',
    parentId: 'u1',
    name: 'Emma',
    surname: 'Johnson',
    email: 'emma@mentora.com',
    dateOfBirth: '2014-07-22',
  },
  {
    id: 's3',
    parentId: 'u1',
    name: 'Noah',
    surname: 'Johnson',
    email: 'noah@mentora.com',
    dateOfBirth: '2010-11-08',
  },
];

// Mentor u3 is assigned these same students
export const mentorStudentMap: Record<string, string[]> = {
  u3: ['s1', 's2', 's3'],
};