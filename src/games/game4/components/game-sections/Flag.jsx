import React, { useContext } from "react";
import FlagsContext from "../../contexts/FlagsContext";

const Flag = (props) => {
  const flag = useContext(FlagsContext);
  return (
    <div className="gameQues">
      <div id="flag">{flag.randomFlags[flag.currentFlagIndex].title}</div>
    </div>
  );
};

export default Flag;
