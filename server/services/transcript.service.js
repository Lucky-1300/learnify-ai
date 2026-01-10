import { YoutubeTranscript } from "youtube-transcript";

/**
 * Extract transcript from YouTube video URL
 * @param {string} videoUrl - YouTube video URL
 * @returns {Promise<string>} - Full transcript text
 */
export const extractTranscript = async (videoUrl) => {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // Fetch transcript with language fallbacks
    const transcriptArray = await fetchTranscriptWithFallbacks(videoId);
    
    // Combine all transcript segments into single text
    const fullTranscript = transcriptArray
      .map((item) => item.text)
      .join(" ")
      .replace(/\[Music\]/g, "")
      .replace(/\[Applause\]/g, "")
      .trim();

    return fullTranscript;
  } catch (error) {
    console.error("Transcript extraction error:", error.message);
    throw new Error(`Failed to extract transcript: ${error.message}`);
  }
};

/**
 * Try fetching transcript with multiple strategies/languages
 * @param {string} videoId
 * @returns {Promise<Array>}
 */
const fetchTranscriptWithFallbacks = async (videoId) => {
  const attempts = [
    { desc: "default", opts: undefined },
    { desc: "lang=en", opts: { lang: "en" } },
    { desc: "lang=en-US", opts: { lang: "en-US" } },
    { desc: "lang=en-GB", opts: { lang: "en-GB" } },
  ];

  let lastError;
  for (const attempt of attempts) {
    try {
      console.log(`Trying transcript fetch (${attempt.desc})...`);
      const arr = attempt.opts
        ? await YoutubeTranscript.fetchTranscript(videoId, attempt.opts)
        : await YoutubeTranscript.fetchTranscript(videoId);
      if (Array.isArray(arr) && arr.length) return arr;
    } catch (err) {
      lastError = err;
      console.warn(`Transcript attempt failed (${attempt.desc}):`, err.message);
    }
  }
  throw lastError || new Error("Transcript not available");
};

/**
 * Extract video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null
 */
const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Get video title from YouTube (optional enhancement)
 * For now, we'll rely on user-provided title
 */
export const getVideoTitle = (videoUrl) => {
  const videoId = extractVideoId(videoUrl);
  return videoId ? `YouTube Video ${videoId}` : "Unknown Video";
};
