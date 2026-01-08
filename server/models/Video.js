const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

module.exports = mongoose.model('Video', videoSchema);
