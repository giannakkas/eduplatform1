# 🎓 Educational Platform Backend

A comprehensive, multilingual educational platform featuring 10 subject categories, 1000+ interactive exercises, and advanced learning management capabilities.

![Platform Stats](https://img.shields.io/badge/Subjects-10-blue) ![Exercises](https://img.shields.io/badge/Exercises-1000%2B-green) ![Languages](https://img.shields.io/badge/Languages-6-orange) ![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen)

## ✨ Features

### 📚 Comprehensive Subject Coverage
- **STEM**: Mathematics, Physics, Chemistry, Biology, Computer Science
- **Humanities**: History, Geography  
- **Languages**: Grammar, Vocabulary, Literature
- **Arts**: Visual Arts, Music Theory
- **Social Sciences**: Economics, Business

### 🎯 Interactive Learning Experience
- **1000+ Exercises**: 35+ exercises per lesson with multiple question types
- **Progressive Difficulty**: Easy → Medium → Hard progression
- **Immediate Feedback**: Real-time explanations and scoring
- **Multiple Question Types**: Multiple choice, text input, and more
- **Progress Tracking**: Comprehensive learning analytics

### 🔍 Advanced Discovery
- **Smart Filtering**: Filter by category, level, tags, and access type
- **Global Search**: Search across subjects, lessons, and content
- **Tag System**: Beginner, Interactive, Problem Solving, Theory, etc.
- **Personalized Recommendations**: Based on learning progress

### 🌍 Multilingual Support
- **6 Languages**: English, Greek, German, Italian, French, Turkish
- **Localized Content**: Full translation of interface and exercises
- **Language Switching**: Seamless language change during sessions

### 👥 Role-Based Access Control
- **Students**: Access to lessons and progress tracking
- **Teachers**: Premium access and student monitoring
- **Admins**: Full content management and user administration

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** installed ([Download here](https://nodejs.org/))
- **npm or yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/educational-platform-backend.git
cd educational-platform-backend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env file with your configuration (see Configuration section below)
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Verify installation**
Open your browser and visit: `http://localhost:3001/api/health`

You should see a JSON response with platform statistics.

## 🔐 Demo Accounts

The platform comes with pre-configured demo accounts for testing:

### 👨‍🎓 Student Account
- **Email**: `demo@example.com`
- **Password**: `demo123`
- **Access**: Free lessons and basic features

### 👨‍🏫 Teacher Account  
- **Email**: `teacher@edugames.com`
- **Password**: `teacher123`
- **Access**: Premium lessons and student monitoring

### 👨‍💼 Admin Account
- **Email**: `admin@edugames.com`  
- **Password**: `admin123`
- **Access**: Full platform management and content creation

## 📊 API Documentation

### Authentication Endpoints
```http
POST /api/auth/login          # User authentication
GET  /api/auth/profile        # Get current user profile
```

### Content Discovery
```http
GET  /api/subjects           # Get subjects with filtering
GET  /api/lessons            # Get lessons with advanced filtering  
GET  /api/lessons/:id        # Get specific lesson with exercises
GET  /api/search             # Global content search
GET  /api/tags               # Get all available tags
```

### Learning & Progress
```http
POST /api/lessons/:lessonId/exercises/:exerciseId/answer  # Submit exercise answer
GET  /api/stats              # User learning statistics
GET  /api/progress           # Detailed progress tracking
```

### Admin Management (Admin role required)
```http
POST /api/admin/subjects     # Create new subject
POST /api/admin/lessons      # Create new lesson
POST /api/admin/exercises    # Create new exercise
GET  /api/admin/export       # Export all platform data
```

### Query Parameters for Filtering
```http
# Subjects
GET /api/subjects?category=STEM&search=math&language=en

# Lessons  
GET /api/lessons?subjectId=1&level=beginner&tags=1,4&isFree=true&page=1&limit=10

# Search
GET /api/search?q=algebra&type=lessons&language=en
```

## 🗂️ Project Structure

```
educational-platform-backend/
├── 📄 server.js              # Main application server
├── 📦 package.json           # Dependencies and scripts
├── 🔧 .env.example           # Environment configuration template
├── 🚫 .gitignore            # Git ignore rules
├── 📖 README.md             # This documentation
├── 📁 uploads/              # File upload directory
│   └── .gitkeep            # Keep directory in git
├── 📁 docs/                # Additional documentation
│   └── API.md              # Detailed API documentation
└── 📁 logs/                # Application logs (created automatically)
```

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

**Essential Configuration:**
```bash
PORT=3001                    # Server port
JWT_SECRET=your-secret-key   # MUST change in production!
NODE_ENV=development         # development/production
FRONTEND_URL=http://localhost:3000  # Your frontend URL
```

**Security Settings:**
```bash
BCRYPT_SALT_ROUNDS=12       # Password hashing strength
RATE_LIMIT_MAX_REQUESTS=200 # API rate limiting
AUTH_RATE_LIMIT_MAX=10      # Auth attempt limiting
```

**Feature Flags:**
```bash
ENABLE_PDF_GENERATION=true  # Enable PDF downloads
ENABLE_FILE_UPLOADS=true    # Enable file uploads
ENABLE_EMAIL_NOTIFICATIONS=false  # Email features
```

## 🌐 Deployment

### 🚂 Railway (Recommended)
1. Connect your GitHub repository to [Railway](https://railway.app)
2. Set environment variables in Railway dashboard
3. Deploy automatically with git push

### 🟣 Heroku
```bash
# Install Heroku CLI, then:
heroku create your-app-name
heroku config:set JWT_SECRET=your-production-secret
heroku config:set NODE_ENV=production
git push heroku main
```

### ☁️ DigitalOcean App Platform
1. Create new app from GitHub repository
2. Configure environment variables in dashboard  
3. Deploy automatically

### 🐳 Docker (Optional)
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📈 Platform Statistics

| Category | Count | Description |
|----------|-------|-------------|
| 📚 **Subjects** | 10 | Across 5 major categories |
| 📖 **Lessons** | 52+ | Comprehensive lesson library |
| 🎯 **Exercises** | 1,820+ | Interactive learning activities |
| 🏷️ **Tags** | 10 | For advanced filtering |
| 👥 **User Roles** | 3 | Student, Teacher, Admin |
| 🌍 **Languages** | 6 | Full multilingual support |

## 🧪 Testing

### Run Tests
```bash
npm test                     # Run all tests
npm run test:watch          # Watch mode for development
npm run test:coverage       # Generate coverage report
```

### Manual Testing
1. Start server: `npm run dev`
2. Test endpoints with API client (Postman, Insomnia)
3. Use demo accounts for authentication testing
4. Verify all CRUD operations work correctly

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation for API changes
- Use meaningful commit messages

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3001
npx kill-port 3001
# or change PORT in .env file
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**JWT token issues:**
```bash
# Ensure JWT_SECRET is set in .env
# Must be at least 32 characters long
```

### Performance Optimization
- Use `NODE_ENV=production` for production deployments
- Enable gzip compression in reverse proxy (nginx, cloudflare)
- Consider implementing Redis for session management at scale
- Monitor memory usage for large datasets

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/educational-platform-backend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/educational-platform-backend/discussions)
- **Email**: support@yourplatform.com

## 🎯 Roadmap

### Upcoming Features
- [ ] 📊 Advanced analytics dashboard
- [ ] 🎮 Gamification system (badges, leaderboards)
- [ ] 🤖 AI-powered personalized learning paths
- [ ] 📱 Mobile app API endpoints
- [ ] 🔔 Real-time notifications
- [ ] 💬 Chat system for collaborative learning
- [ ] 🎥 Video lesson integration
- [ ] 📈 Advanced progress analytics

### Database Integration
- [ ] PostgreSQL integration
- [ ] MongoDB support for content management
- [ ] Redis for caching and sessions
- [ ] Database migration scripts

---

⭐ **Star this repository** if you find it helpful!

Built with ❤️ for educators and learners worldwide.