function Letter(letter) {
  this.letter = letter;
  this.isGuessed = false;
}

Letter.prototype.generteUnderscore = function () {
  if (this.isGuessed === false) {
    return "_";
  } else {
    return this.letter;
  }
};

Letter.prototype.checkGuess = function (char) {
  if (char === this.letter) {
    this.isGuessed = true;
  }
  // console.log(this.isGuessed);
  return this.isGuessed;
};

module.exports = Letter;

//test
// const oneLetter = new Letter("a");
// console.log(oneLetter);
// oneLetter.generteUnderscore();   //_
// oneLetter.checkGuess("a");  //return true
// oneLetter.generteUnderscore();   //"a"
