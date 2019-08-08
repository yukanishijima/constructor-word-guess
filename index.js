const Word = require("./Word.js");
const colors = require('colors');
const inquirer = require("inquirer");

const wordBank = {
  wine: ["Chardonnay", "Gewurztraminer", "Merlot", "Malbec", "Sauvignon Blanc", "Pinot Noir", "Riesling", "Shiraz", "Tempranillo"],
  cheese: ["Camembert", "Brie", "Gouda", "Cheddar", "Mozzarella", "Gorgonzola", "Emmental", "Bocconcini", "Halloumi", "Ricotta"]
}

const validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let selectedWordObj = "";
let selectedWordArr = [];
let alreadyGuessed = [];
let guessCount = 15;
let userCate = "";

//randomly select a word from the array
function selectWord(options) {
  let randomNum = Math.floor(Math.random() * options.length);
  let option = options[randomNum];
  selectedWordObj = new Word(option);
  selectedWordArr = option.toLowerCase().split("");
  // console.log(selectedWordObj);
  // console.log(selectedWordArr);
}

function selectCategory() {
  if (userCate === "wine") {
    selectWord(wordBank.wine);
  } else if (userCate === "cheese") {
    selectWord(wordBank.cheese);
  }
  console.log(`\n${selectedWordObj.displayString()}\n`);
  alreadyGuessed = [];
  guessCount = 15;
  guessLetter();
};

//ask user which category they want to play with
function askCategory() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select a category to begin!",
        choices: Object.keys(wordBank),
        name: "category"
      }
    ])
    .then(function (response) {
      userCate = response.category.toLowerCase();
      selectCategory();
    });
};
askCategory();

function checkGuessCount() {
  if (guessCount === 0) {
    console.log(`\nGame over! Try a new one!\n`.red);
    selectCategory();
  } else if (guessCount > 0) {
    guessLetter();
  }
};

//ask a question to user
function guessLetter() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Guess a letter!",
        name: "letter"
      }
    ])
    .then(function (response) {
      let userGuess = response.letter;

      if (!validLetters.includes(userGuess)) {
        console.log(`\nHey, enter a single letter only!\n`.yellow);
        console.log(`${selectedWordObj.displayString()}\n`);

        guessLetter();

      } else if (alreadyGuessed.includes(userGuess)) {
        guessCount--;
        console.log(`\nYou already guessed "${userGuess}"!\n`.yellow);
        console.log(`${selectedWordObj.displayString()}\n`);
        console.log(`${guessCount} guesses remaining!\n`);

        checkGuessCount();

      } else if (!selectedWordArr.includes(userGuess)) {
        guessCount--;
        console.log(`\nWRONG!\n`.red);
        console.log(`${selectedWordObj.displayString()}\n`);
        console.log(`${guessCount} guesses remaining!\n`);

        alreadyGuessed.push(userGuess);
        checkGuessCount();

      } else {
        selectedWordObj.getResult(userGuess);
        console.log(`\nCORRECT!\n`.green);
        console.log(`${selectedWordObj.displayString()}\n`);

        alreadyGuessed.push(userGuess);

        let resultArr = selectedWordObj.displayString().split(" ");

        //if there's still "_" that has to be guessed
        if (resultArr.includes("_")) {
          guessLetter();
        } else {
          //if user guessed all correctly
          console.log(`Congrats! You gueesed correctly :)\n`.rainbow);
        }
      }

    });
}
