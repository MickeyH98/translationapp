import React, { Component } from 'react';
import './App.css';

const initState = {
  startLanguage: 'en',
  endLanguage: 'en',
  index: 0,
  currentGuess: '',
  guessedWord: '',
  words: [
    {
      "en": "cat",
      "de": "Katz",
      "fr": "chat",
      "sp": "gato"
    },
    { "en": "dog", "de": "Hund", "fr": "chien", "sp": "perro" },
    { "en": "man", "de": "Mann", "fr": "homme", "sp": "hombre" },
    { "en": "woman", "de": "Frau", "fr": "femme", "sp": "mujer" },
    { "en": "boy", "de": "Junge", "fr": "garcon", "sp": "chico" },
    { "en": "girl", "de": "Madchen", "fr": "fille", "sp": "niña" },
    { "en": "house", "de": "Haus", "fr": "maison", "sp": "casa" },
    { "en": "car", "de": "Auto", "fr": "voiture", "sp": "coche" },
    { "en": "plane", "de": "Fleugzug", "fr": "avion", "sp": "avión" },
    { "en": "butterfly", "de": "Schmetterling", "fr": "papillon", "sp": "mariposa" },
  ],
  wordsRemaining: [
    {
      "en": "cat",
      "de": "Katz",
      "fr": "chat",
      "sp": "gato"
    },
    { "en": "dog", "de": "Hund", "fr": "chien", "sp": "perro" },
    { "en": "man", "de": "Mann", "fr": "homme", "sp": "hombre" },
    { "en": "woman", "de": "Frau", "fr": "femme", "sp": "mujer" },
    { "en": "boy", "de": "Junge", "fr": "garcon", "sp": "chico" },
    { "en": "girl", "de": "Madchen", "fr": "fille", "sp": "niña" },
    { "en": "house", "de": "Haus", "fr": "maison", "sp": "casa" },
    { "en": "car", "de": "Auto", "fr": "voiture", "sp": "coche" },
    { "en": "plane", "de": "Fleugzug", "fr": "avion", "sp": "avión" },
    { "en": "butterfly", "de": "Schmetterling", "fr": "papillon", "sp": "mariposa" },
  ],
  completedWords: []
}

var wordsLeft;

class App extends Component {
  constructor(){
    super();
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeCurrentGuess = this.onChangeCurrentGuess.bind(this);
    this.onClickGuess = this.onClickGuess.bind(this);
    this.currentCardDisplay = this.currentCardDisplay.bind(this);
    this.reset = this.reset.bind(this);
    this.state = initState;
  }

  onChangeFrom(event) {
    let startLanguage = event.target.value;
    let newState = Object.assign({}, this.state);
    newState.startLanguage = startLanguage;
    this.setState(newState);
  }

  onChangeTo(event) {
    let endLanguage = event.target.value;
    let newState = Object.assign({}, this.state);
    newState.endLanguage = endLanguage;
    this.setState(newState);
  }

  onChangeCurrentGuess(event) {
    let currentGuess = event.target.value;
    let newState = Object.assign({}, this.state);
    newState.currentGuess = currentGuess;
    this.setState(newState);
  }

  onClickGuess(){
    let currentGuess = this.state.currentGuess;
    let newState = Object.assign({}, this.state);
    var endLanguage = this.state.endLanguage;
    let index = newState.index;
    let wordsRemaining = this.state.wordsRemaining;
    let startLanguage = this.state.startLanguage;
    let targetGuess = newState.words[index][endLanguage].toLowerCase();
    newState.guessedWord = currentGuess.trim().toLowerCase();
    if (newState.guessedWord === targetGuess ){
      alert("Correct!");
      newState.completedWords.push(targetGuess);
      wordsLeft += " " + wordsRemaining[index][startLanguage] + " ";
      newState.wordsRemaining.splice(index, 1);
      index = (newState.index+1)
      if(index === 11){
        index = 0;
      }
      console.log(index);
    }else {
      alert("Try again!");
    }

    newState.index = index;
    newState.currentGuess = '';
    this.setState(newState)
  }

  reset(){
    let newState = Object.assign({}, this.state);
    newState = initState;
    wordsLeft = '';
    this.setState(newState);
  }

  currentCardDisplay(){
    let index = this.state.index;
    let wordList = this.state.words;
    let wordsRemaining = this.state.wordsRemaining;
    let startLanguage = this.state.startLanguage;
    let endLanguage = this.state.endLanguage;

    return(
      <div className="cardContainer">
        <h2>{startLanguage} to {endLanguage}</h2>

        <div className="cardLeft">
        {startLanguage}: {wordList[index][startLanguage]}
        </div>

        <div className="cardMiddle">
        {this.state.endLanguage}: <input type="text" value={this.state.currentGuess} onChange={this.onChangeCurrentGuess}/> <button onClick={this.onClickGuess}>Guess</button>
        </div>

        <div className="cardRight">
        <p>Words Guessed:</p>
        <p>{wordsLeft}</p>
        <button onClick={this.reset}>Reset</button>
        </div>

      </div>
    )
  }


  render() {
    return (
      <div className="App">
        <h1>Study Time</h1>

        <div className="languageSelect">
          <h2>Language Select</h2>
          <h3>From</h3>
          <select onChange={this.onChangeFrom}>
            <option value="en">English</option>
            <option value="sp">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
          <h3>To</h3>
          <select onChange={this.onChangeTo}>
            <option value="en">English</option>
            <option value="sp">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <this.currentCardDisplay />

      </div>
    );
  }
}

export default App;

// <!-- Create a vocabulary study app that allows users to select a language and then get a series of flashcards of words. The user must be able to write the translation of the word and the app will tell them if they are right or wrong. If they are wrong, the correct translation must be shown. Allow the user to loop through the deck as many times as necessary until they get them all correct. Allow the user to reset at any time.
//
// Step 1:
// Ask user which language they would like to show on the cards and then ask what language they will be translating to.
//
// Step 2:
// Show user the first word and provide an input to have them type the translation & submit.
//
// Step 3:
// Evaluate the answer. Make sure that you account for extra white spaces at the beginning or end of the submitted word and also make your evaluation case insensitive. In other words, "TEST", " Test " and "test" would all be evaluated the same.
//
// Step 4:
// If the user gets the answer correct, take the word out of the deck for this round and show the user how many words correct out of how many words in the deck.
//
// Step 5:
// When the user has gotten all words correct, congratulate them and ask if they want to reset.
//
// Step 6:
// The user should be able to reset to Step 1 at any time. -->
