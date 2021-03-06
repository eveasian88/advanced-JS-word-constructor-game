// npm modules to obtain player input of letter guesses
var Word = require("./Word.js");
var inquirer = require("inquirer");

wordList = ["i appreciate you", "i believe in you", "you are smart", "you are beautiful", "i feel safe with you", "i admire you", "i trust you", "you are a giving person", "thank you for being supportive", "i am proud of you", "you have a kind heart", "you are courageous", "you are radiant", "i respect you"];

var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

const MAX_GUESSES = 8;

startGame();

// chooses a word from the word array, uses the Word constructor to create the display and functionality;
//"chosenWord" is used for comparison later to check if the word is solved
function startGame() {

    if (wordList.length<2) {
        wordList = ["i appreciate you", "i believe in you", "you are smart", "you are beautiful", "i feel safe with you", "i admire you", "i trust you", "you are a giving person", "thank you for being supportive", "i am proud of you", "you have a kind heart", "you are courageous", "you are radiant", "i respect you"];
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

// allows the user to input a letter guess, restarts the game if player is out of wrong guesses
function promptUser() {
    if (gameWord.isSolved() ) {
        console.log('You Win!');
        console.log(gameWord.showWord());
        process.exit()

    } else if (counter <= MAX_GUESSES) {
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
// if the entire word is filled in, the game restarts
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