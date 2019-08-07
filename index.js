const Word = require("./Word.js");
const inquirer = require("inquirer");

const options = ["apple", "orange", "banana"];
let selectedWordObj = "";
let selectedWordArr = [];
let alreadyGuessed = [];

function selectWord() {
  let randomNum = Math.floor(Math.random() * options.length);
  let option = options[randomNum];  //randomly select a word from the array
  selectedWordObj = new Word(option);
  selectedWordArr = option.split("");
  console.log(selectedWordObj);
  console.log(selectedWordArr);
}
selectWord();

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

      if (alreadyGuessed.includes(userGuess)) {
        console.log(`\nYou already guessed "${userGuess}"!\n`);
        selectedWordObj.displayString();
        console.log(`\n`);

        guessLetter();

      } else if (!selectedWordArr.includes(userGuess)) {
        console.log(`\nWRONG!\n`)
        selectedWordObj.displayString();
        console.log(`\n`);

        alreadyGuessed.push(userGuess);
        guessLetter();

      } else {
        selectedWordObj.getResult(userGuess);
        console.log(`\nCORRECT!\n`)
        selectedWordObj.displayString();
        console.log(`\n`);

        alreadyGuessed.push(userGuess);

        //if statement here to determine whether user guessed all letters or not

        guessLetter();
      }

    });
}
guessLetter();