import React, { useState, useEffect } from 'react';

// Sample question set
const questionList = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: '4',
  },
  {
    question: 'What is the capital of England?',
    options: ['London', 'Paris', 'Berlin', 'Rome'],
    answer: 'London',
  },
  {
    question: 'Which planet is closest to the sun?',
    options: ['Earth', 'Venus', 'Mercury', 'Mars'],
    answer: 'Mercury',
  },
  {
    question: 'What is the color of the sky on a clear day?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    answer: 'Blue',
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Tiger', 'Elephant', 'Lion', 'Bear'],
    answer: 'Lion',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 'Pacific',
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Diamond', 'Iron', 'Silver'],
    answer: 'Diamond',
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ['Shakespeare', 'Dickens', 'Hemingway', 'Austen'],
    answer: 'Shakespeare',
  },
  {
    question: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
  {
    question: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'South Korea', 'Japan', 'India'],
    answer: 'Japan',
  },
  {
    question: 'What is the boiling point of water in Celsius?',
    options: ['90°C', '100°C', '110°C', '120°C'],
    answer: '100°C',
  },
  {
    question: 'In what year did the Titanic sink?',
    options: ['1900', '1912', '1920', '1930'],
    answer: '1912',
  },
  {
    question: 'What is the formula for water?',
    options: ['H2O', 'CO2', 'O2', 'H2'],
    answer: 'H2O',
  },
  {
    question: "What element does 'O' represent on the periodic table?",
    options: ['Oxygen', 'Osmium', 'Ozone', 'Opium'],
    answer: 'Oxygen',
  },
  {
    question: 'What is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    answer: 'Nile',
  },
  {
    question: 'Which famous scientist developed the theory of relativity?',
    options: [
      'Isaac Newton',
      'Galileo Galilei',
      'Albert Einstein',
      'Nikola Tesla',
    ],
    answer: 'Albert Einstein',
  },
  {
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'],
    answer: 'Canberra',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: [
      'Pablo Picasso',
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Claude Monet',
    ],
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'Which language is the most spoken in the world?',
    options: ['English', 'Mandarin', 'Spanish', 'Arabic'],
    answer: 'Mandarin',
  },
  {
    question: 'What is the capital of Canada?',
    options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    answer: 'Ottawa',
  },
];

const QuizComponent = ({
  userLives,
  setUserLives,
  userPoints,
  setUserPoints,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(10); // 10 seconds per question
  const [answerStatus, setAnswerStatus] = useState(null); // Correct/Incorrect answer feedback
  const [isGameOver, setIsGameOver] = useState(false); // Track if game is over

  useEffect(() => {
    if (timer === 0) {
      handleAnswer(); // Automatically submit answer if timer hits 0
    }

    const timerInterval = setInterval(() => {
      if (timer > 0 && !isGameOver) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, isGameOver]);

  const handleAnswer = () => {
    const currentQuestion = questionList[currentQuestionIndex];

    // Update points based on answer correctness
    if (selectedAnswer === currentQuestion.answer) {
      setUserPoints((prev) => prev + 2); // Add 2 points for correct answer
      setAnswerStatus('Correct!');
    } else {
      setUserPoints((prev) => Math.max(prev - 2, 0)); // Deduct 1 point for incorrect answer, prevent negative points
      setAnswerStatus('Incorrect!');
    }

    // If points are 0, give the option to use a life to restore points
    if (userPoints === 0 && userLives > 0) {
      setUserLives((prev) => prev - 1); // Deduct a life
      setUserPoints(2); // Restore 2 points for the life
    }

    // Move to next question or end quiz if lives are over
    if (userLives > 0 && currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(10); // Reset timer for next question
      setSelectedAnswer(null); // Reset selected answer
    } else if (userLives <= 0 && userPoints === 0) {
      // End the game if no lives and 0 points
      setAnswerStatus('Game Over!');
      setIsGameOver(true);
    } else if (currentQuestionIndex === questionList.length - 1) {
      // Add bonus points for remaining lives if all questions answered
      setUserPoints((prev) => prev + 5 * userLives);
      setAnswerStatus(
        'Game Over! Final Score: ' + (userPoints + 5 * userLives)
      );
      setIsGameOver(true);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option); // Set the selected answer
  };

  const handleRetry = () => {
    // Reset game state to retry
    setUserLives(3);
    setUserPoints(2);
    setCurrentQuestionIndex(0);
    setAnswerStatus(null);
    setTimer(10);
    setIsGameOver(false);
  };

  // Render the quiz only if the game is not over
  if (isGameOver) {
    return (
      <div className="quiz-container text-white text-xl w-10/12">
        <div className="game-over mt-4">
          <p>Game Over! Your Final Score is {userPoints}</p>
          <button
            onClick={handleRetry}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container text-white text-xl w-10/12">
      <h2 className="text-3xl text-orange-500">
        Question {currentQuestionIndex + 1}
      </h2>

      <div className="score-box text-white mb-4">
        <p>
          <strong>Score: </strong>
          {userPoints}
        </p>
        <p>
          <strong>Lives: </strong>
          {userLives}
        </p>
      </div>

      <div className="question-box text-white m-3.5 text-start">
        <p>{questionList[currentQuestionIndex].question}</p>
        <ul className="mt-4">
          {questionList[currentQuestionIndex].options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`option-item cursor-pointer p-2 mb-2 rounded ${
                selectedAnswer === option ? 'bg-blue-500' : 'bg-gray-700'
              }`}>
              {option}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback-box mt-4">
        <p>Time Remaining: {timer}s</p>
        {answerStatus && <p>{answerStatus}</p>}
      </div>

      <div className="controls mt-4">
        <button
          onClick={handleAnswer}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          disabled={selectedAnswer === null}>
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
