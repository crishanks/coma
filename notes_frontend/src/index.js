const startDiv = document.getElementById('start-div');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  startDiv.remove();
  startGame();
});

function startGame() {
  //Show resources nav bar with pre-set values
  const resourcesBar = document.getElementById('resources-bar');
  resourcesBar.style.visibility = "visible";
  level.style.visibility = "visible";
  const levelOne = new Level();
  levelOne.render();
}

