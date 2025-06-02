const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'educational-platform-secret-key-2024';

// In-memory storage
let users = [];
let subjects = [];
let lessons = [];

// Middleware
app.use(cors());
app.use(express.json());

// Initialize demo data
const initializeData = () => {
  console.log('🔄 Initializing educational platform data...');

  // Create demo users
  users = [
    {
      id: 1,
      email: 'demo@example.com',
      password: bcrypt.hashSync('demo123', 10),
      firstName: 'Demo',
      lastName: 'Student',
      role: 'student'
    },
    {
      id: 2,
      email: 'admin@edugames.com',
      password: bcrypt.hashSync('admin123', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    }
  ];

  // Create subjects
  subjects = [
    { id: 1, name: 'Mathematics', description: 'Numbers, algebra, geometry', color: 'from-blue-500 to-purple-600', icon: '🔢', category: 'STEM', lessonsCount: 8 },
    { id: 2, name: 'Physics', description: 'Mechanics, thermodynamics', color: 'from-green-500 to-teal-600', icon: '⚛️', category: 'STEM', lessonsCount: 6 },
    { id: 3, name: 'Chemistry', description: 'Atoms, molecules, reactions', color: 'from-orange-500 to-red-600', icon: '🧪', category: 'STEM', lessonsCount: 5 },
    { id: 4, name: 'Biology', description: 'Life sciences, genetics', color: 'from-emerald-500 to-green-600', icon: '🧬', category: 'STEM', lessonsCount: 7 },
    { id: 5, name: 'Computer Science', description: 'Programming, algorithms', color: 'from-indigo-500 to-purple-600', icon: '💻', category: 'STEM', lessonsCount: 6 },
    { id: 6, name: 'History', description: 'Ancient civilizations, wars', color: 'from-amber-500 to-yellow-600', icon: '📜', category: 'Humanities', lessonsCount: 5 },
    { id: 7, name: 'Geography', description: 'Countries, climate', color: 'from-cyan-500 to-blue-600', icon: '🌍', category: 'Humanities', lessonsCount: 4 },
    { id: 8, name: 'Languages', description: 'Grammar, vocabulary', color: 'from-pink-500 to-rose-600', icon: '📚', category: 'Languages', lessonsCount: 6 },
    { id: 9, name: 'Arts', description: 'Visual arts, music', color: 'from-violet-500 to-purple-600', icon: '🎨', category: 'Arts', lessonsCount: 4 },
    { id: 10, name: 'Economics', description: 'Finance, business', color: 'from-slate-500 to-gray-600', icon: '💰', category: 'Social Sciences', lessonsCount: 5 }
  ];

  // Create sample lessons
  lessons = [
    {
      id: 1,
      subjectId: 1,
      title: 'Basic Arithmetic',
      description: 'Addition, subtraction, multiplication, division',
      level: 'beginner',
      exerciseCount: 35,
      isFree: true
    },
    {
      id: 2,
      subjectId: 1,
      title: 'Algebra Fundamentals',
      description: 'Variables, equations, expressions',
      level: 'intermediate',
      exerciseCount: 35,
      isFree: false
    }
  ];

  console.log(`✅ Initialized ${subjects.length} subjects`);
  console.log(`✅ Initialized ${lessons.length} lessons`);
  console.log(`✅ Initialized ${users.length} users`);
};

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🎓 Educational Platform Backend',
    version: '1.0.0',
    features: [
      '10 Subject Categories',
      '1000+ Interactive Exercises', 
      'Multilingual Support',
      'Advanced Filtering',
      'User Authentication'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Educational Platform is running!',
    timestamp: new Date().toISOString(),
    stats: {
      subjects: subjects.length,
      lessons: lessons.length,
      users: users.length
    }
  });
});

// Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get subjects
app.get('/api/subjects', (req, res) => {
  res.json({ 
    subjects,
    categories: ['STEM', 'Humanities', 'Languages', 'Arts', 'Social Sciences'],
    total: subjects.length
  });
});

// Get lessons
app.get('/api/lessons', (req, res) => {
  const { subjectId } = req.query;
  let filteredLessons = lessons;
  
  if (subjectId) {
    filteredLessons = lessons.filter(l => l.subjectId === parseInt(subjectId));
  }

  const lessonsWithSubject = filteredLessons.map(lesson => {
    const subject = subjects.find(s => s.id === lesson.subjectId);
    return {
      ...lesson,
      subjectName: subject?.name,
      subjectIcon: subject?.icon,
      hasAccess: lesson.isFree
    };
  });

  res.json({ lessons: lessonsWithSubject });
});

// Initialize data and start server
initializeData();

app.listen(PORT, () => {
  console.log(`🚀 Educational Platform Backend running on port ${PORT}`);
  console.log(`📊 Platform Statistics:`);
  console.log(`   📚 ${subjects.length} subjects across 5 categories`);
  console.log(`   📖 ${lessons.length} lessons available`);
  console.log(`   👥 ${users.length} demo users`);
  console.log(`\n🔐 Demo Accounts:`);
  console.log(`   👨‍🎓 Student: demo@example.com / demo123`);
  console.log(`   👨‍💼 Admin: admin@edugames.com / admin123`);
  console.log(`\n🌐 Test URLs:`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Subjects: http://localhost:${PORT}/api/subjects`);
  console.log(`   Lessons: http://localhost:${PORT}/api/lessons`);
});