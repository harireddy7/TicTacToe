export interface Paint {
    id: number;
    player: string;
    playerWon: string | undefined;
    match: number[] | undefined;
}
export interface Selectors {
    boxesEl: NodeListOf<HTMLElement>;
    gameOverEl: HTMLElement;
    gridBoxEl: HTMLElement;
    resultEl: HTMLElement;
    playAgainBtn: HTMLButtonElement;
    themeToggler: HTMLButtonElement;
    chooseGameEl: HTMLSelectElement;
}
export interface PlayerChoices {
    X: number[];
    O: number[];
}
export type Choice = 'X' | 'O';
export type GameType = 'single' | 'multiple';
export interface Matched {
    xWon: boolean;
    oWon: boolean;
    match?: number[];
}
export type FunctionReturn<T> = T | void;
export interface PlayReturn {
    playerWon: Choice | 'draw';
    match?: number[];
}
