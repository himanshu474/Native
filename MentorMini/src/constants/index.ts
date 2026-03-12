// constants/index.ts
// WHY: Screen names as constants (for autocomplete and avoiding typos)
// These match the keys in navigation.types.ts

export const SCREENS = {
  // Auth
  LOGIN: 'Login' as const,
  
  // Parent
  PARENT_DASHBOARD: 'ParentDashboard' as const,
  CREATE_STUDENT: 'CreateStudent' as const,
  STUDENT_LESSONS: 'StudentLessons' as const,
  
  // Student
  STUDENT_DASHBOARD: 'StudentDashboard' as const,
  LESSONS_LIST: 'LessonsList' as const,
  LESSON_DETAIL: 'LessonDetail' as const,
  SESSION_DETAIL: 'SessionDetail' as const,
  
  // Mentor
  MENTOR_DASHBOARD: 'MentorDashboard' as const,
} as const;

// Type from constants (derived from SCREENS)
export type ScreenName = typeof SCREENS[keyof typeof SCREENS];
export * from '../types/navigation.types';
