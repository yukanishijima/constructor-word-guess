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

//randomly select a word from the array
function selectWord(options) {
  let randomNum = Math.floor(Math.random() * options.length);
  let option = options[randomNum];
  selectedWordObj = new Word(option);
  selectedWordArr = option.toLowerCase().split("");
  // console.log(selectedWordObj);
  // console.log(selectedWordArr);
}

//ask user which category they want to play with
function selectCategory() {
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
      let userCate = response.category.toLowerCase();
      if (userCate === "wine") {
        selectWord(wordBank.wine);
      } else if (userCate === "cheese") {
        selectWord(wordBank.cheese);
      }
      console.log(`\n${selectedWordObj.displayString()}\n`);
      guessLetter();
    });
};
selectCategory();

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
        console.log(`\nError :( Enter a letter!\n`.magenta);
        console.log(`${selectedWordObj.displayString()}\n`);

        guessLetter();

      } else if (alreadyGuessed.includes(userGuess)) {
        guessCount--;
        console.log(`\nYou already guessed "${userGuess}"!\n`.magenta);
        console.log(`${selectedWordObj.displayString()}\n`);
        console.log(`${guessCount} guesses remaining!\n`);

        guessLetter();

      } else if (!selectedWordArr.includes(userGuess)) {
        guessCount--;
        console.log(`\nWRONG!\n`.red);
        console.log(`${selectedWordObj.displayString()}\n`);
        console.log(`${guessCount} guesses remaining!\n`);

        alreadyGuessed.push(userGuess);
        guessLetter();

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
