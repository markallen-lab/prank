import React, { useState, useEffect } from 'react';

// Sample question set
const questionList = [
  {
    question:
      'What comes once in a minute, twice in a moment, but never in a thousand years?',
    options: ['The letter M', 'The number 1', 'A second', 'A star'],
    answer: 'The letter M',
  },
  {
    question:
      'I am not alive, but I grow; I don’t have lungs, but I need air; I don’t have a mouth, but water kills me. What am I?',
    options: ['Fire', 'Plant', 'Cloud', 'Wind'],
    answer: 'Fire',
  },
  {
    question: 'The more you take, the more you leave behind. What am I?',
    options: ['Footsteps', 'Time', 'Memories', 'Mist'],
    answer: 'Footsteps',
  },
  {
    question:
      'I am always hungry, I must always be fed. The finger I touch, will soon turn red. What am I?',
    options: ['Fire', 'A lion', 'A plant', 'A virus'],
    answer: 'Fire',
  },
  {
    question: 'What has keys but can’t open locks?',
    options: ['Piano', 'Map', 'Keyboard', 'Luggage'],
    answer: 'Piano',
  },
  {
    question: 'What can travel around the world while staying in the corner?',
    options: ['Stamp', 'Sun', 'Cloud', 'Postcard'],
    answer: 'Stamp',
  },
  {
    question:
      'I have cities, but no houses. I have forests, but no trees. I have rivers, but no water. What am I?',
    options: ['Map', 'Picture', 'Globe', 'Toy'],
    answer: 'Map',
  },
  {
    question: 'What is so fragile that saying its name breaks it?',
    options: ['Silence', 'Glass', 'Ice', 'Dream'],
    answer: 'Silence',
  },
  {
    question: 'The more you have of it, the less you see. What is it?',
    options: ['Darkness', 'Time', 'Money', 'Cloud'],
    answer: 'Darkness',
  },
  {
    question: 'What comes down but never goes up?',
    options: ['Rain', 'Age', 'Snow', 'Sun'],
    answer: 'Rain',
  },
  {
    question: 'What can be broken but never held?',
    options: ['Promise', 'Glass', 'Heart', 'Law'],
    answer: 'Promise',
  },
  {
    question: 'What is full of holes but still holds a lot of weight?',
    options: ['Sieve', 'Spaghetti', 'Cheese', 'Air'],
    answer: 'Sieve',
  },
  {
    question: 'What has a head, a tail, but no body?',
    options: ['Coin', 'Snake', 'Bottle', 'Ring'],
    answer: 'Coin',
  },
  {
    question: 'I’m tall when I’m young, and I’m short when I’m old. What am I?',
    options: ['Candle', 'Tree', 'Mountain', 'Person'],
    answer: 'Candle',
  },
  {
    question: 'What gets wetter the more it dries?',
    options: ['Towel', 'Sponger', 'Ice', 'Air'],
    answer: 'Towel',
  },
  {
    question: 'What can you catch but not throw?',
    options: ['Cold', 'Ball', 'Wind', 'Laughter'],
    answer: 'Cold',
  },
  {
    question: 'What is always in front of you but can’t be seen?',
    options: ['Future', 'Wind', 'Time', 'Light'],
    answer: 'Future',
  },
  {
    question: 'What has an eye but cannot see?',
    options: ['Needle', 'Storm', 'Coin', 'Potato'],
    answer: 'Needle',
  },
  {
    question: 'What begins with T, ends with T, and has T in it?',
    options: ['Teapot', 'Tooth', 'Tent', 'Ticket'],
    answer: 'Teapot',
  },
  {
    question:
      'I am taken before you can see me, but I am only truly seen after I’m taken. What am I?',
    options: ['Photo', 'Breeze', 'Sight', 'Breath'],
    answer: 'Photo',
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
    <div className="quiz-container text-xl w-10/12">
      <h2 style={{ color: '#2d8a9b' }} className="text-3xl limelight-regular ">
        Question <span className="qNumber"> {currentQuestionIndex + 1} </span>
      </h2>

      <div className="score-box text-white mb-4 tinos-regular ">
        <p>
          <strong>Score: </strong>
          <span className="userNum">{userPoints}</span>
        </p>
        <p>
          <strong>Lives: </strong>
          <span className="userNum">{userLives}</span>
        </p>
      </div>

      <div className="question-box text-white m-3.5 text-start poppins-light">
        <p>{questionList[currentQuestionIndex].question}</p>
        <ul className="mt-4">
          {questionList[currentQuestionIndex].options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`option-item cursor-pointer p-2 mb-2 rounded ${
                selectedAnswer === option ? 'bg-blue-500' : 'bg-blue-400'
              }`}>
              {option}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback-box mt-4">
        <p style={{ color: '#dbeef3' }}>Time Remaining: {timer}s</p>
        {!answerStatus && <p>{answerStatus}</p>}
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
