import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MentorStackParamList } from './types';

import { MentorDashboard } from '../screens/Mentor/MentorDashboard';
import { LessonsListScreen } from '../screens/shared/LessonListScreen';
import { SessionsListScreen } from '../screens/shared/SessionListScreen';
import { SessionDetailScreen } from '../screens/shared/SessionDetailScreen';

const Stack = createNativeStackNavigator<MentorStackParamList>();

export const MentorNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MentorDashboard" component={MentorDashboard} />
      <Stack.Screen name="LessonsList" component={LessonsListScreen} />
      <Stack.Screen name="SessionsList" component={SessionsListScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    </Stack.Navigator>
  );
};