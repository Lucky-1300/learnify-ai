# Learnify AI - API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Authentication Routes (`/auth`)

### Register User
- **Endpoint**: `POST /auth/register`
- **Protected**: No
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
- **Endpoint**: `POST /auth/login`
- **Protected**: No
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## AI/Video Analysis Routes (`/ai`)

### Analyze Video
- **Endpoint**: `POST /ai/analyze`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Analyze a video and generate summary, key points, and quiz
- **Request Body**:
```json
{
  "videoUrl": "https://www.youtube.com/watch?v=...",
  "videoTitle": "My Video Title (optional)"
}
```
- **Response** (201):
```json
{
  "_id": "video_id",
  "videoUrl": "https://www.youtube.com/watch?v=...",
  "videoTitle": "My Video Title",
  "summary": "This video provides a comprehensive overview...",
  "keyPoints": [
    {
      "title": "Understanding the Fundamentals",
      "description": "Learn the core concepts..."
    },
    ...
  ],
  "quiz": [
    {
      "_id": "q1",
      "questionText": "What is the primary focus?",
      "options": ["Option 1", "Option 2", ...],
      "correctAnswer": "Option 1"
    },
    ...
  ],
  "status": "completed",
  "createdAt": "2026-01-09T10:30:00Z"
}
```

### Get Analysis History
- **Endpoint**: `GET /ai/history`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Fetch all video analyses for the authenticated user
- **Query Parameters**: None
- **Response** (200):
```json
[
  {
    "_id": "video_id",
    "videoUrl": "https://...",
    "videoTitle": "Video Title",
    "summary": "...",
    "keyPoints": [...],
    "quiz": [...],
    "status": "completed",
    "createdAt": "2026-01-09T10:30:00Z"
  },
  ...
]
```

### Get Video Analysis
- **Endpoint**: `GET /ai/:videoId`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Get a specific video analysis by ID
- **URL Parameters**:
  - `videoId` (required): Video document ID (MongoDB ObjectId)
- **Response** (200):
```json
{
  "_id": "video_id",
  "videoUrl": "https://...",
  "videoTitle": "Video Title",
  "summary": "...",
  "keyPoints": [...],
  "quiz": [...],
  "transcript": "Full transcript text...",
  "status": "completed",
  "createdAt": "2026-01-09T10:30:00Z",
  "updatedAt": "2026-01-09T10:35:00Z"
}
```
- **Error Response** (404):
```json
{
  "message": "Video not found"
}
```

### Delete Video Analysis
- **Endpoint**: `DELETE /ai/:videoId`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Delete a video analysis permanently
- **URL Parameters**:
  - `videoId` (required): Video document ID
- **Response** (200):
```json
{
  "message": "Video analysis deleted successfully"
}
```
- **Error Response** (404):
```json
{
  "message": "Video analysis not found"
}
```

---

## Quiz Routes (`/quiz`)

### Get Video Quiz
- **Endpoint**: `GET /quiz/:videoId`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Get quiz questions for a specific video (without answers)
- **URL Parameters**:
  - `videoId` (required): Video document ID
- **Response** (200):
```json
{
  "videoId": "video_id",
  "videoTitle": "Video Title",
  "totalQuestions": 4,
  "quiz": [
    {
      "_id": "q1",
      "questionText": "What is the primary focus?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    ...
  ]
}
```
- **Error Response** (404):
```json
{
  "message": "No quiz available for this video"
}
```

### Submit Quiz Answers
- **Endpoint**: `POST /quiz/submit`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Submit quiz answers and get the score
- **Request Body**:
```json
{
  "videoId": "video_id",
  "answers": {
    "q1": "Option 1",
    "q2": "Option 2",
    "q3": "Option 1",
    "q4": "Option 3"
  }
}
```
- **Response** (200):
```json
{
  "videoId": "video_id",
  "videoTitle": "Video Title",
  "totalQuestions": 4,
  "correctAnswers": 3,
  "score": 75.00,
  "results": [
    {
      "questionId": "q1",
      "questionText": "What is the primary focus?",
      "userAnswer": "Option 1",
      "correctAnswer": "Option 1",
      "isCorrect": true
    },
    ...
  ]
}
```

### Regenerate Quiz
- **Endpoint**: `POST /quiz/regenerate/:videoId`
- **Protected**: ✅ Yes (JWT Required)
- **Description**: Regenerate quiz for a video (future enhancement)
- **URL Parameters**:
  - `videoId` (required): Video document ID
- **Response** (200):
```json
{
  "message": "Quiz regeneration started. Please check back soon.",
  "videoId": "video_id"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Video URL is required"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized"
}
```

### 404 Not Found
```json
{
  "message": "Video not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to analyze video",
  "error": "Error details..."
}
```

---

## Security Notes

✅ **Protected Routes**: All `/ai` and `/quiz` endpoints require JWT authentication
✅ **User Isolation**: Each user can only access their own analyses and quizzes
✅ **Token Validation**: Invalid or expired tokens will return 401 Unauthorized
✅ **Data Validation**: All inputs are validated before processing

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'
```

### Analyze Video
```bash
curl -X POST http://localhost:5000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"videoUrl":"https://...","videoTitle":"My Video"}'
```

### Get History
```bash
curl -X GET http://localhost:5000/api/ai/history \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Submit Quiz
```bash
curl -X POST http://localhost:5000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"videoId":"VIDEO_ID","answers":{"q1":"Option 1","q2":"Option 2"}}'
```
