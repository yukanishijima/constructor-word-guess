const Letter = require("./Letter.js");

function Word(word) {
  //array of new letter object, each represents the letter of the underlying word
  this.word = word;
  this.lettersArr = [];
  //pushing each letter(object) to the array
  word.split('').forEach(element => {
    let eachLetter = new Letter(element);
    this.lettersArr.push(eachLetter);
  });
}

//display a string with either _ (if not guessed) or letter (if guessed)
Word.prototype.displayString = function () {
  let resultArr = [];
  for (let i = 0; i < this.lettersArr.length; i++) {
    let value = this.lettersArr[i].generteUnderscore();
    resultArr.push(value);
  }
  // console.log(resultArr.join(" "));
  return resultArr.join(" ");
};

//change _ to a letter if the guess is correct
Word.prototype.getResult = function (char) {
  for (let i = 0; i < this.lettersArr.length; i++) {
    this.lettersArr[i].checkGuess(char);
  }
};

module.exports = Word;

//test
// var word1 = new Word("apple");
// console.log(word1);
// word1.displayString();  // _ _ _ _ _ 
// word1.getResult("a");
// word1.displayString();  // a _ _ _ _ 

