import { Lesson, Session } from '../types';
import { mockLessons } from '../data/lessons';
import { mockSessions } from '../data/sessions';

const simulateDelay = (ms = 600): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const lessonService = {
  async getLessons(): Promise<Lesson[]> {
    await simulateDelay();
    return mockLessons;
  },

  async getSessionsByLesson(lessonId: string): Promise<Session[]> {
    await simulateDelay();
    return mockSessions
      .filter((s) => s.lessonId === lessonId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      // Most recent sessions first — always sort at the service layer, not the UI
  },

  async getSessionById(sessionId: string): Promise<Session | null> {
    await simulateDelay(400);
    return mockSessions.find((s) => s.id === sessionId) ?? null;
  },
};