import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentStackParamList } from './types';

import { StudentDashboard } from '../screens/Student/StudentDashboard';
import { LessonsListScreen } from '../screens/shared/LessonListScreen';
import { SessionsListScreen } from '../screens/shared/SessionListScreen';
import { SessionDetailScreen } from '../screens/shared/SessionDetailScreen';

const Stack = createNativeStackNavigator<StudentStackParamList>();

export const StudentNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="LessonsList" component={LessonsListScreen} />
      <Stack.Screen name="SessionsList" component={SessionsListScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    </Stack.Navigator>
  );
};