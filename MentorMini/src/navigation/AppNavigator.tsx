import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { ParentNavigator } from './ParentNavigator';
import { StudentNavigator } from './StudentNavigator';
import { MentorNavigator } from './MentorNavigator';
import { Loader } from '../components';
import { colors } from '../theme';

export const AppNavigator: React.FC = () => {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();

 
  if (isLoadingAuth) {
    return (
      <View style={styles.splash}>
        <Loader message="Restoring session..." fullScreen />
      </View>
    );
  }

  const renderNavigator = () => {
    if (!isAuthenticated || !user) return <AuthNavigator />;
    switch (user.role) {
      case 'parent':  return <ParentNavigator />;
      case 'student': return <StudentNavigator />;
      case 'mentor':  return <MentorNavigator />;
      default:        return <AuthNavigator />;
    }
  };

  return (
    <NavigationContainer>
      {renderNavigator()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.background.screen,
  },
});