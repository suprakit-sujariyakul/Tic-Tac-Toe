import React from 'react';

import { DEAD_WINNER } from '../../utils/helpers';

import './Status.scss';

// implement calculateStatus to calculate status to display
const calculateStatus = (playerWin, turn) => {
  if (!playerWin) return `Turn of: ${turn}`;
  else if (playerWin === DEAD_WINNER) return "Draw!";
  else return `The Winner is: Player ${turn}`;
};

// implement stauts using Status.scss
function Status({ player, turn }) {
  const status = calculateStatus(player, turn);
  return <div className="status">{status}</div>;
}

export default Status;
