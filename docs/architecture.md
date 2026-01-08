# System Architecture – Learnify AI

Learnify AI follows a modular full-stack architecture designed for scalability, automation, and AI integration.

## Architecture Overview
The system is divided into five major layers:
1. Frontend (Client)
2. Backend (Server)
3. AI Processing Layer
4. Database Layer
5. External APIs

## Component Breakdown

### Frontend (React + JSX)
- Handles user interaction
- Accepts YouTube video URL
- Displays summary, key points, and quiz

### Backend (Node.js + Express)
- Manages API requests
- Extracts video transcripts
- Coordinates AI processing
- Sends structured responses to frontend

### AI Layer
- Processes transcript using NLP models
- Generates summary and key learning points
- Creates exactly 10 quiz questions
- Validates AI output consistency

### Database (Optional)
- Stores processed videos
- Saves summaries and quiz results

### External APIs
- YouTube Transcript API
- AI/LLM API

## Architecture Benefits
- Clean separation of concerns
- Scalable and maintainable
- Easy to extend features
