import React from 'react';

export function Yes_button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white w-full mx-1 cursor-pointer rounded font-black my-1.5 p-3 sm:p-3 md:p-3.5 lg:py-2.5 lg:px-3.5 hover:bg-blue-600 transition">
      Yes! I want to play!
    </button>
  );
}

export function No_button() {
  return (
    <button className="bg-red-500 text-white w-full mx-1 cursor-pointer rounded font-black my-1.5 p-3 sm:p-3 md:p-3.5 lg:py-2.5 lg:px-3.5">
      No! Ill play another time.
    </button>
  );
}

export function Start_button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white w-full mx-1 cursor-pointer rounded font-black my-1.5 p-3 sm:p-3 md:p-3.5 lg:py-2.5 lg:px-3.5">
      Let's Start!'
    </button>
  );
}

export function Submit_button() {
  return <button>Submit Button</button>;
}
