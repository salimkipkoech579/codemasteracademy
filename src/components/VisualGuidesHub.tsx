import React, { useState } from 'react';
import {
  Code,
  Play,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Search,
  Sparkles,
  Youtube,
  Tv,
  ArrowRight,
  Maximize2,
  X,
  FileCode,
  Workflow,
  Zap,
  HelpCircle,
  Download,
  Info,
  Laptop,
  Check
} from 'lucide-react';

interface LanguageGuide {
  id: string;
  name: string;
  logo: string;
  color: string;
  badgeBg: string;
  tagline: string;
  type: 'Interpreted / Bytecode' | 'JIT Compiled' | 'Compiled to Machine Code';
  howItWorks: {
    title: string;
    description: string;
    steps: {
      step: number;
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  roadmaps: {
    step: number;
    title: string;
    topics: string[];
  }[];
  infographics: {
    id: string;
    title: string;
    subtitle: string;
    category: 'Architecture' | 'Syntax' | 'Data Types' | 'Operators' | 'Control Flow' | 'Functions' | 'Installation' | 'Roadmap';
    summary: string;
    notebookContent?: {
      definition?: string;
      features?: string[];
      types?: { name: string; desc: string }[];
      diagramFlow?: { label: string; desc: string }[];
      tables?: { col1: string; col2: string; col3: string; col4: string }[];
      advantages?: string[];
      codeExamples?: { title: string; code: string }[];
    };
    video: {
      title: string;
      channel: string;
      duration: string;
      views: string;
      thumbnailUrl: string;
      videoUrl: string;
      youtubeId: string;
    };
  }[];
}

const LANGUAGES_DATA: LanguageGuide[] = [
  {
    id: 'python',
    name: 'Python',
    logo: '🐍',
    color: 'from-amber-500 via-yellow-500 to-emerald-500',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    tagline: 'High-Level, Interpreted, Simple Syntax & Versatile',
    type: 'Interpreted / Bytecode',
    howItWorks: {
      title: 'How Python Code Executes Under the Hood',
      description: 'Python converts your source code (.py) into bytecode (.pyc) and executes it on the Python Virtual Machine (PVM).',
      steps: [
        {
          step: 1,
          title: 'Source Code (.py)',
          desc: 'You write human-readable Python code using simple, indentation-based syntax.',
          icon: '📄'
        },
        {
          step: 2,
          title: 'Python Interpreter',
          desc: 'Reads, parses, and checks your code for syntax errors line by line or file by file.',
          icon: '⚙️'
        },
        {
          step: 3,
          title: 'Bytecode Compilation',
          desc: 'Code is compiled into low-level platform-independent instructions (.pyc file).',
          icon: '🧩'
        },
        {
          step: 4,
          title: 'Python Virtual Machine (PVM)',
          desc: 'PVM converts bytecode into host machine instructions and executes them.',
          icon: '💻'
        },
        {
          step: 5,
          title: 'Output / Execution',
          desc: 'Produces program results, UI renders, or API responses.',
          icon: '🎯'
        }
      ]
    },
    roadmaps: [
      { step: 1, title: 'Setup Python Environment', topics: ['Install Python 3.12+', 'VS Code / PyCharm Setup', 'PATH Variable Config'] },
      { step: 2, title: 'Basic Syntax & I/O', topics: ['Variables & Data Types', 'Operators & Expressions', 'print() and input()', 'Comments'] },
      { step: 3, title: 'Control Flow (Logic)', topics: ['if, elif, else', 'for & while loops', 'break, continue, pass'] },
      { step: 4, title: 'Data Structures', topics: ['Lists & Tuples', 'Dictionaries & Sets', 'List Comprehensions'] },
      { step: 5, title: 'Functions & Scope', topics: ['def & return', 'Parameters & Arguments', 'Lambda Functions', 'Scope (LEGB)'] },
      { step: 6, title: 'File Handling & Modules', topics: ['read/write files', 'import built-in modules', 'pip & virtualenv'] },
      { step: 7, title: 'OOP & Error Handling', topics: ['Classes & Objects', 'Inheritance & Polymorphism', 'try/except blocks'] },
      { step: 8, title: 'Practice & Projects', topics: ['Web Scraping', 'Automation Scripts', 'REST APIs with FastAPI/Flask'] },
      { step: 9, title: 'Advance & Specialize', topics: ['Data Science / pandas', 'AI & Machine Learning', 'Django Web Apps'] }
    ],
    infographics: [
      {
        id: 'py-intro',
        title: 'Python Programming Language Overview',
        subtitle: 'Features, How Python Works & Common Applications',
        category: 'Architecture',
        summary: 'Python is a high-level, interpreted language known for clean syntax, cross-platform execution, and extensive standard libraries.',
        notebookContent: {
          definition: 'Python is a high-level, interpreted, general-purpose programming language known for its simple syntax, readability, and versatility.',
          features: [
            'Easy to learn and use for beginners and experts alike',
            'Readable and clean indentation-based syntax',
            'Interpreted language (no manual compile step required)',
            'Cross-platform support (Windows, macOS, Linux)',
            'Extensive standard library ("Batteries Included")',
            'Supports multiple paradigms (Procedural, OOP, Functional)',
            'Huge open-source community and rich ecosystem'
          ],
          diagramFlow: [
            { label: '.py Source Code', desc: 'You write Python script' },
            { label: 'Python Interpreter', desc: 'Reads & checks syntax' },
            { label: 'Bytecode (.pyc)', desc: 'Intermediate instructions' },
            { label: 'Python Virtual Machine (PVM)', desc: 'Executes bytecode' },
            { label: 'Output', desc: 'Produces results' }
          ],
          advantages: [
            'Web Development (Django, FastAPI, Flask)',
            'Data Analysis & Visualization (pandas, NumPy, Matplotlib)',
            'Artificial Intelligence & Machine Learning (TensorFlow, PyTorch)',
            'Automation & Scripting',
            'Game Development & Desktop Apps'
          ]
        },
        video: {
          title: 'Python Programming Language Explained in 10 Minutes',
          channel: 'Kipkoech Victor / CodeMaster Academy',
          duration: '12:45',
          views: '142K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: 'kqtD5dpn9C8'
        }
      },
      {
        id: 'py-roadmap',
        title: 'Python Roadmap for Beginners',
        subtitle: 'Step-by-Step Pathway to Master Python',
        category: 'Roadmap',
        summary: 'A 9-step roadmap taking you from zero programming experience to building real-world Python applications.',
        notebookContent: {
          definition: 'Step-by-step roadmap to go from beginner to confident Python developer.',
          features: [
            '1. Environment Setup: Install Python 3.x, VS Code, run programs',
            '2. Basic Syntax: Variables, data types, operators, input/output',
            '3. Control Flow: if/elif/else, for and while loops, break/continue',
            '4. Data Structures: Lists, Tuples, Sets, Dictionaries',
            '5. Functions: def keyword, parameters, return values, scope',
            '6. File Handling: Read, write, append files safely',
            '7. Modules & Packages: Built-in modules, pip package manager',
            '8. Practice Projects: Small utilities, HackerRank, LeetCode',
            '9. Advance & Specialize: Web Dev, Data Science, AI, Automation'
          ]
        },
        video: {
          title: 'Complete Python Beginner Roadmap 2026',
          channel: 'CodeMaster Academy',
          duration: '18:20',
          views: '210K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=Python+Roadmap+Beginners+Tutorial',
          youtubeId: 'rfscVS0vtbw'
        }
      },
      {
        id: 'py-syntax',
        title: 'Python Syntax & Basic Structure',
        subtitle: 'Comments, Print Statements, Variables & I/O Flow',
        category: 'Syntax',
        summary: 'Master Python indentation, variable declaration, comments, and the basic Input -> Processing -> Storage -> Output model.',
        notebookContent: {
          definition: 'Python syntax refers to the set of rules that define how Python programs are written.',
          codeExamples: [
            {
              title: 'Comments',
              code: '# Single-line comment\n""" Multi-line docstring comment """'
            },
            {
              title: 'Print & Variables',
              code: 'print("Hello, Python!")\nname = "Alice"\nage = 20'
            },
            {
              title: 'Indentation Example',
              code: 'if True:\n    print("Indentation defines code blocks!")'
            },
            {
              title: 'Input Example',
              code: 'user_name = input("Enter your name: ")'
            }
          ],
          diagramFlow: [
            { label: 'Input', desc: 'Receives user data or parameters' },
            { label: 'Processing', desc: 'Works on data with logic & operators' },
            { label: 'Storage', desc: 'Saves data in variables or databases' },
            { label: 'Output', desc: 'Gives results to screen or file' }
          ]
        },
        video: {
          title: 'Python Syntax, Variables & Indentation Deep Dive',
          channel: 'Kipkoech Victor',
          duration: '15:10',
          views: '98K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: 'eWRfhZUzrAc'
        }
      },
      {
        id: 'py-install',
        title: 'Installing Python on Windows & macOS',
        subtitle: 'Step-by-Step Installation & PATH Verification',
        category: 'Installation',
        summary: 'Guide to downloading Python 3.12, checking the PATH environment box, and verifying setup with command line commands.',
        notebookContent: {
          definition: 'How to properly install Python on Windows and macOS.',
          features: [
            'Windows Step 1: Download installer from python.org/downloads/windows/',
            'Windows Step 2: IMPORTANT! Check "Add Python to PATH" before clicking Install Now',
            'Windows Step 3: Open cmd and type `python --version` to verify',
            'macOS Step 1: Download installer from python.org/downloads/macos/',
            'macOS Step 2: Run .pkg setup wizard',
            'macOS Step 3: Open Terminal and type `python3 --version` to verify'
          ]
        },
        video: {
          title: 'How to Install Python & VS Code (Windows & Mac)',
          channel: 'CodeMaster Academy',
          duration: '09:30',
          views: '340K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=How+to+install+python+and+vscode',
          youtubeId: 'YYXdXT2l-Gg'
        }
      },
      {
        id: 'py-datatypes',
        title: 'Python Data Types Guide',
        subtitle: 'Integers, Floats, Strings, Booleans, Lists, Tuples, Sets & Dicts',
        category: 'Data Types',
        summary: 'Data types specify the type of value a variable can store. Python includes built-in primitive and collection types.',
        notebookContent: {
          definition: 'Data types specify the type of value a variable can hold in Python.',
          types: [
            { name: 'Integer (int)', desc: 'Whole numbers, e.g. x = 10' },
            { name: 'Float (float)', desc: 'Decimal numbers, e.g. y = 3.14' },
            { name: 'String (str)', desc: 'Sequence of characters, e.g. name = "Alice"' },
            { name: 'Boolean (bool)', desc: 'True or False, e.g. is_active = True' },
            { name: 'List (list)', desc: 'Ordered, mutable collection, e.g. fruits = ["apple", "banana"]' },
            { name: 'Tuple (tuple)', desc: 'Ordered, immutable collection, e.g. point = (10, 20)' },
            { name: 'Set (set)', desc: 'Unordered collection of unique items, e.g. numbers = {1, 2, 3}' },
            { name: 'Dictionary (dict)', desc: 'Key-value pairs, e.g. person = {"name": "Alice", "age": 20}' }
          ]
        },
        video: {
          title: 'Mastering All Python Data Types in One Video',
          channel: 'Kipkoech Victor',
          duration: '22:15',
          views: '175K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1516116211223-4258568880c6?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: 'cKxRvEZd3Mw'
        }
      },
      {
        id: 'py-io',
        title: 'Input & Output in Python',
        subtitle: 'input(), print(), Type Casting & String Formatting',
        category: 'Syntax',
        summary: 'Learn how input() captures user strings, type casting converts to numbers, and f-strings format beautiful outputs.',
        notebookContent: {
          definition: 'Input allows users to provide data, while output displays the result or information produced by the program.',
          codeExamples: [
            {
              title: 'input() Function',
              code: 'name = input("Enter your name: ")\nage = int(input("Enter your age: ")) # Type casting'
            },
            {
              title: 'f-String Formatting',
              code: 'age = 20\nprint(f"User is {age} years old.")'
            }
          ]
        },
        video: {
          title: 'Python Input, Output & f-Strings Masterclass',
          channel: 'CodeMaster Academy',
          duration: '11:40',
          views: '85K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=Python+Input+Output+Formatting+Tutorial',
          youtubeId: 'Ix13GqakJkU'
        }
      },
      {
        id: 'py-operators',
        title: 'Python Operators Cheat Sheet',
        subtitle: 'Arithmetic, Comparison, Logical, Assignment, Membership & Identity',
        category: 'Operators',
        summary: 'Operators perform calculations, conditional checks, membership tests (in), and identity checks (is) on values.',
        notebookContent: {
          definition: 'Operators are special symbols that perform operations on variables and values.',
          tables: [
            { col1: '+', col2: 'Addition', col3: '5 + 3', col4: 'Adds two values (8)' },
            { col1: '//', col2: 'Floor Division', col3: '5 // 3', col4: 'Divides & returns integer (1)' },
            { col1: '**', col2: 'Exponentiation', col3: '5 ** 3', col4: 'Raises to power (125)' },
            { col1: '==', col2: 'Equal To', col3: '5 == 5', col4: 'True if values match' },
            { col1: 'and', col2: 'Logical AND', col3: '(5 > 3 and 3 > 1)', col4: 'True if both conditions true' },
            { col1: 'in', col2: 'Membership', col3: '"x" in list', col4: 'True if item present in sequence' },
            { col1: 'is', col2: 'Identity', col3: 'x is y', col4: 'True if x and y reference same object' }
          ]
        },
        video: {
          title: 'Python Operators & Expressions Explained Simply',
          channel: 'Kipkoech Victor',
          duration: '16:05',
          views: '112K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: 'vLqTf2b6GZw'
        }
      },
      {
        id: 'py-loops',
        title: 'Loops & Control Statements in Python',
        subtitle: 'for Loops, while Loops, break, continue & pass',
        category: 'Control Flow',
        summary: 'Iterate over sequences with for loops, repeat while conditions are met, and alter flow using break, continue, and pass.',
        notebookContent: {
          definition: 'Loops are used to execute a block of code repeatedly.',
          codeExamples: [
            {
              title: 'for Loop',
              code: 'for i in range(1, 6):\n    print(i)'
            },
            {
              title: 'while Loop',
              code: 'count = 1\nwhile count <= 5:\n    print(count)\n    count += 1'
            },
            {
              title: 'break / continue / pass',
              code: '# break terminates loop\n# continue skips current iteration\n# pass acts as placeholder'
            }
          ]
        },
        video: {
          title: 'Python Loops: for, while, break, continue Tutorial',
          channel: 'CodeMaster Academy',
          duration: '19:40',
          views: '160K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=Python+Loops+for+while+tutorial',
          youtubeId: '6iF8Xb7Z3wQ'
        }
      },
      {
        id: 'py-functions',
        title: 'Functions in Python',
        subtitle: 'Types, How Functions Work Flowchart & Key Advantages',
        category: 'Functions',
        summary: 'Functions group reusable code blocks. Learn Built-in, User-defined, Lambda, and Recursive functions with visual flowcharts.',
        notebookContent: {
          definition: 'A function is a block of organized, reusable code that performs a specific task. Functions help reduce code repetition and improve readability.',
          types: [
            { name: '1. Built-in Functions', desc: 'Provided directly by Python (len, print, range)' },
            { name: '2. User-defined Functions', desc: 'Created by developers using def keyword' },
            { name: '3. Lambda Functions', desc: 'Small anonymous single-line functions' },
            { name: '4. Recursive Functions', desc: 'Functions that call themselves to solve sub-problems' }
          ],
          diagramFlow: [
            { label: 'Input', desc: 'Provide data or arguments' },
            { label: 'def', desc: 'Use def keyword to declare function name' },
            { label: 'Function Body', desc: 'Execute code logic inside block' },
            { label: 'return', desc: 'Send result back to caller' },
            { label: 'Output', desc: 'Get result' }
          ],
          advantages: [
            '1. Code Reusability (Write once, use anywhere)',
            '2. Better Code Organization',
            '3. Easier Debugging & Unit Testing',
            '4. Improves Readability & Maintainability',
            '5. Reduces Code Complexity'
          ]
        },
        video: {
          title: 'Python Functions & Scope Visual Guide',
          channel: 'Kipkoech Victor',
          duration: '25:30',
          views: '230K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: '9Os0o3wzS_I'
        }
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    logo: '🟨',
    color: 'from-amber-400 via-yellow-500 to-orange-500',
    badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    tagline: 'High-Level, Dynamic, Event-Driven & Just-In-Time (JIT) Compiled',
    type: 'JIT Compiled',
    howItWorks: {
      title: 'How JavaScript Executes (V8 Engine & Event Loop)',
      description: 'JavaScript source code is parsed by engines (like V8), compiled via JIT into machine code, and executed using an Event Loop & Call Stack.',
      steps: [
        {
          step: 1,
          title: 'Source Code (.js / .ts)',
          desc: 'Written in JS or TypeScript (compiled to JS via tsc compiler).',
          icon: '📄'
        },
        {
          step: 2,
          title: 'V8 Parser & AST',
          desc: 'Engine parses code into an Abstract Syntax Tree (AST) checking grammar.',
          icon: '🌲'
        },
        {
          step: 3,
          title: 'Ignition Interpreter',
          desc: 'Converts AST into bytecode and begins executing quickly.',
          icon: '🚀'
        },
        {
          step: 4,
          title: 'TurboFan JIT Compiler',
          desc: 'Hot functions are compiled directly into optimized native machine code.',
          icon: '🔥'
        },
        {
          step: 5,
          title: 'Event Loop & Call Stack',
          desc: 'Handles asynchronous tasks (promises, fetch, DOM events) single-threaded.',
          icon: '🔄'
        }
      ]
    },
    roadmaps: [
      { step: 1, title: 'JavaScript Fundamentals', topics: ['Variables (const/let)', 'Data Types & coercion', 'Functions & Arrow Syntax'] },
      { step: 2, title: 'DOM & Event Handling', topics: ['querySelector', 'addEventListener', 'DOM Mutation'] },
      { step: 3, title: 'Async JS & Web APIs', topics: ['Promises', 'async/await', 'Fetch API', 'Event Loop'] },
      { step: 4, title: 'Modern ES6+ Syntax', topics: ['Destructuring', 'Spread/Rest Operators', 'Modules (import/export)'] },
      { step: 5, title: 'TypeScript Integration', topics: ['Interfaces & Types', 'Generics', 'Strict Type Checking'] },
      { step: 6, title: 'Frontend Framework (React)', topics: ['Components & JSX', 'State & Hooks', 'Routing & Context'] },
      { step: 7, title: 'Node.js Backend', topics: ['Express.js Server', 'REST APIs', 'NPM Package Ecosystem'] }
    ],
    infographics: [
      {
        id: 'js-engine',
        title: 'How the JavaScript V8 Engine & Event Loop Work',
        subtitle: 'Call Stack, Web APIs, Microtask Queue & JIT Compilation',
        category: 'Architecture',
        summary: 'Learn how V8 uses Ignition interpreter and TurboFan JIT compiler along with the non-blocking event loop.',
        notebookContent: {
          definition: 'JavaScript runs single-threaded using an event-driven loop backed by JIT compilation engines.',
          features: [
            '1. Call Stack: Tracks function calls currently being executed',
            '2. Web APIs: Browser threads handling setTimeout, fetch, and DOM listeners',
            '3. Callback Queue: Holds macrotasks ready for stack execution',
            '4. Microtask Queue: High-priority queue for Promises (.then / await)',
            '5. JIT Compilation: TurboFan compiles hot code to machine code in background'
          ],
          diagramFlow: [
            { label: 'Source JS Code', desc: 'Parsed into AST tree' },
            { label: 'Ignition Interpreter', desc: 'Generates bytecode' },
            { label: 'Call Stack', desc: 'Executes synchronous functions' },
            { label: 'Event Loop', desc: 'Pushes queued callbacks when stack is empty' },
            { label: 'Machine Code', desc: 'TurboFan optimized execution' }
          ]
        },
        video: {
          title: 'JavaScript Event Loop & V8 Engine Explained',
          channel: 'CodeMaster Academy',
          duration: '17:30',
          views: '320K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=JavaScript+V8+Engine+Event+Loop+Tutorial',
          youtubeId: '8aGhZQkoFbQ'
        }
      },
      {
        id: 'ts-basics',
        title: 'TypeScript Type System & Interfaces',
        subtitle: 'Static Typing, Generics & Type Safety on top of JS',
        category: 'Syntax',
        summary: 'TypeScript adds static type definitions to JavaScript, catching errors at compile time before running code.',
        notebookContent: {
          definition: 'TypeScript is a strongly typed programming language that builds on JavaScript.',
          codeExamples: [
            {
              title: 'Interfaces & Types',
              code: 'interface User {\n  id: string;\n  name: string;\n  age: number;\n}\nconst u: User = { id: "1", name: "Alex", age: 24 };'
            },
            {
              title: 'Generics',
              code: 'function identity<T>(arg: T): T {\n  return arg;\n}'
            }
          ]
        },
        video: {
          title: 'TypeScript Full Course for Beginners 2026',
          channel: 'Kipkoech Victor',
          duration: '28:15',
          views: '190K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: 'BwuLxPH8IDs'
        }
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    logo: '⚡',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    tagline: 'High-Performance, Compiled, Direct Memory Control & RAII',
    type: 'Compiled to Machine Code',
    howItWorks: {
      title: 'How C++ Compiles Directly to Binary Machine Code',
      description: 'C++ is a compiled language where source code (.cpp) passes through preprocessing, compilation, assembly, and linking to produce a standalone executable.',
      steps: [
        {
          step: 1,
          title: 'Source Code (.cpp / .h)',
          desc: 'High-level code with templates, pointers, and memory control.',
          icon: '📄'
        },
        {
          step: 2,
          title: 'Preprocessor',
          desc: 'Expands #include directives and macro replacements.',
          icon: '🔍'
        },
        {
          step: 3,
          title: 'Compiler (g++ / clang)',
          desc: 'Translates C++ code into platform assembly code.',
          icon: '⚙️'
        },
        {
          step: 4,
          title: 'Assembler',
          desc: 'Converts assembly instructions into object files (.o / .obj).',
          icon: '📦'
        },
        {
          step: 5,
          title: 'Linker',
          desc: 'Combines object files & libraries into a runnable machine binary (.exe / ELF).',
          icon: '⚡'
        }
      ]
    },
    roadmaps: [
      { step: 1, title: 'C++ Fundamentals', topics: ['iostream I/O', 'Variables & Data Types', 'Control Structures'] },
      { step: 2, title: 'Functions & References', topics: ['Pass-by-value vs pass-by-reference', 'Function overloading', 'Default arguments'] },
      { step: 3, title: 'Pointers & Memory', topics: ['Pointers & Addresses', 'Dynamic Allocation (new/delete)', 'Stack vs Heap'] },
      { step: 4, title: 'Object-Oriented Programming', topics: ['Classes & Objects', 'Constructors/Destructors', 'Inheritance & Virtual Functions'] },
      { step: 5, title: 'Standard Template Library (STL)', topics: ['std::vector & std::map', 'Iterators', 'Algorithms (sort, find)'] },
      { step: 6, title: 'Modern C++ (C++11 to C++20)', topics: ['Smart Pointers (unique_ptr, shared_ptr)', 'Move Semantics', 'Lambda Expressions', 'Concepts'] }
    ],
    infographics: [
      {
        id: 'cpp-compilation',
        title: 'C++ Compilation Pipeline & Memory Layout',
        subtitle: 'Source -> Preprocessor -> Compiler -> Linker -> Executable',
        category: 'Architecture',
        summary: 'Understand the exact 4-stage C++ build process and how Stack and Heap memory are laid out.',
        notebookContent: {
          definition: 'C++ compiles directly to machine code for maximum hardware efficiency.',
          diagramFlow: [
            { label: '.cpp Source', desc: 'Written in human readable code' },
            { label: 'Preprocessor', desc: 'Expands headers & macros' },
            { label: 'Compiler', desc: 'Generates assembly code' },
            { label: 'Assembler & Linker', desc: 'Links libraries into native binary' },
            { label: 'Executable Binary', desc: 'Runs directly on OS kernel' }
          ]
        },
        video: {
          title: 'How C++ Compiles & Executes Under the Hood',
          channel: 'CodeMaster Academy',
          duration: '20:10',
          views: '240K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=C%2B%2B+Compilation+Process+Explained',
          youtubeId: 'vLnPwxZdW4w'
        }
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    logo: '☕',
    color: 'from-red-500 via-rose-500 to-amber-500',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    tagline: 'Write Once, Run Anywhere (WORA) via JVM & Bytecode',
    type: 'Interpreted / Bytecode',
    howItWorks: {
      title: 'How Java Works: Source Code to JVM Execution',
      description: 'Java source (.java) is compiled by javac into platform-neutral Bytecode (.class) and executed by the Java Virtual Machine (JVM).',
      steps: [
        {
          step: 1,
          title: 'Java Source Code (.java)',
          desc: 'Strict object-oriented code written by developers.',
          icon: '📄'
        },
        {
          step: 2,
          title: 'Java Compiler (javac)',
          desc: 'Compiles .java file into intermediate Bytecode (.class).',
          icon: '⚙️'
        },
        {
          step: 3,
          title: 'JVM ClassLoader',
          desc: 'Loads .class files into the JVM Memory Area.',
          icon: '📥'
        },
        {
          step: 4,
          title: 'JVM Execution Engine (Interpreter + JIT)',
          desc: 'JIT compiler turns frequently used bytecode into native machine instructions.',
          icon: '🔥'
        },
        {
          step: 5,
          title: 'Garbage Collector & OS Kernel',
          desc: 'Manages memory automatically and executes machine instructions on OS.',
          icon: '🎯'
        }
      ]
    },
    roadmaps: [
      { step: 1, title: 'Java Syntax & Basics', topics: ['JDK Setup', 'public static void main', 'Data Types & Operators'] },
      { step: 2, title: 'Object-Oriented Programming', topics: ['Classes & Objects', 'Encapsulation & Abstraction', 'Inheritance & Interfaces'] },
      { step: 3, title: 'Collections Framework', topics: ['List, Set, Map', 'ArrayList & HashMap', 'Iterators & Streams'] },
      { step: 4, title: 'Exception Handling & I/O', topics: ['try-catch-finally', 'Custom Exceptions', 'File Streams'] },
      { step: 5, title: 'Multithreading & Concurrency', topics: ['Threads & Runnable', 'Synchronization', 'ExecutorService'] },
      { step: 6, title: 'Spring Boot Ecosystem', topics: ['Spring Core & Dependency Injection', 'Spring MVC REST APIs', 'Spring Data JPA'] }
    ],
    infographics: [
      {
        id: 'java-jvm',
        title: 'Java Virtual Machine (JVM) Architecture',
        subtitle: 'ClassLoader, JVM Memory Areas, Execution Engine & Garbage Collector',
        category: 'Architecture',
        summary: 'Explore the internals of JVM: Method Area, Heap, Stack, PC Registers, Native Method Stack, JIT, and GC.',
        notebookContent: {
          definition: 'Java relies on JVM to provide portable execution across all operating systems.',
          diagramFlow: [
            { label: '.java File', desc: 'Human readable source code' },
            { label: 'javac Compiler', desc: 'Compiles into .class Bytecode' },
            { label: 'JVM Memory', desc: 'Heap, Stack & Method Area' },
            { label: 'JIT Compiler', desc: 'Translates hot bytecode to machine code' },
            { label: 'Operating System', desc: 'Executes native instructions' }
          ]
        },
        video: {
          title: 'JVM Architecture & Java Bytecode Explained',
          channel: 'CodeMaster Academy',
          duration: '21:40',
          views: '280K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=JVM+Architecture+Java+Bytecode+Tutorial',
          youtubeId: 'ZBJ0u9MaKtM'
        }
      }
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    logo: '🦀',
    color: 'from-orange-500 via-amber-600 to-red-600',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    tagline: 'Memory Safe Without Garbage Collection via Ownership & Borrowing',
    type: 'Compiled to Machine Code',
    howItWorks: {
      title: 'How Rust Guarantees Memory Safety at Compile Time',
      description: 'Rust uses a compile-time Borrow Checker that enforces strict ownership rules, eliminating null pointer errors, data races, and memory leaks before the program even runs.',
      steps: [
        {
          step: 1,
          title: 'Rust Source (.rs)',
          desc: 'High-level, expressive code with static type inferencing.',
          icon: '📄'
        },
        {
          step: 2,
          title: 'Rust Compiler (rustc) & Cargo',
          desc: 'Cargo manages dependencies and builds package targets.',
          icon: '⚙️'
        },
        {
          step: 3,
          title: 'Borrow Checker Analysis',
          desc: 'Verifies Ownership, Borrowing (&/&mut), and Lifetimes rules at compile time.',
          icon: '🛡️'
        },
        {
          step: 4,
          title: 'LLVM Backend Optimization',
          desc: 'Generates ultra-optimized native machine binary.',
          icon: '⚡'
        },
        {
          step: 5,
          title: 'Zero-Cost Abstractions Execution',
          desc: 'Runs at C/C++ speeds with zero garbage collection overhead.',
          icon: '🎯'
        }
      ]
    },
    roadmaps: [
      { step: 1, title: 'Rust Setup & Cargo', topics: ['rustup & cargo', 'fn main()', 'cargo build & cargo run'] },
      { step: 2, title: 'Ownership & Borrowing', topics: ['Ownership Rules', 'Move vs Copy', 'Immutable vs Mutable References'] },
      { step: 3, title: 'Data Types & Control Flow', topics: ['Structs & Enums', 'Option & Result types', 'match pattern matching'] },
      { step: 4, title: 'Collections & Error Handling', topics: ['Vec & HashMap', 'panic! vs Result handling', '? operator'] },
      { step: 5, title: 'Traits & Lifetimes', topics: ['Trait definitions', 'Generics', 'Lifetime annotations (\'a)'] },
      { step: 6, title: 'Async Rust & Networking', topics: ['Tokio async runtime', 'async/await', 'Web Services with Axum/Actix'] }
    ],
    infographics: [
      {
        id: 'rust-ownership',
        title: 'Rust Ownership, Borrowing & Lifetimes Visualized',
        subtitle: 'How Rust Eliminates Memory Leaks & Data Races Without GC',
        category: 'Architecture',
        summary: 'Learn the 3 golden ownership rules, mutable vs immutable references, and compile-time safety checks.',
        notebookContent: {
          definition: 'Ownership is Rust\'s most unique feature for guaranteed memory safety.',
          features: [
            'Rule 1: Each value in Rust has an owner (a variable).',
            'Rule 2: There can only be one owner at a time.',
            'Rule 3: When the owner goes out of scope, the value is dropped automatically.',
            'Borrowing: You can borrow references (&T for multiple readers, &mut T for exclusive writer).'
          ]
        },
        video: {
          title: 'Rust Ownership & Borrowing Explained Simply',
          channel: 'Kipkoech Victor',
          duration: '24:00',
          views: '195K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/@kipkoechvictor-hn2eo?si=xeIJTX4ypJWPFbw5',
          youtubeId: 'usJDUSrcscI'
        }
      }
    ]
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    logo: '🐹',
    color: 'from-cyan-500 via-teal-500 to-blue-600',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    tagline: 'Simple, Fast, Lightweight Concurrency with Goroutines & Channels',
    type: 'Compiled to Machine Code',
    howItWorks: {
      title: 'How Go Achieves Blazing Fast Concurrency & Quick Compiles',
      description: 'Go compiles directly to a single static binary. It uses lightweight Goroutines managed by Go Runtime scheduler rather than heavy OS threads.',
      steps: [
        {
          step: 1,
          title: 'Go Source (.go)',
          desc: 'Clean, simple code with no complex inheritance or header files.',
          icon: '📄'
        },
        {
          step: 2,
          title: 'Go Toolchain Compiler',
          desc: 'Compiles millions of lines in seconds into native assembly.',
          icon: '⚙️'
        },
        {
          step: 3,
          title: 'Go Runtime Embed',
          desc: 'Embeds a lightweight garbage collector and goroutine scheduler directly into the binary.',
          icon: '🚀'
        },
        {
          step: 4,
          title: 'Static Binary Build',
          desc: 'Produces a single self-contained binary with zero external dependencies.',
          icon: '📦'
        },
        {
          step: 5,
          title: 'Goroutines Execution',
          desc: 'Runs tens of thousands of concurrent tasks on few OS threads efficiently.',
          icon: '⚡'
        }
      ]
    },
    roadmaps: [
      { step: 1, title: 'Go Fundamentals', topics: ['go mod init', 'package main', 'Variables, const & Types'] },
      { step: 2, title: 'Control Flow & Functions', topics: ['if & switch', 'for loops (only loop in Go)', 'Multiple return values'] },
      { step: 3, title: 'Data Structures', topics: ['Slices & Arrays', 'Maps', 'Structs & Pointers'] },
      { step: 4, title: 'Interfaces & Methods', topics: ['Implicit Interfaces', 'Method sets', 'Type assertions'] },
      { step: 5, title: 'Concurrency Masterclass', topics: ['go routine keyword', 'Channels & select', 'sync.WaitGroup & Mutex'] },
      { step: 6, title: 'Backend & Cloud Microservices', topics: ['net/http package', 'REST APIs', 'gRPC & Docker deployment'] }
    ],
    infographics: [
      {
        id: 'go-concurrency',
        title: 'Go Concurrency Model: Goroutines & Channels',
        subtitle: 'Do not communicate by sharing memory; share memory by communicating.',
        category: 'Architecture',
        summary: 'Understand the M:N scheduler in Go and how channels coordinate message passing between goroutines.',
        notebookContent: {
          definition: 'Go makes concurrent programming effortless with goroutines that take only 2KB of initial memory.',
          features: [
            '1. Goroutines: `go functionName()` launches asynchronous lightweight thread.',
            '2. Channels: `ch := make(chan string)` passes typed data safely between goroutines.',
            '3. Select Statement: Listens on multiple channel operations simultaneously.',
            '4. Built-in GC: Low-latency concurrent garbage collector.'
          ]
        },
        video: {
          title: 'Go Concurrency, Goroutines & Channels Visual Guide',
          channel: 'CodeMaster Academy',
          duration: '19:15',
          views: '210K views',
          thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          videoUrl: 'https://youtube.com/results?search_query=Go+Golang+Concurrency+Goroutines+Tutorial',
          youtubeId: 'f6kdp27TYZs'
        }
      }
    ]
  }
];

interface VisualGuidesHubProps {
  darkMode: boolean;
}

export const VisualGuidesHub: React.FC<VisualGuidesHubProps> = ({ darkMode }) => {
  const [selectedLangId, setSelectedLangId] = useState<string>('python');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notebookMode, setNotebookMode] = useState<boolean>(true);

  // Video Preview Modal State
  const [activeVideoModal, setActiveVideoModal] = useState<{
    title: string;
    channel: string;
    duration: string;
    views: string;
    youtubeId: string;
    videoUrl: string;
    subtitle: string;
  } | null>(null);

  // Expanded Infographic Modal State
  const [expandedInfographic, setExpandedInfographic] = useState<any | null>(null);

  const selectedLang = LANGUAGES_DATA.find((l) => l.id === selectedLangId) || LANGUAGES_DATA[0];

  const categories = ['All', 'Architecture', 'Syntax', 'Data Types', 'Operators', 'Control Flow', 'Functions', 'Installation', 'Roadmap'];

  const filteredInfographics = selectedLang.infographics.filter((info) => {
    const matchesCat = activeCategory === 'All' || info.category === activeCategory;
    const matchesSearch =
      info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-xl ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Educational Diagrams & Video Tutorials</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Visual Language Guides & Architecture Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Explore handwritten-style educational infographics for Python and comprehensive architecture breakdowns for JavaScript, C++, Java, Rust, and Go. Click any concept card to preview full video tutorials!
            </p>
          </div>

          {/* Mode Switcher & Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setNotebookMode(!notebookMode)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center space-x-2 shadow-sm ${
                notebookMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-blue-600 text-white border-blue-500'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{notebookMode ? '📝 Handwritten Notebook View' : '💻 Modern Tech View'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Language Selector Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {LANGUAGES_DATA.map((lang) => {
          const isSelected = lang.id === selectedLangId;
          return (
            <button
              key={lang.id}
              onClick={() => {
                setSelectedLangId(lang.id);
                setActiveCategory('All');
              }}
              className={`px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center space-x-2.5 border ${
                isSelected
                  ? `bg-gradient-to-r ${lang.color} text-white shadow-lg border-transparent scale-105`
                  : darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="text-lg">{lang.logo}</span>
              <span>{lang.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${lang.badgeBg}`}>
                {lang.infographics.length} Guides
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Language Architecture & "How it Works" Visual Pipeline */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 border-slate-800/80">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedLang.logo}</span>
              <div>
                <h2 className="text-xl font-black tracking-tight flex items-center space-x-2">
                  <span>{selectedLang.howItWorks.title}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">{selectedLang.howItWorks.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedLang.badgeBg}`}>
              ⚡ Execution Model: {selectedLang.type}
            </span>
          </div>
        </div>

        {/* Pipeline Execution Flow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {selectedLang.howItWorks.steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border relative flex flex-col justify-between space-y-3 transition-all hover:border-blue-500/50 ${
                darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                    {s.step}
                  </span>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <h3 className="font-bold text-xs text-indigo-300">{s.title}</h3>
                <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
              </div>

              {idx < selectedLang.howItWorks.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedLang.name} guides...`}
            className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Infographics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfographics.map((info) => (
          <div
            key={info.id}
            className={`rounded-3xl border overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between ${
              notebookMode
                ? darkMode
                  ? 'bg-slate-900/95 border-amber-500/30'
                  : 'bg-amber-50/70 border-amber-200'
                : darkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Card Header */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {info.category}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                  <span>{selectedLang.logo}</span>
                  <span>{selectedLang.name}</span>
                </span>
              </div>

              <div>
                <h3 className={`font-black text-base sm:text-lg leading-snug ${
                  notebookMode ? 'font-serif tracking-tight text-amber-300' : ''
                }`}>
                  {info.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{info.subtitle}</p>
              </div>

              {/* Notebook Content Transcribed Preview */}
              {info.notebookContent && (
                <div className={`p-4 rounded-2xl text-xs space-y-2 border ${
                  notebookMode
                    ? darkMode
                      ? 'bg-slate-950/80 border-amber-500/20 text-amber-100/90 font-serif'
                      : 'bg-white/80 border-amber-200 text-slate-800 font-serif'
                    : darkMode
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  {info.notebookContent.definition && (
                    <p className="line-clamp-2 leading-relaxed">
                      💡 <strong>Key Concept:</strong> {info.notebookContent.definition}
                    </p>
                  )}

                  {info.notebookContent.features && (
                    <div className="space-y-1 pt-1 border-t border-slate-800/40">
                      {info.notebookContent.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-1.5 text-[11px]">
                          <span className="text-amber-400 font-bold">•</span>
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {info.notebookContent.diagramFlow && (
                    <div className="pt-2 flex items-center space-x-1 overflow-x-auto text-[10px]">
                      {info.notebookContent.diagramFlow.slice(0, 3).map((df, dfIdx) => (
                        <React.Fragment key={dfIdx}>
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold whitespace-nowrap">
                            {df.label}
                          </span>
                          {dfIdx < 2 && <span className="text-slate-500">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Full Infographic Modal Button */}
              <button
                onClick={() => setExpandedInfographic(info)}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  darkMode
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand Full Notebook Infographic</span>
              </button>
            </div>

            {/* Video Preview Section Card */}
            <div className="border-t border-slate-800/80 p-4 space-y-3 bg-slate-950/40">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center space-x-1 text-red-400">
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Video Preview Tutorial</span>
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{info.video.duration}</span>
              </div>

              {/* Video Thumbnail Preview Frame */}
              <div
                onClick={() => setActiveVideoModal({
                  title: info.video.title,
                  channel: info.video.channel,
                  duration: info.video.duration,
                  views: info.video.views,
                  youtubeId: info.video.youtubeId,
                  videoUrl: info.video.videoUrl,
                  subtitle: info.subtitle
                })}
                className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-video border border-slate-800 shadow-md"
              >
                <img
                  src={info.video.thumbnailUrl}
                  alt={info.video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white/90 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <span className="truncate max-w-[180px] font-medium">{info.video.channel}</span>
                  <span className="font-bold text-amber-300">{info.video.views}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => setActiveVideoModal({
                    title: info.video.title,
                    channel: info.video.channel,
                    duration: info.video.duration,
                    views: info.video.views,
                    youtubeId: info.video.youtubeId,
                    videoUrl: info.video.videoUrl,
                    subtitle: info.subtitle
                  })}
                  className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Preview Video</span>
                </button>

                <a
                  href={info.video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                  }`}
                  title="Open on YouTube"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Step-by-Step Learning Roadmap for Selected Language */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between border-b pb-4 border-slate-800/80">
          <div className="flex items-center space-x-3">
            <Workflow className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-black tracking-tight">
                {selectedLang.name} Step-by-Step Learning Roadmap
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Sequential mastery path to become a confident {selectedLang.name} engineer.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedLang.roadmaps.map((r) => (
            <div
              key={r.step}
              className={`p-5 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                  {r.step}
                </span>
                <h3 className="font-bold text-sm">{r.title}</h3>
              </div>

              <ul className="space-y-1.5 pt-1 text-xs text-slate-400">
                {r.topics.map((t, tIdx) => (
                  <li key={tIdx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden space-y-4 p-6 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-800/80">
              <div className="flex items-center space-x-2">
                <Youtube className="w-6 h-6 text-red-500 fill-current" />
                <div>
                  <h3 className="font-black text-base sm:text-lg">{activeVideoModal.title}</h3>
                  <p className="text-xs text-slate-400">{activeVideoModal.subtitle}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Video Iframe / Preview Canvas */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                title={activeVideoModal.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-2">
              <div className="flex items-center space-x-3 text-slate-400">
                <span>📺 {activeVideoModal.channel}</span>
                <span>•</span>
                <span>⏱️ {activeVideoModal.duration}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{activeVideoModal.views}</span>
              </div>

              <a
                href={activeVideoModal.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center space-x-1.5 shadow-md transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Watch Full Video on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Infographic Details Modal */}
      {expandedInfographic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8 ${
            darkMode ? 'bg-slate-900 border-amber-500/30 text-amber-50' : 'bg-amber-50 border-amber-300 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-amber-500/30">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-7 h-7 text-amber-400" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-serif">{expandedInfographic.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{expandedInfographic.subtitle}</p>
                </div>
              </div>

              <button
                onClick={() => setExpandedInfographic(null)}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notebook Full Breakdown */}
            {expandedInfographic.notebookContent && (
              <div className="space-y-6 text-sm font-serif leading-relaxed">
                {expandedInfographic.notebookContent.definition && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <h4 className="font-bold text-amber-400 text-xs mb-1">DEFINITIONS & OVERVIEW</h4>
                    <p>{expandedInfographic.notebookContent.definition}</p>
                  </div>
                )}

                {expandedInfographic.notebookContent.features && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">Key Features & Points:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {expandedInfographic.notebookContent.features.map((f: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-amber-500/20 text-xs flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {expandedInfographic.notebookContent.tables && (
                  <div className="space-y-2 overflow-x-auto">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">Reference Table:</h4>
                    <table className="w-full text-xs text-left border-collapse border border-amber-500/20">
                      <thead>
                        <tr className="bg-amber-500/20 text-amber-300 font-bold">
                          <th className="p-2.5 border border-amber-500/20">Symbol</th>
                          <th className="p-2.5 border border-amber-500/20">Name</th>
                          <th className="p-2.5 border border-amber-500/20">Example</th>
                          <th className="p-2.5 border border-amber-500/20">Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expandedInfographic.notebookContent.tables.map((row: any, rIdx: number) => (
                          <tr key={rIdx} className="border-b border-amber-500/10 hover:bg-amber-500/5">
                            <td className="p-2.5 font-mono text-amber-300 font-bold border border-amber-500/10">{row.col1}</td>
                            <td className="p-2.5 font-bold border border-amber-500/10">{row.col2}</td>
                            <td className="p-2.5 font-mono text-indigo-300 border border-amber-500/10">{row.col3}</td>
                            <td className="p-2.5 border border-amber-500/10">{row.col4}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {expandedInfographic.notebookContent.codeExamples && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">Syntax Code Examples:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {expandedInfographic.notebookContent.codeExamples.map((ce: any, cIdx: number) => (
                        <div key={cIdx} className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                          <h5 className="font-bold text-xs text-amber-300">{ce.title}</h5>
                          <pre className="text-xs font-mono text-emerald-400 bg-black/60 p-3 rounded-xl overflow-x-auto border border-slate-800">
                            {ce.code}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-amber-500/20">
              <button
                onClick={() => setExpandedInfographic(null)}
                className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Close Infographic
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
