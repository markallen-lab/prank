import { useState } from 'react';
import React from 'react';
import { Yes_button, No_button } from './components/Buttons';
import GameComponent from './components/GameComponent';
import QuizComponent from './components/QuizComponent'; // Make sure you create/import this!

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [beginGame, setBeginGame] = useState(false);
  const [userPoints, setUserPoints] = useState(2);
  const [userLives, setUserLives] = useState(3);

  return (
    <div className="container mx-auto text-center h-screen w-screen overflow-hidden flex justify-center items-center">
      {!startGame ? (
        <div className="chat-box">
          <h2
            style={{ color: '#2d8a9b' }}
            className="text-3xl limelight-regular sm:text-4xl md:text-4xl lg:text-6xl mb-2.5">
            Want to Play a Game?
          </h2>
          <div className="details-box m-3.5 poppins-light">
            <p style={{ color: '#dbeef3' }}>
              This game is created by{' '}
              <span style={{ color: '#2d8a9b' }} className="font-black">
                <a
                  href="https://markallen-lab.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Mark Davis
                </a>
              </span>{' '}
              and will test your thinking abilities. 20 Of the most difficult
              random questions.
            </p>
          </div>
          <div className="button_wrapper flex flex-wrap items-center justify-center">
            <Yes_button onClick={() => setStartGame(true)} />
            <No_button />
          </div>
        </div>
      ) : (
        <>
          {startGame && !beginGame && (
            <GameComponent setBeginGame={setBeginGame} beginGame={beginGame} />
          )}

          {beginGame && (
            <QuizComponent
              userLives={userLives}
              setUserLives={setUserLives}
              userPoints={userPoints}
              setUserPoints={setUserPoints}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
