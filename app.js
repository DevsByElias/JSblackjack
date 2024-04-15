// Test logic from Scrimba->
// let secondCard = 1;
// let firstCard = 11;
// let cardSum = firstCard + secondCard;
// console.log(cardSum);
// let isBlackJack = false;
// let isAlive = true;
// let isMessage = "";

// function startGame() {
// if (cardSum <= 20) {
// isMessage = "Hit or stand?";
// } else if (cardSum === 21) {
// isMessage = "You've got Blackjack!";
// haveBlackJack = true;
// } else {
// isMessage = "You lost!";
// isAlive = false;
// }
// console.log(isMessage);
// }

let dealerTotalSum = 0;
let playerTotalSum = 0;
let dealerAceCount = 0;
let playerAceCount = 0;
let hiddenCard;
let deckOfCards;
let canHit = true;

window.onload = function () {
  buildDeck();
  shuffleCards();
  startGame();
  document.getElementById("restart").addEventListener("click", restartGame);
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deckOfCards = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deckOfCards.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleCards() {
  for (let i = 0; i < deckOfCards.length; i++) {
    let j = Math.floor(Math.random() * deckOfCards.length);
    let temp = deckOfCards[i];
    deckOfCards[i] = deckOfCards[j];
    deckOfCards[j] = temp;
  }
  console.log(deckOfCards);
}
function getValue(card) {
  let data = card.split("-");
  let value = data[0];
  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}
function reduceAce(totalSum, aceCount) {
  while (totalSum > 21 && aceCount > 0) {
    totalSum -= 10;
    aceCount -= 1;
  }
  return totalSum;
}

function startGame() {
  dealerTotalSum = 0;
  playerTotalSum = 0;

  dealerAceCount = 0;
  playerAceCount = 0;

  hiddenCard = deckOfCards.pop();
  dealerTotalSum += getValue(hiddenCard);
  dealerAceCount += checkAce(hiddenCard);

  let playerCardImg1 = document.createElement("img");
  let playerCard1 = deckOfCards.pop();
  playerCardImg1.src = "./cards/" + playerCard1 + ".png";
  playerTotalSum += getValue(playerCard1);
  playerAceCount += checkAce(playerCard1);
  document.getElementById("your-cards").append(playerCardImg1);

  let dealerCardImg1 = document.createElement("img");
  let dealerCard1 = deckOfCards.pop();
  dealerCardImg1.src = "./cards/" + dealerCard1 + ".png";
  dealerTotalSum += getValue(dealerCard1);
  dealerAceCount += checkAce(dealerCard1);
  document.getElementById("dealer-cards").append(dealerCardImg1);

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deckOfCards.pop();
  cardImg.src = "./cards/" + card + ".png";
  playerTotalSum += getValue(card);
  playerAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);
  if (reduceAce(playerTotalSum, playerAceCount) > 21) {
    canHit = false;
  }
}
function stay() {
  dealerTotalSum = reduceAce(dealerTotalSum, dealerAceCount);
  playerAceCount = reduceAce(playerTotalSum, playerAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hiddenCard + ".png";

  let message = "";
  if (playerTotalSum > 21) {
    message = "You Lost";
  } else if (dealerTotalSum > 21) {
    message = "You won";
  } else if (playerTotalSum == dealerTotalSum) {
    message = "Push";
  } else if (playerTotalSum > dealerTotalSum) {
    message = "You Win!";
  } else if (playerTotalSum < dealerTotalSum) {
    message = "You Lose!";
  }

  document.getElementById("dealer-sum").innerText = dealerTotalSum;
  document.getElementById("your-sum").innerText = playerTotalSum;
  document.getElementById("results").innerText = message;
}

function restartGame() {
  dealerTotalSum = 0;
  playerTotalSum = 0;
  dealerAceCount = 0;
  playerAceCount = 0;
  hiddenCard = null;
  canHit = true;
  buildDeck();
  shuffleCards();
  startGame();
}
