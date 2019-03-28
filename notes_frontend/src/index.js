const startDiv = document.getElementById('start-div');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  startDiv.remove();
  startGame();
});
let currentLevel = 0;

function startGame() {
  //Show resources nav bar with pre-set values
  const resourcesBar = document.getElementById('resources-bar');
  resourcesBar.style.visibility = "visible";

  //Create Rows
  createRows();

  //Show level with cards face-down
  level.style.visibility = "visible";
  renderCards(currentLevel);
}

function gameOver(){
  const heroUnit = document.getElementById('hero-unit');

  if (healthNum > 0) {
    //Win Condition
    destroyRows();
    heroUnit.style.visibility = 'visible';
  } else {
    //Lose Condition
    destroyRows();
    heroUnit.style.visibility = 'visible';
  }
}

// function clearBoard() {
//   const level = document.getElementById('level');
//   level.remove();
// }

  // if health is 0 turn this true.
  // if end card found turn this true.
  // if health is above 0 and gameOver is true show win screen
  // if gameOver is true and health is 0 or less show lose screen, return to start menu.
