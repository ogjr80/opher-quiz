// src/QuizStepper.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebase';


function QuizStepper({questions}) {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const [ca,setCa] = useState(0)

  
  const handleOptionChange = (questionId, option) => {
    const isCorrect = questions.find(q => q.id === questionId).answer === option;
    setResponses({ ...responses, [questionId]: { answer: option, isCorrect } });
  };
  
  const handleSubmit = async () => {
    const correctAnswers = Object.values(responses).reduce((acc, response) => {
      return acc + (response.isCorrect ? 1 : 0);
    }, 0);
  
    const calculatedScore = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
  
    const results = {
      responses,
      correctAnswers,
      totalQuestions: questions.length,
      score: calculatedScore,
    };
  
    try {
      await addDoc(collection(firestore, 'quizResults'), results);
      alert('Results saved!');
    } catch (error) {
      console.error('Error saving results: ', error);
      alert('Failed to save results.');
    }
  };
  

  const currentQuestion = questions[step];
  console.log(responses); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Quiz: WebSockets</h1>
      <h2 className="text-xl font-bold mb-2">{currentQuestion.question}</h2>
      <form>
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <div key={key} className="mb-2">
            <input
              
              type="radio"
              id={`${currentQuestion.id}-${key}`}
              name={`question-${currentQuestion.id}`}
              value={key}
              checked={responses[currentQuestion.id] === key}
              onChange={() => handleOptionChange(currentQuestion.id, key)}
              className="mr-2"
            />
            <label htmlFor={`${currentQuestion.id}-${key}`}>{value}</label>
          </div>
        ))}
        <div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
          )}
          {step < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        {score !== null && (
          <div className="mt-4">
            <p>
              Your score is {score.toFixed(1)}% ({ca} out of {questions.length} correct)
            </p>
          </div>
        )}
      </div>
    );
  }
  
  export default QuizStepper;
  