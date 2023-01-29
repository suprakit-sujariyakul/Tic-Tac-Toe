import React, { useState, useEffect} from 'react';

import Header from './componets/Header';
import Board from './componets/Board';
import Status from './componets/Status';
import History from './componets/History';
import {calculateWinner, DEAD_WINNER} from './utils/helpers'

const initialBoard = Array(9).fill(null);
const initialStatus = {
  winner: null,
  turn: 'X'
};

function App() {
  const [status, setStatus] = useState(initialStatus);
  const [gameHistory, setGameHistory] = useState([
    {
      squaresList: initialBoard, // [null, null, null, ...]
      squareSelected: null,
    },
  ]);
  const [step, setStep] = useState(0);
  const [nextPlay, setNextPlay] = useState(true);

  // todo implement onClick when user click on board
  // this function should
  // 1. save game history
  // 2. update game step
  const onBoardClick = (squareIdx) => {
    const selctedSquare = gameHistory[step].squaresList[squareIdx];

    if (selctedSquare || status.winner) return;

    const history = gameHistory.slice(0, step + 1); // copy gameHistory
    const current = history[history.length - 1]; 
    
    const squares = current.squaresList.slice();
    squares[squareIdx] = nextPlay ? 'X' : 'O';

    setGameHistory(
      history.concat({
        squaresList: squares,
        squareSelected: squareIdx,
      })
    )
    setStep(history.length);
    setNextPlay(!nextPlay);
  }

  const onStepClick = (step) => {
    setGameHistory(gameHistory.slice(0, step + 1));
    setStep(step);
    setNextPlay(step % 2 === 0)
  }

  // todo implement sideEffect when app state change
  // this function should
  // calculate winner
  // calculate next app state
  useEffect(() => {
    const current = gameHistory[step];
    const winner = calculateWinner(current.squaresList);

    if (winner) {
      setStatus(prevStatus => {
        return { ...prevStatus, winner: winner};
      });
      return;
    }

    if (step > 8) {
      setStatus({winner: DEAD_WINNER})
      return;
    }

    setStatus({turn: nextPlay ? 'X' : 'O'})
  }, [step, gameHistory, nextPlay]);

  return (
    <>
      <Header />
      <Status player={status?.winner} turn={status?.turn} />
      <Board history={gameHistory} step={step} onClick={onBoardClick} winnerLine={status?.winner?.line} />
      <History history={gameHistory} onClick ={onStepClick} />
    </>
  );
}

export default App;
