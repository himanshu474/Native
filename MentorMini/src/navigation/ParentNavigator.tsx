;import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParentStackParamList } from './types';

// Placeholder imports — we'll build each screen in upcoming steps
import { ParentDashboard } from '../screens/Parent/ParentDashboard';
import { CreateStudentScreen } from '../screens/Parent/CreateStudentScreen';
import { LessonsListScreen } from '../screens/shared/LessonListScreen';
import { SessionsListScreen } from '../screens/shared/SessionListScreen';
import { SessionDetailScreen } from '../screens/shared/SessionDetailScreen';

const Stack = createNativeStackNavigator<ParentStackParamList>();

export const ParentNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
      <Stack.Screen name="CreateStudent" component={CreateStudentScreen} />
      <Stack.Screen name="LessonsList" component={LessonsListScreen} />
      <Stack.Screen name="SessionsList" component={SessionsListScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    </Stack.Navigator>
  );
};