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
const PC_CHOICE = 'X';
const USER_CHOICE = PC_CHOICE === 'X' ? 'O' : 'X';
const DEFAULT_AVAILABLE_CHOICES = Array(9).fill(0).map((_, i) => i);
class Game {
    constructor() {
        this.availableChoices = DEFAULT_AVAILABLE_CHOICES;
        this.playerChoices = {
            X: [],
            O: []
        };
        this.activeTurn = PC_CHOICE;
        this.gameType = "single";
    }
    getNextProbableMove(choices) {
        for (const matchArr of MATCHES) {
            let existingArr = [], filledArr = [];
            for (let i = 0; i < matchArr.length; i++) {
                if (choices.includes(matchArr[i])) {
                    existingArr.push(matchArr[i]);
                }
                else {
                    filledArr.push(matchArr[i]);
                }
            }
            if (filledArr.length === 1 && this.availableChoices.includes(filledArr[0])) {
                return filledArr[0];
            }
        }
    }
    checkForMatches() {
        const { X: xChoices, O: oChoices } = this.playerChoices;
        for (const match of MATCHES) {
            const xMatch = match.every(mEl => xChoices.includes(mEl));
            const oMatch = match.every(mEl => oChoices.includes(mEl));
            if (xMatch || oMatch) {
                return { xWon: xMatch, oWon: oMatch, match };
            }
        }
        return { xWon: false, oWon: false };
    }
    getGameState() {
        return {
            availableChoices: this.availableChoices,
            activeTurn: this.activeTurn,
            gameType: this.gameType
        };
    }
    storeGameType(type) {
        this.gameType = type === '1' ? 'single' : 'multiple';
    }
    restartGame() {
        this.availableChoices = DEFAULT_AVAILABLE_CHOICES;
        this.activeTurn = PC_CHOICE;
        this.playerChoices.X = [];
        this.playerChoices.O = [];
        console.clear();
    }
    checkForNextMove() {
        if (this.playerChoices[PC_CHOICE].length > 1) {
            const nextWinMove = this.getNextProbableMove(this.playerChoices[PC_CHOICE]);
            if (nextWinMove) {
                return nextWinMove;
            }
            if (this.playerChoices[USER_CHOICE].length > 1) {
                const nextSafeMove = this.getNextProbableMove(this.playerChoices[USER_CHOICE]);
                return nextSafeMove;
            }
        }
    }
    play(selectedBox) {
        (this.playerChoices[this.activeTurn]).push(selectedBox);
        this.availableChoices = this.availableChoices.filter(choice => selectedBox !== choice);
        if (this.playerChoices.O.length >= 3 || this.playerChoices.X.length >= 3) {
            const { xWon, oWon, match = [] } = this.checkForMatches();
            if (xWon || oWon) {
                this.availableChoices = [];
                console.clear();
                console.log(`%c Player ${this.activeTurn} Won!!`, 'background: #102; color: #f4f4f4; padding: 0.5rem 1rem 0.5rem');
                return { playerWon: xWon ? 'X' : 'O', match };
            }
        }
        this.activeTurn = this.activeTurn === 'X' ? 'O' : 'X';
        if (this.availableChoices.length === 0) {
            console.clear();
            console.log(`%c That's a Tie!!`, 'background: red; color: #f4f4f4; padding: 0.5rem 1rem 0.5rem');
            return { playerWon: 'draw' };
        }
    }
}
export default Game;
//# sourceMappingURL=game.js.map