export async function submitScore(courseId: string, assignmentId: string, studentId: string, score: number) {
  try {
    const response = await fetch('/api/canvas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId, assignmentId, studentId, score }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Score submitted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error submitting score to Canvas:', error);
    throw error;
  }
}

export async function testCanvasConnection() {
  try {
    const response = await fetch('/api/canvas?action=testConnection');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Successfully connected to Canvas API:', data);
    return data;
  } catch (error) {
    console.error('Failed to connect to Canvas API:', error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return 'An unknown error occurred';
  }
}