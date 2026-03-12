import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonStudent } from './SkeletonStudent';
import { SkeletonLesson } from './SkeletonLesson';
import { SkeletonSession } from './SkeletonSession';


type SkeletonType = 'student' | 'lesson' | 'session';

interface SkeletonListProps {
  type: SkeletonType;
  count?: number;
}

const SKELETON_MAP: Record<SkeletonType, React.FC> = {
  student: SkeletonStudent,
  lesson: SkeletonLesson,
  session: SkeletonSession,
};

export const SkeletonList: React.FC<SkeletonListProps> = ({
  type,
  count = 4,
}) => {
  const SkeletonItem = SKELETON_MAP[type];

  return (
     <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
       
        <View key={i} style={{ opacity: 1 }}>
          <SkeletonItem />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
});