import { LearningPath, Course, PracticeChallenge, ProjectAssignment, ForumPost, Coupon, CreatorChannel, ExternalResource } from '../types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering Masterclass',
    category: 'Frontend',
    description: 'Master HTML5, CSS Grid, Modern JavaScript ES6+, TypeScript, React 19, Vue 3, Tailwind CSS, and Next.js.',
    icon: 'Layout',
    duration: '40 Hours',
    level: 'All Levels',
    totalCourses: 8,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind'],
    featured: true,
  },
  {
    id: 'backend',
    title: 'Backend Systems & API Architecture',
    category: 'Backend',
    description: 'Build scalable microservices with Node.js, Express, NestJS, Python FastAPI, Django, Go, and PostgreSQL.',
    icon: 'Server',
    duration: '55 Hours',
    level: 'Intermediate',
    totalCourses: 7,
    tags: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI', 'Go', 'REST APIs'],
    featured: true,
  },
  {
    id: 'fullstack',
    title: 'Full Stack Software Engineer',
    category: 'Full Stack',
    description: 'End-to-end development covering Auth, REST/GraphQL, Databases, Payment Gateways, WebSockets, and Cloud CI/CD.',
    icon: 'Layers',
    duration: '80 Hours',
    level: 'All Levels',
    totalCourses: 10,
    tags: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Stripe', 'Docker', 'Vercel'],
    featured: true,
  },
  {
    id: 'devops',
    title: 'DevOps, Cloud & Infrastructure',
    category: 'DevOps',
    description: 'Containerization with Docker, Orchestration with Kubernetes, CI/CD with GitHub Actions, Nginx, and AWS.',
    icon: 'Cloud',
    duration: '35 Hours',
    level: 'Intermediate',
    totalCourses: 5,
    tags: ['Docker', 'Kubernetes', 'Linux', 'Nginx', 'GitHub Actions', 'AWS'],
    featured: false,
  },
  {
    id: 'cybersecurity',
    title: 'Web Security & Defensive Hacking',
    category: 'Cybersecurity',
    description: 'Understand OWASP Top 10, Prevent XSS, SQLi, CSRF, JWT Security, Encryption, Hashing, and Secure Code Audit.',
    icon: 'ShieldCheck',
    duration: '30 Hours',
    level: 'Intermediate',
    totalCourses: 4,
    tags: ['OWASP', 'JWT', 'Encryption', 'XSS', 'SQLi', 'HTTPS', 'Security Audits'],
    featured: true,
  },
  {
    id: 'languages',
    title: 'Polyglot Developer Foundations',
    category: 'Languages',
    description: 'Deep dive into Python, Java, C++, C#, Go, Rust, Ruby, PHP, Kotlin, Swift, Dart, SQL, and Bash script automation.',
    icon: 'Code2',
    duration: '90 Hours',
    level: 'All Levels',
    totalCourses: 18,
    tags: ['Python', 'Java', 'C++', 'Go', 'Rust', 'SQL', 'Bash'],
    featured: false,
  },
];

