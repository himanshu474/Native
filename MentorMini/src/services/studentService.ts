import { Student } from '../types';
import { mockStudents, mentorStudentMap } from '../data/student';

const simulateDelay = (ms = 600): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Used to generate unique IDs for new students
// In production this comes from the database
const generateId = (): string =>
  `s${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

export const studentService = {
  async getStudentsByParent(parentId: string): Promise<Student[]> {
    await simulateDelay();
    return mockStudents.filter((s) => s.parentId === parentId);
  },

  async getStudentsByMentor(mentorId: string): Promise<Student[]> {
    await simulateDelay();
    const studentIds = mentorStudentMap[mentorId] ?? [];
    return mockStudents.filter((s) => studentIds.includes(s.id));
  },

  async createStudent(
    data: Omit<Student, 'id'> & { parentId: string }
  ): Promise<Student> {
    await simulateDelay(1000); // Slightly longer — simulates a POST request

    const newStudent: Student = {
      id: generateId(),
      ...data,
    };

    // Mutates the array — simulates the database being updated
    mockStudents.push(newStudent);

    return newStudent;
  },
};