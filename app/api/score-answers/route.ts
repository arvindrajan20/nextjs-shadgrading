import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const questions = await request.json();

  const scoredQuestions = await Promise.all(questions.map(async (question: any) => {
    const prompt = `
      Question: ${question.text}
      Student's Answer: ${question.answer}
      Max Points: ${question.points}

      Please evaluate the student's answer and provide:
      1. A score out of ${question.points} points
      2. A one-sentence justification for the score

      Format your response as JSON:
      {
        "score": <number>,
        "feedback": "<one-sentence justification>"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return {
      ...question,
      score: result.score,
      feedback: result.feedback,
    };
  }));

  return NextResponse.json(scoredQuestions);
}