'use strict';

// selecting elements
///// players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//// main scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

//// current scores
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//// dice
const diceEl = document.querySelector('.dice');

//// buttons
////// new game
const btnNew = document.querySelector('.btn--new');
////// roll dice
const btnRoll = document.querySelector('.btn--roll');
////// hold
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let currentScore;
let activePlayer;
let playing;

const scores = [0, 0];

const initData = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

initData();

// switch to the next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for rolled 1: if true -
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // the code below can be omitted if we rely on css cascade (`.player--winner` being below `.player--active`)
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  if (activePlayer === 1) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
  initData();
  // reset everything for each player
  while (activePlayer <= 1) {
    scores[activePlayer] = 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer += 1;
  }
  activePlayer = 0;
});
