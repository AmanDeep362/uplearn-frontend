import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import StarFrame from "./starFrame";
import ButtonFrame from "./buttonFrame";
import AnswerFrame from "./answerFrame";
import NumberFrame from "./NumberFrame";
import DoneFrame from "./doneFrame";

import "../statics/css/App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      numberOfStars: Math.floor(Math.random() * 9) + 1,
      selectedNumbers: [],
      usedNumber: [],
      redraws: 5,
      doneStatus: null,
      correct: null,
    };
  }
  // When a number is clicked
  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
      this.setState({
        selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
        correct: null,
      });
    }
  };

  // To un clikc a number at the answer frame
  unSelectNumber = (clickedNumber) => {
    let selectedNumbers = this.state.selectedNumbers;
    let index = selectedNumbers.indexOf(clickedNumber);

    selectedNumbers.splice(index, 1);
    this.setState({ selectedNumbers: selectedNumbers, correct: null });
  };

  // Accepting answer
  acceptAnswer = () => {
    let usedNumber = this.state.usedNumber.concat(this.state.selectedNumbers);
    this.setState(
      {
        selectedNumbers: [],
        usedNumber: usedNumber,
        correct: null,
        numberOfStars: Math.floor(Math.random() * 9) + 1,
      },
      () => {
        this.updateDoneStatus();
      }
    );
  };

  // performs the summing of the numbers
  sumOfSelectednumbers = () => {
    return this.state.selectedNumbers.reduce((a, b) => {
      return a + b;
    }, 0);
  };
  // verifying the answer
  checkAnswer = () => {
    let correct = this.state.numberOfStars === this.sumOfSelectednumbers();
    this.setState({ correct: correct });
  };

  // Function for redraw
  redraw = () => {
    if (this.state.redraws > 0) {
      this.setState(
        {
          numberOfStars: Math.floor(Math.random() * 9) + 1,
          correct: null,
          selectedNumbers: [],
          redraws: this.state.redraws - 1,
        },
        () => {
          this.updateDoneStatus();
        }
      );
    }
  };
  // PossibleCombinationSum
  possibleCombinationSum = (arr, n) => {
    if (arr.indexOf(n) >= 0) {
      return true;
    }
    if (arr[0] > n) {
      return false;
    }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    let listSize = arr.length,
      combinationsCount = 1 << listSize;

    for (let i = 0; i < combinationsCount; i++) {
      let combinationsSum = 0;
      for (let j = 0; j < listSize; j++) {
        if (i & (1 << j)) {
          combinationsSum += arr[j];
        }
      }

      if (n === combinationsSum) {
        return true;
      }
    }
  };
  possibleSolution = () => {
    let numberOfStars = this.state.numberOfStars,
      possibleNumber = [],
      usedNumbers = this.state.usedNumber;
    for (let i = 0; i <= 9; i++) {
      if (usedNumbers.indexOf(i) < 0) {
        possibleNumber.push(i);
      }
    }

    return this.possibleCombinationSum(possibleNumber, numberOfStars);
  };
  // Game over
  updateDoneStatus = () => {
    if (this.state.usedNumber.length === 9) {
      this.setState({ doneStatus: "You won 🎉" });
      return;
    }
    if (this.state.redraws === 0 && !this.possibleSolution()) {
      this.setState({ doneStatus: "You lose 😞" });
    }
  };
  // play Again
  playAgain = () => {
    if (this.state.doneStatus) {
      this.setState({
        numberOfStars: Math.floor(Math.random() * 9) + 1,
        selectedNumbers: [],
        usedNumber: [],
        redraws: 5,
        doneStatus: null,
        correct: null,
      });
    }
  };

  render() {
    let selectedNumbers = this.state.selectedNumbers,
      numberOfStars = this.state.numberOfStars,
      correct = this.state.correct,
      usedNumber = this.state.usedNumber,
      redraws = this.state.redraws,
      doneStatus = this.state.doneStatus;

    return (<>
      <div className="game-back-btn">
        <Link to="/learn-with-fun">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
          </div>
      <div className="gamecontainer">
        <h1 style={{ marginBottom: "1rem" }}>Count and Choose number</h1>

        <div id="app">
          <StarFrame numberOfStars={numberOfStars} />

          <ButtonFrame
            selectedNumbers={selectedNumbers}
            correct={correct}
            checkAnswer={this.checkAnswer}
            redraws={redraws}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
          />

          <AnswerFrame
            selectedNumbers={selectedNumbers}
            unSelectNumber={this.unSelectNumber}
          />
        </div>

        <NumberFrame
          selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
          usedNumber={usedNumber}
        />

        <DoneFrame doneStatus={doneStatus} playAgain={this.playAgain} />
      </div>
      </>
    );
  }
}

export default App;
