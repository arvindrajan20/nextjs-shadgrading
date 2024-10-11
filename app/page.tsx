"use client";

import { useState } from 'react';
import MedicalPracticeTest from './medical-practice-test';
import { Button } from "@/components/ui/button"
import { testCanvasConnection } from '@/lib/canvas-api';

export default function Home() {
  const [canvasTestResult, setCanvasTestResult] = useState<string | null>(null);

  const handleTestCanvasConnection = async () => {
    try {
      const result = await testCanvasConnection();
      setCanvasTestResult(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error in handleTestCanvasConnection:', error);
      setCanvasTestResult('Error connecting to Canvas API: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Button onClick={handleTestCanvasConnection} className="mb-4">
        Test Canvas Connection
      </Button>
      {canvasTestResult && (
        <pre className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-40">
          {canvasTestResult}
        </pre>
      )}
      <MedicalPracticeTest />
    </div>
  );
}
