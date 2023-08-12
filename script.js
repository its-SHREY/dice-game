'use strict';

//calling by the id instead of class
//there are two ways to calling a id
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const dicel = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  dicel.classList.add('hidden');

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  //Toggle removes the class if present or add it if not.
  //Using on both simueltaneously ensures toggle works correctly.
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling the dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Display the number
    dicel.classList.remove('hidden');
    dicel.src = `dice-${dice}.png`;

    //Check for the roll number 1. If true, switch the player
    if (dice !== 1) {
      //add the dice number to current score
      currentScore += dice;
      console.log(currentScore);
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //current0.textContent = currentScore; //change later to next player
    } else {
      //switch to next player
      //set current score to existing player to 0
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player score >= 100
    if (scores[activePlayer] >= 100) {
      dicel.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Finish the game
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
