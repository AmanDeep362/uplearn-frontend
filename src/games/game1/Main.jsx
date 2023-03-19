import React from "react";
import { Provider } from "react-redux";
import Game1 from "./Game1";
import store from "./redux/store";

export default function Main() {
  return (
    <div>
      <Provider store={store}>
        <Game1 />
      </Provider>
    </div>
  );
}
