# Medical School Practice Test Application

## Overview
This Next.js application provides a platform for medical school students to take practice tests. It uses shadcn/ui components for the user interface and OpenAI's GPT-4 for automated grading.

## Current Features
1. **Interactive Test Interface**: Users can view and answer multiple medical-related questions.
2. **Dynamic Answer Input**: Each question has a text area for students to input their answers.
3. **Automated Grading**: Upon submission, the application uses GPT-4 to grade the answers automatically.
4. **Score Display**: After grading, the application displays individual scores for each question and a total score.
5. **Feedback**: The AI provides a one-sentence justification for each score.

## Technical Stack
- **Framework**: Next.js (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API (GPT-4)

## Key Components
1. `app/page.tsx`: The main page that renders the practice test.
2. `app/medical-practice-test.tsx`: Contains the core logic for displaying questions, handling user input, and managing the test state.
3. `app/api/score-answers/route.ts`: API route for processing and grading answers using GPT-4.
4. `app/layout.tsx`: The root layout component that applies global styles and fonts.

## Setup and Running
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your OpenAI API key: `OPENAI_API_KEY=your_api_key_here`
4. Run the development server: `npm run dev`
5. Open `http://localhost:3000` in your browser

## Future Development
This application serves as a foundation for more advanced features. Potential areas for expansion include:
- User authentication and profile management
- Saving and resuming tests
- Creating custom test sets
- Detailed analytics and progress tracking
- Timed test sessions

## Note
This is a base version of the application. Ensure to update this README as you add new features or make significant changes to the existing functionality.