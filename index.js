// npm modules to obtain player input of letter guesses and to add color to the display
var Word = require("./Word.js");
var inquirer = require("inquirer");

wordList = ["appreciate", "believe", "blessed", "amazing", "love", "safe", "admire", "trust", "thoughful", "giving", "thanks", "supportive", "proud", "helpful", "smart", "wonderful", "compassionate", "happiness", "joy", "gratitude", "sweet", "kind", "attention", "time", "admiration", "courageous", "empathy", "encouragement", "radiant", "respect"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

const MAX_GUESSES = 8;

startGame();

/**
 * 1. game setup:
 *      A. populate variables
 *          - pick random word
 *          - pass word through constructors
 *          - set guessesAvailable at 7
 *          functions - pick a word from the array at random; 
 *      B. start game
 * 
 * 2. game loop:
 *      A. prompt user for a letter
 *      B. check letter against Word object
 *      C. inform user of success or lack of success
 * 
 * 
 * startGame -> promptUser -> ? -> 
 */

// chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {

    //NOTE: perhaps abstract into a reusable function [tutor notes]
    if (wordList.length<2) {
        wordList = ["appreciate", "believe", "blessed", "amazing", "love", "safe", "admire", "trust", "thoughful", "giving", "thanks", "supportive", "proud", "helpful", "smart", "wonderful", "compassionate", "happiness", "joy", "gratitude", "sweet", "kind", "attention", "time", "admiration", "courageous", "empathy", "encouragement", "radiant", "respect"];
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

// allows the user to input a letter guess, restarts the game if player is out of wrong guesses.

/**
 * checking amount of guesses available
 *  -> restart game
 * ask user for a guess
 * process the users guess to determine validity
 * inform user if wrong or right
 */
function promptUser() {
    if ( gameWord.isSolved() ) {
        console.log('You Win!');
        // change line below to handle restart or something
        process.exit()

    } else if (counter < MAX_GUESSES) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. "
            }
        ]).then(function(data) {
                checkAnswer(data);
        });

    } else {
        console.log("\nSorry, you're out of guesses.\n".inverse);
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

// checks that the user's input is in correct format and compares the letter to gameWord to see if guess is correct
function checkAnswer(data) {
    // console.log("CHECK ANSWER :: ", data)

    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            // incorrect guess
            console.log("\nSorry, wrong letter!\n");
            counter++;
            console.log(((8 - counter) + " guesses remaining"));
            promptUser();
        }
        else {
            // correct guess
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n");
        promptUser();
    }
}

// if the user's guess is correct, the word array displays the word with the guessed letter(s), 
// if the entire word is correct (filled in), the game restarts.
function rightGuess() {
    console.log("\nYou guessed correctly.\n");
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord());
        console.log("\nYou win!!\n");
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
};