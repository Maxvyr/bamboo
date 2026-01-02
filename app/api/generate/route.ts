import { NextRequest, NextResponse } from 'next/server';
import { generateBangbooImage } from '@/lib/geminiService';
import { checkRateLimit } from '@/lib/rateLimit';

interface GenerateRequest {
  userImageBase64: string;
  mimeType: string;
  mood: string;
  style: string;
  referenceImageBase64?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
          },
        }
      );
    }

    // Parse request body
    const body: GenerateRequest = await request.json();

    // Validate required fields
    if (!body.userImageBase64 || !body.mimeType || !body.mood || !body.style) {
      return NextResponse.json(
        { error: 'Missing required fields: userImageBase64, mimeType, mood, style' },
        { status: 400 }
      );
    }

    // Validate mime type
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedMimeTypes.includes(body.mimeType)) {
      return NextResponse.json(
        { error: 'Invalid image type. Allowed: PNG, JPEG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate mood and style
    const allowedMoods = ['default', 'happy', 'grumpy', 'combat', 'lazy'];
    const allowedStyles = ['3d', 'flat'];

    if (!allowedMoods.includes(body.mood)) {
      return NextResponse.json(
        { error: 'Invalid mood selection' },
        { status: 400 }
      );
    }

    if (!allowedStyles.includes(body.style)) {
      return NextResponse.json(
        { error: 'Invalid style selection' },
        { status: 400 }
      );
    }

    // Generate image using Gemini
    const imageUrl = await generateBangbooImage({
      userImageBase64: body.userImageBase64,
      userImageMimeType: body.mimeType,
      mood: body.mood,
      style: body.style,
      referenceImageBase64: body.referenceImageBase64,
    });

    return NextResponse.json(
      { imageUrl },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