export const COURSES: Course[] = [
  {
    id: 'js-modern-pro',
    title: 'Modern JavaScript ES6+ & Async Mastery',
    pathId: 'frontend',
    category: 'Frontend',
    level: 'Beginner',
    rating: 4.9,
    ratingCount: 1240,
    studentCount: 8520,
    duration: '8.5 Hours',
    description: 'Master closures, event loop, promises, async/await, DOM manipulation, functional paradigms, and ES2024 features.',
    badgeColor: 'from-amber-500 to-yellow-600',
    iconName: 'FileCode2',
    author: {
      name: 'Dr. Sarah Lin',
      title: 'Principal Engineer at ExaTech',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    prerequisites: ['Basic HTML & CSS knowledge'],
    skillsLearned: ['ES6 Syntax & Destructuring', 'Promises & Async/Await', 'Event Loop & Scope', 'DOM & Fetch API'],
    lessons: [
      {
        id: 'js-1',
        courseId: 'js-modern-pro',
        title: '1. Variables, Scope & Hoisting (let, const, var)',
        duration: '15 mins',
        type: 'interactive',
        contentMarkdown: `### Understanding Scope and Hoisting in JavaScript

JavaScript uses lexical scope. The modern variable keywords \`let\` and \`const\` provide block scope and temporal dead zones, replacing block-leaking \`var\`.

#### Key Rules:
1. **const**: Read-only reference binding. Reassignment throws a \`TypeError\`.
2. **let**: Block-scoped mutable declaration.
3. **var**: Function-scoped or globally-scoped, subject to hoisting initializations to \`undefined\`.

\`\`\`javascript
function calculateScore(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}
\`\`\`
`,
        codeSnippet: `// Try modifying and running this code:
const prices = [19.99, 45.50, 12.00];

function calculateTotal(arr) {
  let total = 0;
  for (let price of arr) {
    total += price;
  }
  return total.toFixed(2);
}

console.log("Total Price: $" + calculateTotal(prices));`,
        language: 'javascript',
        exercise: {
          id: 'ex-js-1',
          prompt: 'Write a function `filterHighScores(scores, threshold)` that returns an array of scores greater than the threshold using `const` and `let`.',
          language: 'javascript',
          starterCode: `function filterHighScores(scores, threshold) {\n  // Your code here\n}\n\nconsole.log(filterHighScores([85, 92, 45, 78, 99], 80));`,
          solutionCode: `function filterHighScores(scores, threshold) {\n  const result = [];\n  for (let score of scores) {\n    if (score > threshold) {\n      result.push(score);\n    }\n  }\n  return result;\n}\n\nconsole.log(filterHighScores([85, 92, 45, 78, 99], 80));`,
          hints: ['Use an array to store filtered numbers', 'Use for...of loop to iterate scores'],
        },
        quizQuestions: [
          {
            id: 'q-js-1',
            question: 'What happens if you try to reassign a variable declared with `const`?',
            options: ['It updates silently', 'It throws a TypeError', 'It converts to let automatically', 'It returns undefined'],
            correctAnswerIndex: 1,
            explanation: 'Variables declared with const create immutable bindings. Reassignment throws a TypeError at runtime.',
          },
        ],
      },
      {
        id: 'js-2',
        courseId: 'js-modern-pro',
        title: '2. Asynchronous JavaScript: Promises & Async/Await',
        duration: '25 mins',
        type: 'interactive',
        contentMarkdown: `### Asynchronous Execution & Microtasks

Async/Await provides clean syntax over Promises. Promises represent values that will complete in the future, categorized by pending, fulfilled, or rejected states.

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}
\`\`\`
`,
        codeSnippet: `async function simulateApiCall() {
  console.log("1. Fetching data...");
  const data = await new Promise(resolve => {
    setTimeout(() => resolve({ status: 200, message: "Connected to CodeMaster Server!" }), 1000);
  });
  console.log("2. Response received:", data.message);
}

simulateApiCall();`,
        language: 'javascript',
      },
    ],
  },
  {
    id: 'python-core-backend',
    title: 'Python 3.12 Backend & Data Processing',
    pathId: 'languages',
    category: 'Languages',
    level: 'Beginner',
    rating: 4.8,
    ratingCount: 2100,
    studentCount: 12400,
    duration: '10 Hours',
    description: 'Learn Python syntax, OOP, list comprehensions, file handling, type hinting, and building RESTful microservices.',
    badgeColor: 'from-blue-500 to-indigo-600',
    iconName: 'Code',
    author: {
      name: 'Marcus Vance',
      title: 'Senior Python Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    skillsLearned: ['Python Syntax & Data Structures', 'Object-Oriented Programming (OOP)', 'List Comprehensions', 'Type Annotations'],
    lessons: [
      {
        id: 'py-1',
        courseId: 'python-core-backend',
        title: '1. Python Essentials & List Comprehensions',
        duration: '20 mins',
        type: 'interactive',
        contentMarkdown: `### Pythonic Data Manipulations

List comprehensions provide a concise way to create lists based on existing lists or iterables.

\`\`\`python
# Standard Loop vs List Comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
print(evens) # Output: [2, 4, 6, 8, 10]
\`\`\`
`,
        codeSnippet: `# Interactive Python snippet
def process_grades(scores):
    passing = [s for s in scores if s >= 70]
    average = sum(passing) / len(passing) if passing else 0
    return len(passing), round(average, 2)

count, avg = process_grades([88, 92, 54, 76, 61, 95])
print(f"Passed: {count}, Average Grade: {avg}")`,
        language: 'python',
      },
    ],
  },
  {
    id: 'react-fullstack-19',
    title: 'React 19, Server Components & Hooks Mastery',
    pathId: 'frontend',
    category: 'Frontend',
    level: 'Intermediate',
    rating: 4.95,
    ratingCount: 3100,
    studentCount: 15800,
    duration: '12 Hours',
    description: 'Build modern React applications with hooks, state management, custom hooks, context, memoization, and performance tuning.',
    badgeColor: 'from-cyan-500 to-blue-600',
    iconName: 'Atom',
    author: {
      name: 'Elena Rostova',
      title: 'React Core Contributor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    },
    skillsLearned: ['React 19 Hooks', 'State & Effect Lifecycle', 'Context API & Redux Toolkit', 'Performance Optimization'],
    lessons: [
      {
        id: 'react-1',
        courseId: 'react-fullstack-19',
        title: '1. React State & Effect Guidelines',
        duration: '20 mins',
        type: 'interactive',
        contentMarkdown: `### Clean React Hooks Usage

Never update state directly inside the component body. Keep dependency arrays stable to avoid infinite re-renders.

\`\`\`tsx
import { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`
`,
        codeSnippet: `// React Component pattern
import React, { useState } from 'react';

export default function InteractiveBox() {
  const [active, setActive] = useState(false);
  
  return (
    <div style={{
      padding: '20px',
      background: active ? '#2563eb' : '#1e293b',
      color: '#ffffff',
      borderRadius: '8px',
      cursor: 'pointer'
    }} onClick={() => setActive(!active)}>
      {active ? '⚡ State Active (Click to Toggle)' : '💤 Idle State (Click Me)'}
    </div>
  );
}`,
        language: 'javascript',
      },
    ],
  },
  {
    id: 'devops-docker-k8s',
    title: 'Docker, Microservices & Kubernetes Deployment',
    pathId: 'devops',
    category: 'DevOps',
    level: 'Intermediate',
    rating: 4.85,
    ratingCount: 980,
    studentCount: 5400,
    duration: '9 Hours',
    description: 'Containerize node/python apps with multi-stage Dockerfiles, compose multi-container setups, and deploy to Kubernetes.',
    badgeColor: 'from-sky-500 to-indigo-700',
    iconName: 'Container',
    author: {
      name: 'Alex Rivera',
      title: 'DevOps & Site Reliability Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    skillsLearned: ['Multi-stage Dockerfiles', 'Docker Compose Networking', 'Kubernetes Deployments', 'CI/CD Pipelines'],
    lessons: [
      {
        id: 'docker-1',
        courseId: 'devops-docker-k8s',
        title: '1. Production Dockerfiles for Node.js & React',
        duration: '25 mins',
        type: 'article',
        contentMarkdown: `### Multi-Stage Docker Build Strategy

Use multi-stage builds to produce lightweight, secure container images for production.

\`\`\`dockerfile
# Stage 1: Build Phase
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`
`,
      },
    ],
  },
  {
    id: 'security-owasp-top10',
    title: 'Web Application Security & Defensive Lab',
    pathId: 'cybersecurity',
    category: 'Cybersecurity',
    level: 'Intermediate',
    rating: 4.92,
    ratingCount: 1450,
    studentCount: 6800,
    duration: '11 Hours',
    description: 'Hands-on defensive security labs preventing SQL Injection, Cross-Site Scripting (XSS), CSRF, JWT tampering, and broken authorization.',
    badgeColor: 'from-emerald-500 to-teal-700',
    iconName: 'ShieldAlert',
    author: {
      name: 'Viktor Kane',
      title: 'Principal Security Researcher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
    skillsLearned: ['Preventing SQL Injection with Parameterized Queries', 'Sanitizing Input against XSS', 'Secure JWT Cookie Storage', 'Content Security Policy (CSP)'],
    lessons: [
      {
        id: 'sec-1',
        courseId: 'security-owasp-top10',
        title: '1. Preventing SQL Injection & Parametric Binding',
        duration: '30 mins',
        type: 'interactive',
        contentMarkdown: `### Defensive SQL Querying

Never concatenate user inputs directly into SQL strings. Always use parameterized queries or trusted ORMs.

#### Vulnerable Code (DO NOT USE):
\`\`\`sql
-- Vulnerable to ' OR '1'='1
SELECT * FROM users WHERE email = '\${req.body.email}' AND password = '\${req.body.password}';
\`\`\`

#### Secure Parameterized Query:
\`\`\`typescript
// Node.js PG client
const text = 'SELECT id, email, role FROM users WHERE email = $1 AND password_hash = $2';
const values = [email, hashedPassword];
const result = await client.query(text, values);
\`\`\`
`,
        codeSnippet: `// Interactive SQL Injection Security Demo
function testSecurity(userInput) {
  // Unsafe query simulation
  const unsafeQuery = "SELECT * FROM users WHERE username = '" + userInput + "';";
  
  // Safe query simulation with parameterization
  const safeQuery = "SELECT * FROM users WHERE username = $1; -- Param: " + JSON.stringify([userInput]);
  
  console.log("Unsafe Query Output:\\n", unsafeQuery);
  console.log("\\nSafe Parameterized Query Output:\\n", safeQuery);
}

testSecurity("admin' OR '1'='1");`,
        language: 'javascript',
      },
    ],
  },
  {
    id: 'sql-database-mastery',
    title: 'PostgreSQL, MySQL & SQL Optimization',
    pathId: 'databases',
    category: 'Databases',
    level: 'Beginner',
    rating: 4.88,
    ratingCount: 1890,
    studentCount: 9200,
    duration: '10 Hours',
    description: 'Learn SQL syntax, complex JOINs, GROUP BY aggregations, indexing strategies, transactions, and relational database schema design.',
    badgeColor: 'from-purple-500 to-indigo-700',
    iconName: 'Database',
    author: {
      name: 'Maria Santos',
      title: 'Database Architect & Administrator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    skillsLearned: ['Complex SQL JOINs & CTEs', 'Database Normalization', 'B-Tree Indexing Strategies', 'ACID Transactions & Locking'],
    lessons: [
      {
        id: 'sql-1',
        courseId: 'sql-database-mastery',
        title: '1. Relational Queries & Joins',
        duration: '20 mins',
        type: 'interactive',
        contentMarkdown: `### SQL INNER JOIN and Aggregation

\`\`\`sql
SELECT u.name, COUNT(o.id) as total_orders, SUM(o.amount) as total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
HAVING SUM(o.amount) > 100
ORDER BY total_spent DESC;
\`\`\`
`,
        codeSnippet: `-- Interactive SQL simulation query
SELECT 
    courses.title, 
    COUNT(enrollments.student_id) AS total_students,
    AVG(enrollments.quiz_score) AS average_score
FROM courses
JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.title
ORDER BY total_students DESC;`,
        language: 'sql',
      },
    ],
  },
];

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 'chal-1',
    title: 'Two Sum Algorithm',
    difficulty: 'Easy',
    category: 'Data Structures & Algorithms',
    points: 50,
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    language: 'javascript',
    initialCode: `function twoSum(nums, target) {
  // Your code here
  return [];
}

// Test call
console.log(twoSum([2, 7, 11, 15], 9));`,
    testCases: [
      { input: '[2, 7, 11, 15], target: 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], target: 6', expectedOutput: '[1, 2]' },
    ],
    solutionExplanation: 'Use a Hash Map to store complement values (target - currentNum) and their indices for O(N) time complexity.',
  },
  {
    id: 'chal-2',
    title: 'Palindrome Validator',
    difficulty: 'Easy',
    category: 'Strings',
    points: 30,
    description: 'Write a function that checks if a string is a valid palindrome, ignoring spaces and non-alphanumeric characters.',
    language: 'javascript',
    initialCode: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));`,
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: '"race a car"', expectedOutput: 'false' },
    ],
  },
  {
    id: 'chal-3',
    title: 'JWT Security Signature Verifier',
    difficulty: 'Medium',
    category: 'Cybersecurity',
    points: 100,
    description: 'Parse a JWT string into header, payload, and signature components, and check if the signature format is non-empty.',
    language: 'javascript',
    initialCode: `function parseJwtComponents(jwtString) {
  const parts = jwtString.split('.');
  if (parts.length !== 3) return { valid: false };
  return {
    valid: true,
    header: parts[0],
    payload: parts[1],
    hasSignature: parts[2].length > 0
  };
}

console.log(parseJwtComponents("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.s3cr3tsig"));`,
    testCases: [
      { input: 'JWT Token string', expectedOutput: '{ valid: true, ... }' },
    ],
  },
];

export const PROJECT_ASSIGNMENTS: ProjectAssignment[] = [
  {
    id: 'proj-1',
    title: 'Full Stack E-Commerce Engine',
    category: 'Full Stack',
    difficulty: 'Advanced',
    description: 'Build a production-grade store with React frontend, Node.js API, PostgreSQL database, Stripe payment intent integration, and JWT auth.',
    featuresToBuild: [
      'User Registration & Role Authorization (Customer vs Admin)',
      'Product Filtering, Search & Cart State Persistence',
      'Stripe Payment Gateway API Endpoint',
      'Order Status & Real-time Delivery Webhooks',
    ],
    starterCode: `// E-Commerce Server Starter
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/checkout', (req, res) => {
  res.json({ success: true, message: "Checkout initialized" });
});

