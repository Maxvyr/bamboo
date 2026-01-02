/**
 * Client-side API wrapper for generating Bangboo images
 * Calls our secure API route instead of Gemini directly
 */

interface GenerateResponse {
  imageUrl?: string;
  error?: string;
}

export async function generateBangbooImage(
  userImageBase64: string,
  mimeType: string,
  mood: string,
  style: string,
  referenceImageBase64?: string
): Promise<string> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userImageBase64,
      mimeType,
      mood,
      style,
      referenceImageBase64,
    }),
  });

  const data: GenerateResponse = await response.json();

  if (!response.ok) {
    // Handle rate limiting
    if (response.status === 429) {
      const resetIn = response.headers.get('X-RateLimit-Reset');
      throw new Error(`Rate limit exceeded. Please wait ${resetIn || '60'} seconds.`);
    }

    throw new Error(data.error || 'Failed to generate image');
  }

  if (!data.imageUrl) {
    throw new Error('No image returned from server');
  }

  return data.imageUrl;
}
