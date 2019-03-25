const startDiv = document.getElementById('start-div');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  startDiv.remove();
  startGame();
});

function startGame() {
  //Show resources nav bar with pre-set values
  // deals first hand of face-down cards w/ click listeners
  //

  const resourcesBar = document.getElementById('resources-bar');
  resourcesBar.style.visibility = "visible";

}