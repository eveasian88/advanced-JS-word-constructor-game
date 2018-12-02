// npm modules to obtain player input of letter guesses and to add color to the display
var Word = require("./word.js");
var inquirer = require('inquirer');

wordList = ["appreciate", "believe", "blessed", "amazing", "love", "safe", "admire", "trust", "thoughful", "giving", "thanks", "supportive", "proud", "helpful", "gorgeous", "smart", "wonderful", "compassionate", "relationship", "happiness", "joy", "gratitude", "positive", "sweet", "kind", "attention", "time", "admiration", "cheerful", "courageous", "empathy", "encouragement", "radiant", "respect"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

// chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {
    if (wordList.length<2) {
        wordList = ["appreciate", "believe", "blessed", "amazing", "love", "safe", "admire", "trust", "thoughful", "giving", "thanks", "supportive", "proud", "helpful", "gorgeous", "smart", "wonderful", "compassionate", "relationship", "happiness", "joy", "gratitude", "positive", "sweet", "kind", "attention", "time", "admiration", "cheerful", "courageous", "empathy", "encouragement", "radiant", "respect"];
    }
    select = Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 8 letter guesses to find the 'Word of Affirmation'.\n")
    promptUser();
}

