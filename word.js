// word constructor uses letter.js to create inputted word using "makeWord"
var Letter = require("./Letter.js");

function Word(wordArr) {
    this.wordArr = wordArr;
    this.testWord = [];
    this.makeWord = function() {
        for (var i=0; i < this.wordArr.length; i++) {
            var letter = new Letter(wordArr[i]);
            this.testWord.push(letter);
        }
        console.log("WORD :: Letter array  :: ", this.testWord)
    }
    this.showWord = function() {
        var wordDisplay = [];
        for (var i=0; i<this.testWord.length; i++) {
            wordDisplay.push(this.testWord[i].displayLet());
        }
        return wordDisplay.join(" ");
    }
    this.checkGuess = function(myGuess) {
        console.log("WORD CHECK GUESS :: ", myGuess)
        for (var i=0; i<this.testWord.length; i++) {
            this.testWord[i].check(myGuess);
        }
    }
    this.isSolved = function () {
        var currentWordState = this.showWord();
        return !currentWordState.includes("_")
    }
}

module.exports = Word;