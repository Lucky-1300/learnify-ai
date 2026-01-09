# 🎓 Learnify AI

An intelligent video learning platform that analyzes video content and generates personalized learning materials including summaries, key points, and interactive quizzes powered by AI.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Environment Setup](#environment-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **Video Analysis**: Submit video URLs for AI-powered analysis
- **Auto-Generated Summaries**: Extract key insights from video content
- **Key Points**: Automatically identify and list important learning points
- **Interactive Quizzes**: Generate dynamic quizzes to test understanding
- **Learning History**: Track all analyzed videos and past quizzes
- **User Authentication**: Secure login/register with JWT tokens
- **User Data Isolation**: Each user sees only their own analyses and history

### Security Features
- JWT-based authentication with 7-day expiration
- Protected API endpoints requiring valid tokens
- User-level data isolation on all endpoints
- Secure password storage
- CORS protection

### User Experience
- Clean, responsive interface built with Tailwind CSS
- Loading states and error handling throughout
- Expandable summary cards
- Progress-tracking quiz system
- Real-time search in history
- Professional gradient UI design

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **UI Components**: Custom components with Tailwind

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **AI Integration**: OpenAI GPT (mock data in development)
- **Development**: ES6 modules

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Package Managers**: npm (Node.js)

### Documentation
- API documentation with cURL examples
- Architecture documentation
- Deployment guides

## 📁 Project Structure

```
learnify-ai/
├── client/                      # React frontend (Vite)
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── common/          # Navbar, Footer, ErrorAlert
│   │   │   ├── video/           # VideoInput component
│   │   │   ├── summary/         # SummaryCard component
│   │   │   ├── keypoints/       # KeyPointsList component
│   │   │   └── quiz/            # QuizContainer, QuizResult
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx    # Main analysis page
│   │   │   ├── History.jsx      # User's analysis history
│   │   │   ├── auth/            # Login, Register pages
│   │   │   └── NotFound.jsx
│   │   ├── services/            # API service with Axios
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Utility functions
│   ├── .env.example             # Frontend env template
│   └── package.json
│
├── server/                      # Express backend
│   ├── controllers/             # Route handlers
│   │   ├── auth.controller.js   # Login, register logic
│   │   ├── ai.controller.js     # Video analysis logic
│   │   └── quiz.controller.js   # Quiz submission logic
│   ├── routes/                  # API routes
│   │   ├── auth.routes.js
│   │   ├── ai.routes.js
│   │   └── quiz.routes.js
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   ├── Video.js
│   │   ├── Quiz.js
│   │   └── Summary.js
│   ├── middlewares/             # Express middleware
│   │   ├── auth.middleware.js   # JWT protection
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── config/                  # Configuration files
│   │   ├── db.js                # MongoDB connection
│   │   └── env.js
│   ├── ai/                      # AI integration layer
│   │   ├── llmClient.js
│   │   ├── promptTemplates.js
│   │   └── outputValidator.js
│   ├── .env.example             # Backend env template
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   └── package.json
│
├── database/
│   ├── schema.sql               # Database schema
│   └── seed.js                  # Sample data seeding
│
├── deployment/                  # Docker & deployment configs
│   ├── Dockerfile.client
│   ├── Dockerfile.server
│   ├── nginx.conf
│   └── render-vercel-setup.md
│
├── docs/                        # Project documentation
│   ├── API-ENDPOINTS.md         # Full API reference
│   ├── architecture.md
│   ├── deployment-guide.md
│   ├── AUTH-IMPLEMENTATION.md
│   └── user-manual.md
│
├── tests/                       # Test files
│   ├── api.test.js
│   ├── quiz.test.js
│   └── ai.test.js
│
├── docker-compose.yml           # Multi-container setup
├── .env.example                 # Root env template
├── .gitignore                   # Git ignore rules
├── package.json                 # Root package config
└── README.md                    # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (v5.0 or higher)
  - Local installation OR
  - MongoDB Atlas (cloud) connection string
- **Git**
- **Docker & Docker Compose** (optional, for containerized setup)

## 🚀 Getting Started

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/learnify-ai.git
   cd learnify-ai
   ```

2. **Copy environment templates**
   ```bash
   # Root configuration
   cp .env.example .env
   
   # Server configuration
   cp server/.env.example server/.env
   
   # Client configuration
   cp client/.env.example client/.env.local
   ```

3. **Configure environment variables**

   **Root `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/learnify-ai
   JWT_SECRET=your-secret-key-min-32-chars
   OPENAI_API_KEY=your-openai-key
   VITE_API_BASE_URL=http://localhost:5000/api
   CORS_ORIGIN=http://localhost:5173
   ```

   **Server `.env` file:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/learnify-ai
   JWT_SECRET=your-secret-key-min-32-chars
   OPENAI_API_KEY=your-openai-key
   CORS_ORIGIN=http://localhost:5173
   ```

   **Client `.env.local` file:**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   ```bash
   # Local MongoDB
   mongod
   
   # OR use MongoDB Atlas connection string in MONGODB_URI
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   You should see: `Server running on port 5000`

### Frontend Setup

1. **Navigate to client directory** (in a new terminal)
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Vite will start on `http://localhost:5173`

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the backend** (Terminal 1)
   ```bash
   cd server
   npm start
   ```

3. **Start the frontend** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```

4. **Open browser and navigate to**
   ```
   http://localhost:5173
   ```

### Using Docker Compose (Optional)

To run the entire stack with Docker:

```bash
# Build and start all services
docker-compose up --build

# In another terminal, seed the database (optional)
docker-compose exec server node database/seed.js

# Stop services
docker-compose down
```

## 📚 API Documentation

Full API documentation is available in [docs/API-ENDPOINTS.md](docs/API-ENDPOINTS.md)

### Quick API Reference

**Authentication**
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user

**Video Analysis** (Protected)
- `POST /api/ai/analyze` - Submit video for analysis
- `GET /api/ai/history` - Get user's analysis history
- `GET /api/ai/:videoId` - Get specific analysis
- `DELETE /api/ai/:videoId` - Delete analysis

**Quiz** (Protected)
- `GET /api/quiz/:videoId` - Get quiz for video
- `POST /api/quiz/submit` - Submit quiz answers
- `POST /api/quiz/regenerate/:videoId` - Regenerate quiz

### Authentication
All protected endpoints require Bearer token in header:
```
Authorization: Bearer <your-jwt-token>
```

## 🎮 Usage

### 1. Register/Login
- Click "Register" to create a new account
- Enter email and password
- Login with your credentials

### 2. Analyze Video
- Navigate to Dashboard
- Enter a video URL
- Click "Analyze" button
- Wait for AI to process (mock data shows in ~2 seconds)

### 3. View Results
- **Summary**: Key insights from video
- **Key Points**: 5 main learning points with descriptions
- **Quiz**: 4 interactive questions to test knowledge

### 4. Take Quiz
- Answer all 4 questions
- Click "Submit Quiz"
- View detailed results with score breakdown

### 5. Review History
- Navigate to "History" page
- See all past analyses with stats
- Click to view full analysis details
- Delete analyses you no longer need

## 📸 Screenshots

### Authentication
**Login Page** - Clean, professional authentication interface
```
┌─────────────────────────────────┐
│  Login to Learnify AI           │
│                                 │
│  Email:    [_______________]    │
│  Password: [_______________]    │
│                                 │
│  [Login Button] [Sign Up Link]  │
└─────────────────────────────────┘
```

### Dashboard
**Main Feature** - Video analysis with integrated components
```
┌──────────────────────────────────────────┐
│ Dashboard > Analyze Videos               │
│                                          │
│ Enter video URL: [_______________] [Go]  │
│                                          │
│ ┌─ Summary ─────────────────────────┐   │
│ │ Key insights and overview...       │   │
│ └───────────────────────────────────┘   │
│                                          │
│ ┌─ Key Points ──────────────────────┐   │
│ │ 🎯 Point 1: ...                   │   │
│ │ 📌 Point 2: ...                   │   │
│ │ ⭐ Point 3: ...                   │   │
│ └───────────────────────────────────┘   │
│                                          │
│ ┌─ Quiz (2/4) ──────────────────────┐   │
│ │ Q: What is...?                    │   │
│ │ ○ Option A                        │   │
│ │ ○ Option B                        │   │
│ │ [Previous] [Next]                 │   │
│ └───────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### History Page
**Analytics** - Track all learning activities
```
┌──────────────────────────────────────────┐
│ Learning History                         │
│                                          │
│ Search: [_______________]                │
│                                          │
│ ┌─ Analysis 1 ──────────────────────┐   │
│ │ "Machine Learning Basics"         │   │
│ │ 📊 5 key points | 4 quiz questions│   │
│ │ Jan 9, 2026                       │   │
│ │ [View] [Delete]                   │   │
│ └───────────────────────────────────┘   │
│                                          │
│ ┌─ Analysis 2 ──────────────────────┐   │
│ │ "Web Development Guide"           │   │
│ │ 📊 5 key points | 4 quiz questions│   │
│ │ Jan 8, 2026                       │   │
│ │ [View] [Delete]                   │   │
│ └───────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### Quiz Results
**Performance Tracking** - Detailed score breakdown
```
┌──────────────────────────────────────────┐
│ Quiz Complete! 🎉                        │
│                                          │
│ Your Score: 85% ✅                       │
│ (3 out of 4 correct)                    │
│                                          │
│ ✓ Q1: Correct - Your answer matched     │
│ ✗ Q2: Incorrect - Expected "Option C"   │
│ ✓ Q3: Correct - Great job!              │
│ ✓ Q4: Correct - Perfect!                │
│                                          │
│ [Retake Quiz] [Back to Dashboard]       │
└──────────────────────────────────────────┘
```

## 🔧 Development

### Available Scripts

**Backend**
```bash
npm start          # Start server with nodemon
npm test           # Run tests
npm run lint       # Lint code
```

**Frontend**
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint code
```

### Making API Requests

**Test with cURL**
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Analyze video
curl -X POST http://localhost:5000/api/ai/analyze \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"videoUrl":"https://example.com/video","videoTitle":"My Video"}'
```

**Test with Postman**
- Import API collection from `docs/API-ENDPOINTS.md`
- Set environment variable: `{{base_url}} = http://localhost:5000/api`
- Set authorization header: `Bearer {{jwt_token}}`

## 🔐 Security Notes

- **Never commit `.env` files** - Use `.env.example` templates
- **JWT Secret**: Generate secure random string for production
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Password Security**: Passwords are hashed with bcryptjs
- **Token Expiration**: JWT tokens expire in 7 days
- **CORS**: Configure `CORS_ORIGIN` for production domain
- **API Rate Limiting**: Implement rate limiting in production

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
- Local: mongod command
- Atlas: Check connection string in .env
```

### API Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### CORS Error
```
Solution: Update CORS_ORIGIN in .env to match your frontend URL
Frontend: http://localhost:5173 → Server .env: CORS_ORIGIN=http://localhost:5173
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📖 Additional Resources

- [API Documentation](docs/API-ENDPOINTS.md)
- [Architecture Guide](docs/architecture.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Authentication Implementation](docs/AUTH-IMPLEMENTATION.md)
- [User Manual](docs/user-manual.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Standards
- Use ES6 modules
- Follow ESLint configuration
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API endpoint examples

---

**Happy Learning! 🚀**
