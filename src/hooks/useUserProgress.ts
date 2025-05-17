import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, increment, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface UserProgress {
  selectedLanguage: string;
  completedLessons: string[];
  totalScore: number;
  lastLogin: string;
  streak: number;
  dailyGoal: number;
  weeklyProgress: number;
  achievements: Achievement[];
  currentLesson: string | null;
  lastLessonDate: string | null;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export const useUserProgress = () => {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!currentUser) {
        setProgress(null);
        setLoading(false);
        return;
      }

      try {
        const progressDoc = await getDoc(doc(db, 'userProgress', currentUser.uid));
        if (progressDoc.exists()) {
          setProgress(progressDoc.data() as UserProgress);
        }
      } catch (err) {
        setError('Failed to fetch user progress');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [currentUser]);

  const updateSelectedLanguage = async (language: string) => {
    if (!currentUser) return;

    try {
      await updateDoc(doc(db, 'userProgress', currentUser.uid), {
        selectedLanguage: language,
        lastLessonDate: new Date().toISOString()
      });
      setProgress(prev => prev ? { ...prev, selectedLanguage: language } : null);
    } catch (err) {
      setError('Failed to update selected language');
      console.error(err);
    }
  };

  const completeLesson = async (lessonId: string, score: number) => {
    if (!currentUser) return;

    try {
      const now = new Date().toISOString();
      await updateDoc(doc(db, 'userProgress', currentUser.uid), {
        completedLessons: arrayUnion(lessonId),
        totalScore: increment(score),
        lastLessonDate: now,
        weeklyProgress: increment(score),
        streak: increment(1)
      });

      // Check for achievements
      await checkAndUpdateAchievements(lessonId, score);

      setProgress(prev => {
        if (!prev) return null;
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
          totalScore: prev.totalScore + score,
          lastLessonDate: now,
          weeklyProgress: prev.weeklyProgress + score,
          streak: prev.streak + 1
        };
      });
    } catch (err) {
      setError('Failed to update lesson completion');
      console.error(err);
    }
  };

  const checkAndUpdateAchievements = async (lessonId: string, score: number) => {
    if (!currentUser) return;

    try {
      const achievementsRef = collection(db, 'achievements');
      const userAchievementsRef = doc(db, 'achievements', currentUser.uid);
      const userAchievementsDoc = await getDoc(userAchievementsRef);

      if (userAchievementsDoc.exists()) {
        const userAchievements = userAchievementsDoc.data();
        const newAchievements = [];

        // Check for completion achievements
        if (userAchievements.progress.completedLessons + 1 === 10) {
          newAchievements.push({
            id: 'first_10',
            name: 'Getting Started',
            description: 'Complete 10 lessons',
            icon: '🎯',
            unlockedAt: new Date().toISOString()
          });
        }

        // Check for score achievements
        if (userAchievements.progress.totalScore + score >= 1000) {
          newAchievements.push({
            id: 'score_1000',
            name: 'Score Master',
            description: 'Reach 1000 points',
            icon: '🏆',
            unlockedAt: new Date().toISOString()
          });
        }

        if (newAchievements.length > 0) {
          await updateDoc(userAchievementsRef, {
            unlocked: arrayUnion(...newAchievements),
            progress: {
              completedLessons: increment(1),
              totalScore: increment(score)
            }
          });
        }
      }
    } catch (err) {
      console.error('Error updating achievements:', err);
    }
  };

  const resetDailyProgress = async () => {
    if (!currentUser) return;

    try {
      await updateDoc(doc(db, 'userProgress', currentUser.uid), {
        dailyGoal: 100,
        weeklyProgress: 0
      });
      setProgress(prev => prev ? { ...prev, dailyGoal: 100, weeklyProgress: 0 } : null);
    } catch (err) {
      setError('Failed to reset daily progress');
      console.error(err);
    }
  };

  return {
    progress,
    loading,
    error,
    updateSelectedLanguage,
    completeLesson,
    resetDailyProgress
  };
}; 