import React from "react";
import Button from "../components/Button";
// import Input from '../components/Input';
import Logo from "../../../assets/images/logo.png";
import { Session } from "../utils/storage";

class Start extends React.Component {
  state = {
    player: "player",
  };

  // setNameOfPlayer = (event) => {
  //     this.setState({ player: event.target.value })
  // }

  clicked = () => {
    Session.set("onlinePlayer", this.state.player);
    this.props.startPressed();
  };

  render() {
    return (
      <div>
        <div className="App-brandname">
          {/* <i className="fas fa-graduation-cap"></i> */}

          <img src={Logo} alt="Logo" className="logo_ig" />

          <br />
          <h3>Do You Know</h3>
          <h1>Maths?</h1>
        </div>
        {/* <Input text="Insert your name" onInputChange={this.setNameOfPlayer} /> */}
        <p className="pressText">Press to start the game</p>
        <Button isClicked={this.clicked}>Start</Button>
      </div>
    );
  }
}
export default Start;
