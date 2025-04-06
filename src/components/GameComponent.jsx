import React from 'react';
import { Start_button } from './Buttons';

function GameComponent({ setBeginGame }) {
  return (
    <div className="game-container text-white text-xl w-10/12">
      <h2 className="text-4xl text-orange-500">Before we start ...</h2>
      <div className="details-box text-white m-3.5 text-start">
        <p className=" w-full mx-auto text-1xl">
          Correct answers will add 2 points and incorrect answer will deduct 2
          points. <br /> Reaching 0 points will use 1 retry and add 2 points to
          your score.
          <br /> If your score is 0 and retries are 0 then game over.
          <br /> If you make it to question 20, each retry will add 5 points to
          your score.
        </p>
        <hr />
        <ul className="text-start mt-2">
          <li>
            <span className="text-blue-500 mr-1.5">2</span> Points
          </li>
          <li>
            <span className="text-blue-500 mr-1.5">3</span> Retries
          </li>
        </ul>
      </div>
      <div>
        <div className="button_wrapper flex flex-wrap items-center justify-center">
          <Start_button onClick={() => setBeginGame(true)} />
        </div>
      </div>
    </div>
  );
}

export default GameComponent;
