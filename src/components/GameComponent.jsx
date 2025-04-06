import React from 'react';
import { Start_button } from './Buttons';

function GameComponent({ setBeginGame }) {
  return (
    <div className="game-container text-white w-10/12">
      <h2
        style={{ color: '#2d8a9b' }}
        className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl limelight-regular text-start">
        Before we start ...
      </h2>

      <p className="text-start poppins-light my-4">
        Correct answers will add (2) points and incorrect answer will deduct (2)
        points.
      </p>
      <p className="text-start poppins-light my-4">
        Reaching (0) points will use 1 retry and add (2) points to your score.
      </p>
      <p className="text-start poppins-light my-4">
        If you make it to question 20, each retry will add 5 points to your
        score.
      </p>
      <p className="text-start poppins-light my-4">
        If your score is (0) and retries are 0 then game over.
      </p>

      <ul className="text-start mb-3.5">
        <li>
          <span className="text-blue-500 mr-1.5">2</span> Points
        </li>
        <li>
          <span className="text-blue-500 mr-1.5">3</span> Retries
        </li>
      </ul>
      <div>
        <div className="button_wrapper flex flex-wrap items-center justify-center">
          <Start_button onClick={() => setBeginGame(true)} />
        </div>
      </div>
    </div>
  );
}

export default GameComponent;
