# 📚 Educational Platform API Documentation

Complete API reference for the Educational Platform Backend.

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "demo@example.com",
    "firstName": "Demo",
    "lastName": "User",
    "role": "student",
    "subscription": "free"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📊 System Health

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "stats": {
    "subjects": 10,
    "lessons": 52,
    "exercises": 1820,
    "users": 3,
    "tags": 10
  },
  "version": "2.0.0"
}
```

## 📚 Subjects

### Get All Subjects
```http
GET /api/subjects?category=STEM&search=math&language=en
Authorization: Bearer <token>
```

**Query Parameters:**
- `category` (optional): Filter by category (STEM, Humanities, Languages, Arts, Social Sciences)
- `search` (optional): Search in name and description
- `language` (optional): Response language (en, el, de, it, fr, tr)

**Response:**
```json
{
  "subjects": [
    {
      "id": 1,
      "name": "Mathematics",
      "description": "Numbers, algebra, geometry, calculus and statistics",
      "color": "from-blue-500 to-purple-600",
      "icon": "🔢",
      "category": "STEM",
      "lessonsCount": 8
    }
  ],
  "categories": ["STEM", "Humanities", "Languages", "Arts", "Social Sciences"],
  "total": 1
}
```

## 📖 Lessons

### Get Lessons with Filtering
```http
GET /api/lessons?subjectId=1&level=beginner&tags=1,4&isFree=true&page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
- `subjectId` (optional): Filter by subject ID
- `level` (optional): beginner, intermediate, advanced
- `tags` (optional): Comma-separated tag IDs
- `search` (optional): Search in title and description
- `isFree` (optional): true/false for free lessons only
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 20)
- `language` (optional): Response language

**Response:**
```json
{
  "lessons": [
    {
      "id": 1,
      "subjectId": 1,
      "subjectName": "Mathematics",
      "subjectIcon": "🔢",
      "title": "Basic Arithmetic",
      "description": "Master addition, subtraction, multiplication, division",
      "level": "beginner",
      "estimatedTime": 45,
      "isFree": true,
      "hasAccess": true,
      "exerciseCount": 35,
      "tags": [
        {
          "id": 1,
          "name": "Beginner",
          "color": "green"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "filters": {
    "levels": ["beginner", "intermediate", "advanced"],
    "tags": [
      { "id": 1, "name": "Beginner", "color": "green" }
    ],
    "subjects": [
      { "id": 1, "name": "Mathematics" }
    ]
  }
}
```

### Get Specific Lesson with Exercises
```http
GET /api/lessons/1
Authorization: Bearer <token>
```

**Response:**
```json
{
  "lesson": {
    "id": 1,
    "title": "Basic Arithmetic",
    "description": "Master addition, subtraction, multiplication, division",
    "level": "beginner",
    "estimatedTime": 45,
    "exerciseCount": 35,
    "exercises": [
      {
        "id": 1,
        "questionNumber": 1,
        "question": "Calculate: 7 + 5 = ?",
        "type": "text_input",
        "points": 5,
        "difficulty": "easy"
      },
      {
        "id": 2,
        "questionNumber": 2,
        "question": "What is 6 × 4?",
        "type": "multiple_choice",
        "options": [
          { "id": "a", "text": "20" },
          { "id": "b", "text": "22" },
          { "id": "c", "text": "24" },
          { "id": "d", "text": "26" }
        ],
        "points": 10,
        "difficulty": "easy"
      }
    ],
    "progress": null
  }
}
```

## 🎯 Learning & Progress

### Submit Exercise Answer
```http
POST /api/lessons/1/exercises/1/answer
Authorization: Bearer <token>
Content-Type: application/json

{
  "answer": "12"
}
```

**Response:**
```json
{
  "isCorrect": true,
  "correctAnswer": "12",
  "explanation": "Correct! 7 + 5 = 12",
  "points": 5,
  "totalScore": 15,
  "progress": 8.57,
  "isLessonCompleted": false
}
```

