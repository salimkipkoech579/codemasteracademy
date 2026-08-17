import { User, Certificate, AuditLog } from '../types';

export const INITIAL_MOCK_USER: User = {
  id: 'usr-student-77',
  name: 'Alex Johnson',
  email: 'alex.johnson@codemaster.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  role: 'student',
  xp: 3450,
  streakDays: 12,
  rank: 'Full-Stack Developer Level 4',
  badges: [
    {
      id: 'b1',
      name: 'Async Master',
      description: 'Completed JS Promises & Async/Await Course',
      icon: 'Zap',
      unlockedAt: '2026-07-15',
    },
    {
      id: 'b2',
      name: 'Cyber Sentinel',
      description: 'Passed Security OWASP Top 10 Lab',
      icon: 'ShieldCheck',
      unlockedAt: '2026-07-28',
    },
    {
      id: 'b3',
      name: '10-Day Streak',
      description: 'Coded 10 consecutive days',
      icon: 'Flame',
      unlockedAt: '2026-07-30',
    },
  ],
  enrolledCourseIds: ['js-modern-pro', 'react-fullstack-19', 'python-core-backend', 'security-owasp-top10'],
  completedLessonIds: ['js-1', 'sec-1'],
  bookmarkedLessonIds: ['js-2', 'react-1'],
  isTwoFactorEnabled: true,
  isEmailVerified: true,
  subscriptionPlan: 'pro_annual',
  joinedDate: 'Jan 2026',
};

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-88910',
    courseId: 'js-modern-pro',
    courseTitle: 'Modern JavaScript ES6+ & Async Mastery',
    studentName: 'Alex Johnson',
    issueDate: 'July 28, 2026',
    verificationId: 'CMA-JS-2026-88910',
    instructorSignature: 'Dr. Sarah Lin',
  },
  {
    id: 'cert-88911',
    courseId: 'security-owasp-top10',
    courseTitle: 'Web Application Security & Defensive Lab',
    studentName: 'Alex Johnson',
    issueDate: 'July 30, 2026',
    verificationId: 'CMA-SEC-2026-88911',
    instructorSignature: 'Viktor Kane',
  },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    userEmail: 'alex.johnson@codemaster.edu',
    action: '2FA Verification Passed',
    ipAddress: '192.168.1.102',
    timestamp: '2026-08-01 12:45:10',
    severity: 'info',
  },
  {
    id: 'log-2',
    userEmail: 'admin@codemaster.academy',
    action: 'Coupon CODEMASTER50 Created',
    ipAddress: '10.0.4.15',
    timestamp: '2026-08-01 11:20:00',
    severity: 'info',
  },
  {
    id: 'log-3',
    userEmail: 'unknown@attacker.com',
    action: 'Failed Login Attempt (Rate-limited)',
    ipAddress: '45.14.12.89',
    timestamp: '2026-08-01 09:14:22',
    severity: 'warning',
  },
];
