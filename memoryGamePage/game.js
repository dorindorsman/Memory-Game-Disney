import cardsData from "../cards_db/DB.mjs";
import Card from "./Card.mjs";
import Board from "./Board.mjs";
import Player from "./Player.mjs";

const Player1 = Object.assign(
  new Player(),
  JSON.parse(localStorage.getItem("player1"))
);
const Player2 = Object.assign(
  new Player(),
  JSON.parse(localStorage.getItem("player2"))
);

const size = Number(JSON.parse(localStorage.getItem("size")));
const board = new Board(size);

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let turn = Player1;
let cardsUp = 0;

function startGame(size) {
  let k = 0;
  for (let i = 0; i < Math.floor((size * size) / 2); i++) {
    const card1 = new Card(`../cards_db/${cardsData[k].img}`, cardsData[k++].id);
    board.attachCard(card1);
    const card2 = new Card(`../cards_db/${cardsData[k].img}`, cardsData[k++].id);
    board.attachCard(card2);
  }
  // adding one card without a pair
  if (size % 2 != 0) {
    const card1 = new Card(`../cards_db/${cardsData[k].img}`, cardsData[k++].id);
    board.attachCard(card1);
  }

  board.mix();
}

function changeViewTurn(player) {
  const turnHtml = document.querySelector(".turn");
  turnHtml.innerHTML = `${player.name}'s turn`;
}

function flipCard() {

  let p = new Promise((resolve, reject) => {
    if (lockBoard) {
      resolve('Failed')
    } else {
      reject('succsess')
    }
  })
  p.then((message) => {
    console.log('This is in the then ' + message)
  }).catch((message) => {
    console.log('This is in the then ' + message)
  })

  if (lockBoard) return;
  if (this === firstCard) {
    return;
  }
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;

  let isMatch = firstCard.id === secondCard.id;
  isMatch ? foundMatch() : unflipCards();
}

function makeClickable() {
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

function toggleTurn() {
  if (turn == Player1) {
    turn = Player2;
  } else {
    turn = Player1;
  }
}


function foundMatch() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  updateScore();
}


function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    toggleTurn();
    changeViewTurn(turn);
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }, 900);
}


function updateScore() {
  turn.points += 1;
  cardsUp += 2;
  console.log(Player1);
  console.log(Player2);
  console.log(size * size);
  if (cardsUp == size * size || (cardsUp + 1 == size * size && size % 2 != 0)) {
    gameOver();
    lockBoard = true;
    if (Player1.points == Player2.points) {
      Player1.draws += 1;
      Player2.draws += 1;
      declare();
    } else if (Player1.points > Player2.points) {
      Player1.wins += 1;
      Player2.losses += 1;
      declare(Player1, "WIN");
    } else {
      Player2.wins += 1;
      Player1.losses += 1;
      declare(Player2, "WIN");
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      toggleTurn();
      changeViewTurn(turn);
      lockBoard = false;
      firstCard = null;
      secondCard = null;
    }, 900);
  }
  Player2.saveData();
  Player1.saveData();
  Player2.showScore();
  Player1.showScore();
}

function declare(player = null, result = null) {
  console.log(player);
  const place = document.querySelector(".turn");
  if (!player && !result) {
    place.innerHTML = "DRAW";
  } else if (result == "WIN") {
    place.innerHTML = `${player.name} Wins!`;
  }
}

function gameOver() {
  cards.forEach((card) => card.removeEventListener("click", flipCard));
}

function resetGame() {
  Player1.points = 0;
  Player2.points = 0;
  firstCard = null;
  secondCard = null;
  cardsUp = 0;
  lockBoard = false;

  board.allCards.forEach(({
    element
  }) => {
    element.classList.remove("flip");
  });

  Player1.showScore();
  Player2.showScore();
  setTimeout(() => {
    turn = Player1;
    board.allCards.forEach(({
      element
    }) => element.remove());
    board.allCards = [];
    changeViewTurn(turn);
    startGame(size);
    cards = document.querySelectorAll(".card");
    makeClickable();
  }, 300);
}

document.querySelector(".reset").addEventListener("click", resetGame);

Player1.showName();
Player2.showName();
changeViewTurn(turn);
Player1.showScore();
Player2.showScore();
startGame(size);

let cards = document.querySelectorAll(".card");
makeClickable();