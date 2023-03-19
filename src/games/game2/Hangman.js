import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./Words.js";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    };
  }

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz-".split("").map((letter) => (
      <button
        className="alphBtn"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    });
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won 🎉🎉";
    }

    if (gameOver) {
      gameStat = "You Lost 😞😞";
    }

    return (
      <div>
        <div className="game-back-btn">
          <Link to="/learn-with-fun">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="Hangman-container">
          {/* <h1 className='text-center'>Hangman</h1> */}
          {/* <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div> */}

          <div className="leftContainer">
            <div>
              <img
                src={this.props.images[this.state.mistake]}
                style={{ color: "black" }}
                alt=""
              />
            </div>
            <button className="resetBtn" onClick={this.resetButton}>
              Reset
            </button>
          </div>
          <div className="rightContainer">
            <p className="ques">Guess the states of India :</p>
            <p className="ans">
              {!gameOver ? this.guessedWord() : this.state.answer}
            </p>
            <p className="gameStatus">{gameStat}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
