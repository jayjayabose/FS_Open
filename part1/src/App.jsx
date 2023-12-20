// import './App.css'
// import React from "react";
import { useState } from 'react';

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    let newLeft = left + 1;
    setLeft(newLeft);

    setTotal(newLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);

    setTotal(left + right);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

const History = (props) => {
  debugger;
  return (
    <>
      {props.allClicks.length === 0 ? (
        <div>the app is used by pressing the buttons</div>
      ) : (
        <div>button press history: {props.allClicks.join(' ')}</div>
      )}
    </>
  );
};

export default App;
