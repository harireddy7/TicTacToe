import { FunctionReturn, GameType, PlayReturn } from "../types";
declare class Game {
    private availableChoices;
    private playerChoices;
    private activeTurn;
    private gameType;
    private getNextProbableMove;
    private checkForMatches;
    getGameState(): {
        availableChoices: number[];
        activeTurn: string;
        gameType: GameType;
    };
    storeGameType(type: string): void;
    restartGame(): void;
    checkForNextMove(): FunctionReturn<number>;
    play(selectedBox: number): FunctionReturn<PlayReturn>;
}
export default Game;
