import OpenAI from "openai";

let openaiClient = null;
const getOpenAI = () => {
  if (openaiClient) return openaiClient;
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key missing");
  }
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openaiClient;
};

/**
 * Generate summary from video transcript using OpenAI
 * @param {string} transcript - Video transcript text
 * @param {string} videoTitle - Title of the video
 * @returns {Promise<string>} - Summary text
 */
export const generateSummary = async (transcript, videoTitle) => {
  try {
    const prompt = `You are an AI assistant helping students learn from videos. 
    
Video Title: ${videoTitle}

Transcript:
${transcript.substring(0, 12000)} // Limit to ~3000 tokens

Task: Create a comprehensive summary (3-5 sentences) of the main ideas and key takeaways from this video. Focus on the most important concepts and learning points.

Summary:`;

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educational content analyzer who creates clear, concise summaries for students.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI Summary Error:", error.message);
    throw new Error("Failed to generate summary");
  }
};

/**
 * Generate key points from video transcript
 * @param {string} transcript - Video transcript text
 * @param {string} videoTitle - Title of the video
 * @returns {Promise<Array>} - Array of key points with title and description
 */
export const generateKeyPoints = async (transcript, videoTitle) => {
  try {
    const prompt = `You are an AI assistant helping students learn from videos.

Video Title: ${videoTitle}

Transcript:
${transcript.substring(0, 12000)}

Task: Extract exactly 5 key learning points from this video. For each point, provide:
1. A short title (3-6 words)
2. A brief description (1-2 sentences)

Format your response as a JSON array like this:
[
  {
    "title": "Understanding Key Concept",
    "description": "This section explains the fundamental principle behind..."
  },
  ...
]

Key Points:`;

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert at identifying and extracting key learning points from educational content. Always respond with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content.trim();
    
    // Parse JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const keyPoints = JSON.parse(jsonMatch[0]);
      return keyPoints.slice(0, 5); // Ensure exactly 5 points
    }

    throw new Error("Invalid key points format");
  } catch (error) {
    console.error("OpenAI Key Points Error:", error.message);
    throw new Error("Failed to generate key points");
  }
};

/**
 * Generate quiz questions from video transcript
 * @param {string} transcript - Video transcript text
 * @param {string} videoTitle - Title of the video
 * @returns {Promise<Array>} - Array of quiz questions
 */
export const generateQuiz = async (transcript, videoTitle) => {
  try {
    const prompt = `You are an AI assistant creating quiz questions for students.

Video Title: ${videoTitle}

Transcript:
${transcript.substring(0, 12000)}

Task: Create exactly 4 multiple-choice quiz questions based on the content of this video.

For each question:
1. questionText: A clear, specific question
2. options: An array of exactly 4 possible answers
3. correctAnswer: The correct option (must match one of the options exactly)

Make questions test understanding, not just recall. Include a mix of difficulty levels.

Format as JSON array:
[
  {
    "questionText": "What is the main purpose of...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option B"
  },
  ...
]

Quiz Questions:`;

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert quiz creator for educational content. Always respond with valid JSON containing exactly 4 questions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.8,
    });

    const content = response.choices[0].message.content.trim();
    
    // Parse JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const quiz = JSON.parse(jsonMatch[0]);
      return quiz.slice(0, 4); // Ensure exactly 4 questions
    }

    throw new Error("Invalid quiz format");
  } catch (error) {
    console.error("OpenAI Quiz Error:", error.message);
    throw new Error("Failed to generate quiz");
  }
};
