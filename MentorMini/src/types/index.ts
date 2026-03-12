// 📝 Architecture Reasoning:
// Centralized types = single source of truth.
// If a User type changes, you update ONE file, not 10.

export type UserRole = 'parent' | 'student' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Student {
  id: string;
  parentId: string;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;  
password?: string;

}

export interface Lesson {
  id: string;
  title: string;          // "Mathematics", "Physics"
  subject: string;
  iconName: string;       // For displaying subject icon
  color: string;          // Subject accent color
}

export interface Session {
  id: string;
  lessonId: string;
  date: string;           // ISO format
  topic: string;
  summary: string;
}

// Navigation params — we'll expand this in the navigation step
export type RootStackParamList = {
  Login: undefined;
  ParentDashboard: undefined;
  StudentDashboard: undefined;
  MentorDashboard: undefined;
  CreateStudent: undefined;
  LessonsList: { studentId: string };
  SessionsList: { lessonId: string; lessonTitle: string };
  SessionDetail: { sessionId: string };
};