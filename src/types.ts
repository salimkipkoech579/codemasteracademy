export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  xp: number;
  streakDays: number;
  rank: string;
  badges: Badge[];
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  isTwoFactorEnabled: boolean;
  isEmailVerified: boolean;
  subscriptionPlan: 'free' | 'pro_monthly' | 'pro_annual' | 'lifetime';
  joinedDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'DevOps' | 'Cybersecurity' | 'Languages' | 'Databases';
  description: string;
  icon: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  totalCourses: number;
  tags: string[];
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LessonExercise {
  id: string;
  prompt: string;
  language: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'interactive' | 'quiz' | 'project';
  videoUrl?: string;
  contentMarkdown: string;
  codeSnippet?: string;
  language?: string;
  exercise?: LessonExercise;
  quizQuestions?: QuizQuestion[];
  isCompleted?: boolean;
  isBookmarked?: boolean;
}

export interface Course {
  id: string;
  title: string;
  pathId: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  ratingCount: number;
  studentCount: number;
  duration: string;
  description: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  iconName: string;
  badgeColor: string;
  lessons: Lesson[];
  prerequisites?: string[];
  skillsLearned?: string[];
}

export interface PracticeChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  description: string;
  initialCode: string;
  language: string;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  solutionExplanation?: string;
}

export interface ProjectAssignment {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  featuresToBuild: string[];
  starterCode: string;
  demoUrl?: string;
  submittedUrl?: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'approved';
  gradeScore?: number;
  feedback?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issueDate: string;
  verificationId: string;
  instructorSignature: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotes: number;
  repliesCount: number;
  createdAt: string;
  isSolved?: boolean;
  replies?: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    createdAt: string;
    isInstructor?: boolean;
  }[];
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  codeSnippet?: string;
  timestamp: string;
  category?: 'general' | 'explanation' | 'debug' | 'quiz' | 'review';
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  validUntil: string;
  usedCount: number;
  maxUses: number;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  userEmail: string;
  action: string;
  ipAddress: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}

export interface CreatorChannel {
  id: string;
  name: string;
  category: string;
  youtubeUrl: string;
  subscribers: string;
  description: string;
  topics: string[];
  avatarUrl: string;
  isOfficialChannel?: boolean;
  badge?: string;
  recommendedPlaylists: {
    title: string;
    url: string;
    level: string;
  }[];
}

export interface ExternalResource {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  iconName: string;
  type: 'docs' | 'interactive' | 'roadmap' | 'community';
  badge: string;
}

