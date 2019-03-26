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

  //Create Rows
  for (let i = 1; i <= 3; i++) {
    let row = new Row(); //This is an object
    let createdRow = row.createRow(); //This is a div
    createdRow.setAttribute('id', `row-${i}`);
    const container = document.getElementById('rows');

    container.appendChild(createdRow);
  }

  //Show level with cards face-down
  level.style.visibility = "visible";
  let newEvent = new EventCard();
  newEvent.renderCards();
}

