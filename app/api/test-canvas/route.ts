import { NextResponse } from 'next/server';

const CANVAS_API_URL = process.env.CANVAS_API_URL;
const CANVAS_API_TOKEN = process.env.CANVAS_API_TOKEN;

export async function GET() {
  if (!CANVAS_API_URL || !CANVAS_API_TOKEN) {
    return NextResponse.json({ error: 'Canvas API configuration is missing' }, { status: 500 });
  }

  try {
    const response = await fetch(`${CANVAS_API_URL}/courses`, {
      headers: {
        'Authorization': `Bearer ${CANVAS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        error: `Canvas API error: ${response.status} ${response.statusText}`,
        details: errorText
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Canvas API:', error);
    return NextResponse.json({ error: 'Failed to fetch from Canvas API' }, { status: 500 });
  }
}