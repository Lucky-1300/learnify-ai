# API Documentation – Learnify AI

## Base URL
http://localhost:5000/api

## Endpoints

### POST /analyze-video
Analyzes YouTube video content.

Request Body:
{
  "videoUrl": "https://youtube.com/..."
}

Response:
{
  "summary": "...",
  "keyPoints": [],
  "quiz": []
}

---

### GET /history
Returns previously analyzed videos.

---

### POST /quiz/submit
Accepts quiz answers and returns score.
