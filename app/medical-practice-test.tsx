"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Simulated questions (replace with actual API call in production)
const questions = [
  { id: 1, text: "Describe the function of the mitochondria in a cell.", points: 3 },
  { id: 2, text: "What is the role of insulin in the body?", points: 4 },
  { id: 3, text: "Explain the process of synaptic transmission.", points: 5 },
  { id: 4, text: "What are the main components of blood and their functions?", points: 4 },
  { id: 5, text: "Describe the stages of the cardiac cycle.", points: 4 },
]

export default function MedicalPracticeTest() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [grades, setGrades] = useState<{ score: number; feedback: string }[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    const response = await fetch('/api/score-answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questions.map((q, i) => ({ ...q, answer: answers[i] }))),
    });
    const newGrades = await response.json();
    setGrades(newGrades);
    setIsSubmitted(true);
  }

  const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0)
  const totalPossibleScore = questions.reduce((sum, question) => sum + question.points, 0)

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Medical School Practice Test</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {question.id}. {question.text} ({question.points} points)
            </h3>
            <Textarea
              placeholder="Your answer"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="mb-2"
              disabled={isSubmitted}
            />
            {isSubmitted && (
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm italic">{grades[index].feedback}</p>
                <span className="font-semibold">Score: {grades[index].score}/{question.points}</span>
              </div>
            )}
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <Button onClick={handleSubmit} disabled={isSubmitted}>
            Submit for Grading
          </Button>
          <div className="flex items-center">
            <span className="mr-2 font-semibold">Total Score:</span>
            <Input
              value={isSubmitted ? `${totalScore}/${totalPossibleScore}` : ""}
              placeholder="Your score will appear here"
              disabled
              className="w-32 text-center"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}