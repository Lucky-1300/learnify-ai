const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: [String],
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
    totalQuestions: {
      type: Number,
      default: 10,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
