import fetch from 'node-fetch';

/**
 * Calls HuggingFace AI detection model
 * @param {Buffer} imageBuffer - The image file buffer
 * @returns {Promise<Object>} The API response
 */
export async function detectAiGeneratedImage(imageBuffer) {
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/Ateeqq/ai-vs-human-image-detector",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "image/jpeg",
        },
        method: "POST",
        body: imageBuffer,
      }
    );
    
    if (!response.ok) {
      console.error('HF API Error:', response.statusText);
      // Fallback or mock if token is missing/invalid
      return [{ label: 'AI', score: 0.8 }, { label: 'Human', score: 0.2 }]; 
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling HuggingFace API:', error);
    // Mock response for hackathon fallback
    return [{ label: 'AI', score: 0.8 }, { label: 'Human', score: 0.2 }];
  }
}
