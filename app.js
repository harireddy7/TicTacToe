// App

const game = new GameCtrl();
const ui = new UICtrl();

selectors.gridBoxEl.addEventListener('click', function (e) {
  const { className } = e.target;
  if (className.includes('box')) {
    const selectedBox = +className.split(' ')[1].slice(-1);

    const { availableChoices, activeTurn } = game.getGameState();

    if (availableChoices.length > 0 && availableChoices.includes(selectedBox)) {
      // console.log(`${activeTurn} chose ${selectedBox}`);

      // Play
      const { playerWon, match } = game.play(selectedBox) || {};

      // Update UI

      ui.paintUI({ id: selectedBox, player: activeTurn, playerWon, match });
    }
  }
});

selectors.playAgainBtn.addEventListener('click', function () {
  game.restartGame();
  ui.resetUI();
});

selectors.themeToggler.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  const btnTheme = selectors.themeToggler.textContent;
  selectors.themeToggler.textContent = btnTheme === 'Light' ? 'Dark' : 'Light';
});
