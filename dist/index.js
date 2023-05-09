import Game from "./Game/game.js";
import UI, { selectors } from "./UI/ui.js";
const game = new Game();
const ui = new UI();
function checkAndPlaySystem() {
    const { activeTurn, gameType } = game.getGameState();
    if (gameType === 'single' && activeTurn === 'X') {
        initiateGame();
    }
}
function playAndUpdateUI(selectedBox) {
    const { availableChoices, activeTurn } = game.getGameState();
    if (availableChoices.length > 0 && availableChoices.includes(selectedBox)) {
        const { playerWon, match } = game.play(selectedBox) || {};
        ui.paintUI({ id: selectedBox, player: activeTurn, playerWon, match });
        if (!playerWon) {
            setTimeout(() => checkAndPlaySystem(), 350);
        }
    }
}
function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomChoice(choices = []) {
    const randomNum = getRandomNumber(choices.length - 1, 0);
    return choices[randomNum];
}
function initiateGame() {
    const { availableChoices, gameType } = game.getGameState();
    if (gameType === 'single') {
        const probableMove = game.checkForNextMove();
        const systemChoice = probableMove !== undefined ? probableMove : getRandomChoice(availableChoices);
        playAndUpdateUI(systemChoice);
    }
}
selectors.gridBoxEl.addEventListener('click', function (e) {
    const { className } = e.target;
    if (className.includes('box')) {
        const selectedBox = +className.split(' ')[1].slice(-1);
        playAndUpdateUI(selectedBox);
    }
});
selectors.playAgainBtn.addEventListener('click', function () {
    game.restartGame();
    ui.resetUI();
    const { gameType } = game.getGameState();
    if (gameType === 'single')
        initiateGame();
});
selectors.themeToggler.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
    const btnTheme = selectors.themeToggler.textContent;
    selectors.themeToggler.textContent = btnTheme === 'Light' ? 'Dark' : 'Light';
});
selectors.chooseGameEl.addEventListener('change', (e) => {
    const gameType = e.target.value;
    game.storeGameType(gameType);
    game.restartGame();
    ui.resetUI();
    initiateGame();
});
window.addEventListener('DOMContentLoaded', () => {
    const gameType = selectors.chooseGameEl.value;
    game.storeGameType(gameType);
    initiateGame();
});
//# sourceMappingURL=index.js.map