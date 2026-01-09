import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
      default: 'Untitled Video',
    },
    duration: {
      type: Number,
      default: 0,
    },
    transcript: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    keyPoints: [
      {
        title: String,
        description: String,
      },
    ],
    quiz: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        questionText: String,
        options: [String],
        correctAnswer: String,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    error: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
videoSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Video', videoSchema);