### Get User Statistics
```http
GET /api/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalLessonsCompleted": 3,
  "totalLessonsAvailable": 52,
  "totalScore": 450,
  "averageScore": 150,
  "subjectStats": {
    "1": {
      "name": "Mathematics",
      "completed": 2,
      "total": 8,
      "percentage": 25
    }
  },
  "recentActivity": [
    {
      "lessonTitle": "Basic Arithmetic",
      "subjectName": "Mathematics",
      "score": 45,
      "isCompleted": true,
      "date": "2024-01-15T09:30:00.000Z"
    }
  ]
}
```

## 🔍 Search

### Global Search
```http
GET /api/search?q=algebra&type=lessons&language=en
Authorization: Bearer <token>
```

**Query Parameters:**
- `q` (required): Search query
- `type` (optional): all, subjects, lessons, exercises
- `language` (optional): Response language

**Response:**
```json
{
  "query": "algebra",
  "results": {
    "subjects": [
      {
        "id": 1,
        "name": "Mathematics",
        "description": "Numbers, algebra, geometry, calculus",
        "type": "subject",
        "icon": "🔢",
        "color": "from-blue-500 to-purple-600"
      }
    ],
    "lessons": [
      {
        "id": 2,
        "title": "Algebra Fundamentals",
        "description": "Learn variables, equations, algebraic expressions",
        "type": "lesson",
        "subjectName": "Mathematics",
        "level": "intermediate",
        "exerciseCount": 35
      }
    ],
    "exercises": []
  },
  "total": 2
}
```

## 🏷️ Tags

### Get All Tags
```http
GET /api/tags
Authorization: Bearer <token>
```

**Response:**
```json
{
  "tags": [
    {
      "id": 1,
      "name": "Beginner",
      "color": "green"
    },
    {
      "id": 2,
      "name": "Intermediate", 
      "color": "yellow"
    },
    {
      "id": 3,
      "name": "Advanced",
      "color": "red"
    }
  ]
}
```

## 👨‍💼 Admin Endpoints

*Requires admin role*

### Create Subject
```http
POST /api/admin/subjects
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": {
    "en": "Philosophy",
    "el": "Φιλοσοφία"
  },
  "description": {
    "en": "Logic, ethics, metaphysics",
    "el": "Λογική, ηθική, μεταφυσική"
  },
  "color": "from-indigo-500 to-purple-600",
  "icon": "🤔",
  "category": "Humanities"
}
```

### Create Lesson
```http
POST /api/admin/lessons
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "subjectId": 1,
  "title": {
    "en": "Advanced Calculus",
    "el": "Προχωρημένος Λογισμός"
  },
  "description": {
    "en": "Limits, derivatives, integrals",
    "el": "Όρια, παράγωγοι, ολοκληρώματα"
  },
  "level": "advanced",
  "estimatedTime": 60,
  "isFree": false,
  "tags": [3, 6, 9]
}
```

### Create Exercise
```http
POST /api/admin/exercises
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "lessonId": 1,
  "question": {
    "en": "What is the derivative of x²?",
    "el": "Ποια είναι η παράγωγος του x²;"
  },
  "type": "text_input",
  "correctAnswer": "2x",
  "explanation": {
    "en": "Using the power rule: d/dx(x²) = 2x",
    "el": "Χρησιμοποιώντας τον κανόνα δύναμης: d/dx(x²) = 2x"
  },
  "points": 15,
  "difficulty": "medium"
}
```

### Export All Data
```http
GET /api/admin/export
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "subjects": [...],
  "lessons": [...],
  "exercises": [...],
  "tags": [...],
  "users": [...],
  "userProgress": [...],
  "exportedAt": "2024-01-15T10:30:00.000Z"
}
```

## 📊 Rate Limiting

The API implements rate limiting to prevent abuse:

- **General API**: 200 requests per 15 minutes
- **Authentication**: 10 attempts per 15 minutes
- **Admin operations**: 50 requests per 15 minutes

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 195
X