app.listen(3000);`,
    status: 'in_progress',
  },
  {
    id: 'proj-2',
    title: 'Real-Time AI Code Reviewer Bot',
    category: 'AI & Full Stack',
    difficulty: 'Intermediate',
    description: 'Create a web application that takes code inputs in Python/JS, sends them to Gemini server-side API, and displays security, performance, and formatting recommendations.',
    featuresToBuild: [
      'Syntax Highlighting Code Editor Component',
      'Server-side Gemini 3.6 Flash Integration for Code Review',
      'Categorized Feedback Badges (Security, Syntax, Speed)',
    ],
    starterCode: `// AI Code Review Endpoint
app.post('/api/review', async (req, res) => {
  const { code, language } = req.body;
  // Gemini review logic
});`,
    status: 'approved',
    gradeScore: 98,
    feedback: 'Excellent implementation of server-side proxy and clean markdown parsing!',
  },
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    authorName: 'David Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Student',
    title: 'How do I handle CORS errors when calling Express API from React Vite client?',
    content: 'I keep getting `Access-Control-Allow-Origin` header missing errors when attempting to fetch from localhost:3000 to my Vite dev server. What is the best configuration?',
    category: 'Full Stack',
    tags: ['Express', 'CORS', 'React', 'Vite'],
    upvotes: 18,
    repliesCount: 3,
    createdAt: '2 hours ago',
    isSolved: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        content: 'Hi David! If you use express in server.ts with Vite middleware as taught in CodeMaster Academy, you can proxy requests via `/api/*` routes or use `app.use(cors())`. Alternatively, configure `server.proxy` in `vite.config.ts`.',
        createdAt: '1 hour ago',
        isInstructor: true,
      },
    ],
  },
  {
    id: 'post-2',
    authorName: 'Samantha Reed',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Student',
    title: 'Which language should I start with: Python or JavaScript?',
    content: 'I want to build web apps and also get into automation. Should I start with JavaScript or Python?',
    category: 'Career & Languages',
    tags: ['Python', 'JavaScript', 'BeginnerAdvice'],
    upvotes: 34,
    repliesCount: 5,
    createdAt: '5 hours ago',
  },
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'CODEMASTER50',
    discountPercent: 50,
    validUntil: '2026-12-31',
    usedCount: 142,
    maxUses: 500,
    isActive: true,
  },
  {
    id: 'c-2',
    code: 'PRODEV2026',
    discountPercent: 30,
    validUntil: '2026-09-01',
    usedCount: 88,
    maxUses: 200,
    isActive: true,
  },
];

export const CREATOR_CHANNELS: CreatorChannel[] = [
  {
    id: 'victor-kipkoech',
    name: 'Victor Kipkoech (@kipkoechvictor-hn2eo)',
    category: 'Featured Platform Founder Channel',
    youtubeUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
    subscribers: 'Official Creator',
    description: 'Official YouTube channel of Victor Kipkoech. Subscribe, like, and comment to follow tutorials, engineering insights, project updates, and coding guides!',
    topics: ['Full-Stack Development', 'React & TypeScript', 'Software Engineering', 'Code Walkthroughs', 'Tech Insights'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isOfficialChannel: true,
    badge: '★ Official Creator Channel',
    recommendedPlaylists: [
      { title: 'Subscribe & Support Victor Kipkoech Channel', url: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5', level: 'Official Channel' },
      { title: 'Latest Code Walkthroughs & Tech Videos', url: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5', level: 'All Videos' }
    ]
  },
  {
    id: 'cs50',
    name: 'CS50 by Harvard University',
    category: '1. Programming Fundamentals',
    youtubeUrl: 'https://www.youtube.com/@cs50',
    subscribers: '1.8M+',
    description: "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
    topics: ['C', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'Web Development'],
    avatarUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'CS50x: Introduction to Computer Science', url: 'https://www.youtube.com/playlist?list=PLhQjrBD2V381L3iZyDTxJhD20186vA-19', level: 'Beginner' },
      { title: 'CS50 Web Programming with Python and JavaScript', url: 'https://www.youtube.com/playlist?list=PLhQjrBD2V380X1R63S312eIneP6OinRzA', level: 'Intermediate' }
    ]
  },
  {
    id: 'fcc',
    name: 'freeCodeCamp.org',
    category: '8. Full-Stack & General',
    youtubeUrl: 'https://www.youtube.com/@freecodecamp',
    subscribers: '10.2M+',
    description: 'Learn to code for free with full-length courses on HTML, CSS, JS, Python, SQL, Cybersecurity, AI, and DevOps.',
    topics: ['Full-Stack', 'JavaScript', 'Python', 'Databases', 'Cybersecurity', 'AI & ML', 'DevOps'],
    avatarUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Full Stack Web Development Course 2026', url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk', level: 'All Levels' },
      { title: 'Data Structures and Algorithms in Python', url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA', level: 'Intermediate' }
    ]
  },
  {
    id: 'mosh',
    name: 'Programming with Mosh',
    category: '1. Programming Fundamentals',
    youtubeUrl: 'https://www.youtube.com/@programmingwithmosh',
    subscribers: '3.9M+',
    description: 'Clear, concise, and structured programming tutorials for beginners and professional software engineers.',
    topics: ['Python', 'JavaScript', 'C#', 'SQL', 'React', 'Node.js', 'Data Structures'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Python Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', level: 'Beginner' },
      { title: 'JavaScript Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', level: 'Beginner' }
    ]
  },
  {
    id: 'kevinpowell',
    name: 'Kevin Powell (CSS Expert)',
    category: '2. HTML & CSS',
    youtubeUrl: 'https://www.youtube.com/@KevinPowell',
    subscribers: '950K+',
    description: 'Deep dives into modern CSS layouts, Flexbox, CSS Grid, container queries, animation, and responsive web design.',
    topics: ['CSS Grid', 'Flexbox', 'Responsive Design', 'Tailwind CSS', 'CSS Animations', 'Container Queries'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'CSS Grid Crash Course & Layout Secrets', url: 'https://www.youtube.com/playlist?list=PL4-IK0AVhVjM0xE0K2uX05I5S8168K54L', level: 'All Levels' },
      { title: 'Conquering Responsive Layouts', url: 'https://www.youtube.com/playlist?list=PL4-IK0AVhVjMSbA94L42v1J0P620kI8m2', level: 'Intermediate' }
    ]
  },
  {
    id: 'traversymedia',
    name: 'Traversy Media',
    category: '8. Full-Stack Development',
    youtubeUrl: 'https://www.youtube.com/@TraversyMedia',
    subscribers: '2.2M+',
    description: 'Brad Traversy provides practical project-based tutorials on web development, Node.js, React, Docker, and Git.',
    topics: ['HTML/CSS', 'JavaScript', 'Node.js', 'Express', 'Databases', 'Docker', 'Git & GitHub'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Web Development In 2026 Roadmap', url: 'https://www.youtube.com/watch?v=u72H_zA0y38', level: 'Beginner' },
      { title: 'Node.js & Express API Masterclass', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', level: 'Intermediate' }
    ]
  },
  {
    id: 'netninja',
    name: 'The Net Ninja',
    category: '4. React & Frontend',
    youtubeUrl: 'https://www.youtube.com/@NetNinja',
    subscribers: '1.3M+',
    description: 'Shaun Pelling offers step-by-step video courses on React, Vue, Next.js, Node.js, Firebase, and TypeScript.',
    topics: ['React 19', 'Next.js App Router', 'TypeScript', 'Node.js', 'Firebase', 'Vue 3'],
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'React 19 Complete Tutorial', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d', level: 'Beginner' },
      { title: 'Next.js 15 App Router Crash Course', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J25Q9GRB_Z5232i3', level: 'Intermediate' }
    ]
  },
  {
    id: 'wds',
    name: 'Web Dev Simplified',
    category: '3. JavaScript',
    youtubeUrl: 'https://www.youtube.com/@WebDevSimplified',
    subscribers: '1.6M+',
    description: 'Kyle Cook simplifies complex web development topics, JavaScript concepts, React hooks, and clean architecture.',
    topics: ['JavaScript ES6+', 'React Hooks', 'CSS Tricks', 'State Management', 'Clean Code'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'JavaScript Concepts Simplified', url: 'https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDXw', level: 'Intermediate' },
      { title: 'Learn React in 30 Minutes', url: 'https://www.youtube.com/watch?v=hQAHSlTtTzg', level: 'Beginner' }
    ]
  },
  {
    id: 'academind',
    name: 'Academind',
    category: '4. React & Frontend',
    youtubeUrl: 'https://www.youtube.com/@academind',
    subscribers: '920K+',
    description: 'Maximilian Schwarzmüller shares deep dives into React, Next.js, Flutter, Vue, and Full-Stack Engineering.',
    topics: ['React', 'Next.js', 'Node.js', 'Flutter', 'Vue', 'Docker'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'React.js The Complete Guide', url: 'https://www.youtube.com/watch?v=Dorf8i6lCuk', level: 'All Levels' }
    ]
  },
  {
    id: 'codevolution',
    name: 'Codevolution',
    category: '4. React & Frontend',
    youtubeUrl: 'https://www.youtube.com/@Codevolution',
    subscribers: '650K+',
    description: 'Vishwas provides comprehensive tutorials on React, Next.js, Redux Toolkit, React Query, and Angular.',
    topics: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'React Query'],
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'React Testing Library & Jest', url: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwirqe1K475T012_0-1283-a', level: 'Intermediate' }
    ]
  },
  {
    id: 'davegray',
    name: 'Dave Gray',
    category: '5. Backend Development',
    youtubeUrl: 'https://www.youtube.com/@DaveGrayTeachesCode',
    subscribers: '380K+',
    description: 'In-depth, beginner to advanced courses on Node.js, Express, MongoDB, PostgreSQL, Python, and React.',
    topics: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'FastAPI', 'JWT Auth'],
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Node.js & Express Course for Beginners', url: 'https://www.youtube.com/watch?v=f2EqECiTBL8', level: 'Beginner' }
    ]
  },
  {
    id: 'hackersploit',
    name: 'HackerSploit',
    category: '9. Cybersecurity',
    youtubeUrl: 'https://www.youtube.com/@HackerSploit',
    subscribers: '1.1M+',
    description: 'Leading cybersecurity and ethical hacking training channel covering penetration testing, secure coding, and Linux security.',
    topics: ['Penetration Testing', 'Secure Coding', 'OWASP Top 10', 'Linux Hardening', 'Network Security'],
    avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Web Application Penetration Testing', url: 'https://www.youtube.com/playlist?list=PLBf0HzazG2C_P_D8X_G3T4-232C0z0x7a', level: 'Advanced' }
    ]
  },
  {
    id: 'johnhammond',
    name: 'John Hammond',
    category: '9. Cybersecurity',
    youtubeUrl: 'https://www.youtube.com/@JohnHammondAudio',
    subscribers: '1.4M+',
    description: 'Cybersecurity research, CTF walk-throughs, malware analysis, and defensive engineering insights.',
    topics: ['Cybersecurity', 'CTF Challenges', 'Secure Architecture', 'Malware Analysis'],
    avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Capture The Flag Walkthroughs', url: 'https://www.youtube.com/playlist?list=PL1H1sBF1VAKVM0OuC9C17O97qj-R77G2l', level: 'Intermediate' }
    ]
  },
  {
    id: 'networkchuck',
    name: 'NetworkChuck',
    category: '9. Cybersecurity & DevOps',
    youtubeUrl: 'https://www.youtube.com/@NetworkChuck',
    subscribers: '3.7M+',
    description: 'Engaging tutorials on networking, CCNA, Python automation, Docker, Linux, and cloud security.',
    topics: ['Networking', 'Linux', 'Docker', 'Python Automation', 'Cloud Security'],
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Python for Hackers & Network Engineers', url: 'https://www.youtube.com/playlist?list=PLIhvCqJh23403aA6d1O', level: 'Beginner' }
    ]
  },
  {
    id: 'nana',
    name: 'TechWorld with Nana',
    category: '10. Docker & DevOps',
    youtubeUrl: 'https://www.youtube.com/@TechWorldwithNana',
    subscribers: '1.1M+',
    description: 'DevOps made easy with Nana. Clear tutorials on Docker, Kubernetes, Terraform, CI/CD, and Cloud Native tools.',
    topics: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Prometheus', 'DevOps Architecture'],
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Docker Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', level: 'Beginner' },
      { title: 'Kubernetes Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', level: 'Intermediate' }
    ]
  },
  {
    id: 'neetcode',
    name: 'NeetCode',
    category: '15. Interview Preparation',
    youtubeUrl: 'https://www.youtube.com/@NeetCode',
    subscribers: '850K+',
    description: 'Clear algorithmic explanations, LeetCode 150 solutions, Data Structures, and System Design interview prep.',
    topics: ['LeetCode 150', 'Data Structures', 'Algorithms', 'System Design', 'Coding Interviews'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Blind 75 LeetCode Solutions', url: 'https://www.youtube.com/playlist?list=PLot-Xpze53ldVwtstagep3xP1N6a0f75e', level: 'All Levels' },
      { title: 'System Design for Beginners', url: 'https://www.youtube.com/playlist?list=PLot-Xpze53lf5eL-R4-w2f3z5j5c3', level: 'Intermediate' }
    ]
  },
  {
    id: 'abdulbari',
    name: 'Abdul Bari',
    category: '15. Interview Preparation',
    youtubeUrl: 'https://www.youtube.com/@abdul_bari',
    subscribers: '890K+',
    description: 'Master Data Structures and Algorithms with visual whiteboard diagrams and rigorous mathematical analysis.',
    topics: ['Data Structures', 'Algorithms', 'Dynamic Programming', 'Graph Theory', 'Time Complexity'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Algorithms Masterclass & Complexity', url: 'https://www.youtube.com/playlist?list=PLAXnLdrL64483S52M9K9I9s6O19c11I7a', level: 'Intermediate' }
    ]
  },
  {
    id: 'deeplearningai',
    name: 'DeepLearningAI',
    category: '14. AI & Machine Learning',
    youtubeUrl: 'https://www.youtube.com/@Deeplearningai',
    subscribers: '580K+',
    description: 'Andrew Ng and leading AI practitioners cover Machine Learning, Deep Learning, LLMs, Prompt Engineering, and GenAI.',
    topics: ['Generative AI', 'LLMs', 'PyTorch', 'TensorFlow', 'Machine Learning', 'AI Agents'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    recommendedPlaylists: [
      { title: 'Generative AI & LLM Engineering', url: 'https://www.youtube.com/playlist?list=PL1T8fO7514838M1_nZ341m_75aJzI', level: 'Intermediate' }
    ]
  }
];

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    category: 'Official Documentation',
    url: 'https://developer.mozilla.org',
    description: 'The definitive, community-maintained documentation for HTML, CSS, JavaScript, Web APIs, and browser compatibility tables.',
    iconName: 'BookOpen',
    type: 'docs',
    badge: 'Essential Docs'
  },
  {
    id: 'roadmap-sh',
    name: 'Roadmap.sh',
    category: 'Career Guidance & Skill Maps',
    url: 'https://roadmap.sh',
    description: 'Community-driven interactive visual roadmaps, guide paths, and skill trees for Frontend, Backend, DevOps, AI, and Cybersecurity.',
    iconName: 'Compass',
    type: 'roadmap',
    badge: 'Interactive Skill Map'
  },
  {
    id: 'freecodecamp-learn',
    name: 'freeCodeCamp Learn',
    category: 'Interactive Curriculum',
    url: 'https://www.freecodecamp.org/learn',
    description: 'Hands-on interactive curriculum with thousands of coding challenges, project certifications, and verified credentials.',
    iconName: 'Code',
    type: 'interactive',
    badge: '100% Free Certs'
  },
  {
    id: 'odin-project',
    name: 'The Odin Project',
    category: 'Full-Stack Curriculum',
    url: 'https://www.theodinproject.com',
    description: 'A complete, open-source full-stack curriculum combining top learning materials with real hands-on portfolio project building.',
    iconName: 'Layers',
    type: 'interactive',
    badge: 'Project-Based'
  },
  {
    id: 'w3schools',
    name: 'W3Schools',
    category: 'Reference & Practice',
    url: 'https://www.w3schools.com',
    description: 'Beginner-friendly web development tutorials, interactive try-it-yourself code editors, and quick syntax lookup tables.',
    iconName: 'Globe',
    type: 'docs',
    badge: 'Quick Reference'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    category: 'Developer Community',
    url: 'https://stackoverflow.com',
    description: 'The world’s largest public Q&A community for software engineers to ask questions, solve bugs, and share knowledge.',
    iconName: 'HelpCircle',
    type: 'community',
    badge: 'Q&A Forum'
  },
  {
    id: 'github-docs',
    name: 'GitHub Docs',
    category: 'Version Control & Actions',
    url: 'https://docs.github.com',
    description: 'Official guides for Git version control, GitHub Actions CI/CD, pull requests, repository security, and CLI commands.',
    iconName: 'Github',
    type: 'docs',
    badge: 'Git & CI/CD'
  }
];

