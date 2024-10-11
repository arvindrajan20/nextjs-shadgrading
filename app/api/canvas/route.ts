import { NextResponse } from 'next/server';

const CANVAS_API_URL = process.env.CANVAS_API_URL;
const CANVAS_API_TOKEN = process.env.CANVAS_API_TOKEN;

async function canvasApiFetch(endpoint: string, options: RequestInit = {}) {
  if (!CANVAS_API_URL || !CANVAS_API_TOKEN) {
    throw new Error('Canvas API configuration is missing');
  }

  const url = `${CANVAS_API_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${CANVAS_API_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Canvas API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'testConnection') {
      const data = await canvasApiFetch('/courses');
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in Canvas API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { courseId, assignmentId, studentId, score } = await request.json();

  try {
    const endpoint = `/courses/${courseId}/assignments/${assignmentId}/submissions/${studentId}`;
    const data = await canvasApiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        submission: {
          posted_grade: score
        }
      }),
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting score to Canvas:', error);
    return NextResponse.json({ error: 'Failed to submit score' }, { status: 500 });
  }
}