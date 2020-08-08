const MATCHES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Game Ctrl
const GameCtrl = function () {
  // Game State
  let availableChoices = Array(9)
    .fill(0)
    .map((_, i) => i);
  const playerChoices = {
    X: [],
    O: []
  };
  let activeTurn = 'X';

  function checkForMatches() {
    const { X: xChoices, O: oChoices } = playerChoices;

    for (match of MATCHES) {
      const xMatch = match.every(mEl => xChoices.includes(mEl));
      const oMatch = match.every(mEl => oChoices.includes(mEl));

      // console.log({ match, xChoices, oChoices, xMatch, oMatch });

      if (xMatch || oMatch) {
        return { xWon: xMatch, oWon: oMatch, match };
      }
    }
    // console.log({ xWon, oWon });
    return { xWon: false, oWon: false };
  }

  return {
    getGameState() {
      return { availableChoices, activeTurn };
    },
    play(selectedBox) {
      playerChoices[activeTurn].push(selectedBox);
      availableChoices = availableChoices.filter(choice => selectedBox !== choice);

      // Check if atleast 1 player selected atleast 3 boxes

      if (playerChoices.O.length >= 3 || playerChoices.X.length >= 3) {
        // check for combinations

        const { xWon, oWon, match = [] } = checkForMatches();
        if (xWon || oWon) {
          // game over => activeTurn won
          availableChoices = [];
          console.clear();
          console.log(`%c Player ${activeTurn} Won!!`, 'background: #102; color: #f4f4f4; padding: 0.5rem 1rem 0.5rem');
          return { playerWon: xWon ? 'X' : 'O', match };
        }
      }

      // Continue to next turn
      activeTurn = activeTurn === 'X' ? 'O' : 'X';
      // return { playerWon: null, match };

      if (availableChoices.length === 0) {
        console.clear();
        console.log(`%c That's a Tie!!`, 'background: red; color: #f4f4f4; padding: 0.5rem 1rem 0.5rem');
        return { playerWon: 'draw' };
      }
    },
    restartGame() {
      availableChoices = Array(9)
        .fill(0)
        .map((_, i) => i);
      activeTurn = 'X';
      playerChoices.X = [];
      playerChoices.O = [];
    }
  };
};
