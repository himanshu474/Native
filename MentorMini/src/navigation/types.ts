import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';


export type AuthStackParamList = {
  Login: undefined;
};

export type ParentStackParamList = {
  ParentDashboard: undefined;
  CreateStudent: undefined;
  LessonsList: { studentId: string; studentName: string };
  SessionsList: { lessonId: string; lessonTitle: string; studentName: string };
  SessionDetail: { sessionId: string; topic: string };
};

export type StudentStackParamList = {
  StudentDashboard: undefined;
  LessonsList: { studentId: string; studentName: string };
  SessionsList: { lessonId: string; lessonTitle: string; studentName: string };
  SessionDetail: { sessionId: string; topic: string };
};

export type MentorStackParamList = {
  MentorDashboard: undefined;
  LessonsList: { studentId: string; studentName: string };
  SessionsList: { lessonId: string; lessonTitle: string; studentName: string };
  SessionDetail: { sessionId: string; topic: string };
};

// Convenience types — use these in your screen components
// instead of the verbose generic syntax every time

// Auth
export type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

// Parent
export type ParentDashboardNavProp = NativeStackNavigationProp<ParentStackParamList, 'ParentDashboard'>;
export type CreateStudentNavProp = NativeStackNavigationProp<ParentStackParamList, 'CreateStudent'>;

// Shared screen nav props (used across all 3 role navigators)
export type LessonsListRouteProp = RouteProp<ParentStackParamList, 'LessonsList'>;
export type SessionsListRouteProp = RouteProp<ParentStackParamList, 'SessionsList'>;
export type SessionDetailRouteProp = RouteProp<ParentStackParamList, 'SessionDetail'>;