

import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined; 
}

// Parent Stack
export type ParentStackParamList = {
  ParentDashboard: undefined;
  CreateStudent: undefined;
  StudentLessons: { studentId: string; studentName: string };
  LessonDetail: { lessonId: string };
  SessionDetail: { sessionId: string; lessonId?: string }; // Optional params
};

// Student Stack
export type StudentStackParamList = {
  StudentDashboard: undefined;
  LessonsList: undefined;
  LessonDetail: { lessonId: string };
  SessionDetail: { sessionId: string };
};

// Mentor Stack
export type MentorStackParamList = {
  MentorDashboard: undefined;
  StudentLessons: { studentId: string; studentName: string };
  LessonDetail: { lessonId: string };
  SessionDetail: { sessionId: string };
};

// Root Stack - Combines all navigators
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Parent: NavigatorScreenParams<ParentStackParamList>;
  Student: NavigatorScreenParams<StudentStackParamList>;
  Mentor: NavigatorScreenParams<MentorStackParamList>;
};

// Type for navigation prop
export type RootStackNavigationProp = 
  import('@react-navigation/stack').StackNavigationProp<RootStackParamList>;

// Type for route prop
export type RootStackRouteProp<T extends keyof RootStackParamList> = 
  import('@react-navigation/stack').StackNavigationProp<RootStackParamList, T>;