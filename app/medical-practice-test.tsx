"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { submitScore } from "@/lib/canvas-api"

// Replace simulated data with real course data
const ltiLaunchData = {
  courseId: "10423967", // Use the ID of your "CBL Test Course"
  assignmentId: "50151886", // You'll need to create an assignment in Canvas and use its ID
  studentId: "113980607", // This is your user ID as shown in the enrollments
}

// Simulated questions (replace with actual API call in production)
const questions = [
  { id: 1, text: "Describe the function of the mitochondria in a cell.", points: 3 },
  { id: 2, text: "What is the role of insulin in the body?", points: 4 },
  { id: 3, text: "Explain the process of synaptic transmission.", points: 5 },
  { id: 4, text: "What are the main components of blood and their functions?", points: 4 },
  { id: 5, text: "Describe the stages of the cardiac cycle.", points: 4 },
]

interface Grade {
  score: number;
  feedback: string;
}

export default function MedicalPracticeTest() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [grades, setGrades] = useState<Grade[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ltiData] = useState(ltiLaunchData)
  const [totalScore, setTotalScore] = useState(0)
  const [totalPossibleScore, setTotalPossibleScore] = useState(0)

  useEffect(() => {
    // Simulate LTI launch
    console.log("Simulated LTI launch with data:", ltiData)
    
    // Calculate total possible score
    const possibleScore = questions.reduce((sum, question) => sum + question.points, 0)
    setTotalPossibleScore(possibleScore)
  }, [ltiData])

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    try {
      console.log('Starting handleSubmit function');
      const response = await fetch('/api/score-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questions.map((q, i) => ({ ...q, answer: answers[i] }))),
      });
      console.log('Received response from /api/score-answers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newGrades: Grade[] = await response.json();
      console.log('Parsed grades:', newGrades);
      setGrades(newGrades);
      setIsSubmitted(true);

      // Calculate total score
      const score = newGrades.reduce((sum, grade) => sum + grade.score, 0)
      setTotalScore(score)
      console.log('Calculated total score:', score);

      // Submit score to Canvas
      console.log('Attempting to submit score to Canvas...', {
        courseId: ltiData.courseId,
        assignmentId: ltiData.assignmentId,
        studentId: ltiData.studentId,
        score
      });
      const result = await submitScore(
        ltiData.courseId, 
        ltiData.assignmentId, 
        ltiData.studentId,
        score  // Send the raw score instead of percentage
      );
      console.log("Score submitted to Canvas successfully:", result);
      
      alert(`Test completed and score of ${score} points submitted to Canvas successfully!`);
    } catch (error) {
      console.error("Error during submission process:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      alert("An error occurred while submitting the score. Please check the console for details.");
    }
  }

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
            {isSubmitted && grades[index] && (
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